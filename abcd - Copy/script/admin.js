// Admin Dashboard JavaScript
const API_BASE_URL = 'http://localhost:3001/api';

let authToken = getAuthToken();
let userInfo = getUserInfo();

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    if (authToken && userInfo && userInfo.role === 'admin') {
        showDashboard();
        loadDashboardData();
    } else {
        showLogin();
    }
});

// Login functionality
document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const button = e.target.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'Logging in...';
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            if (data.user.role !== 'admin') {
                showMessage('Access denied. Admin role required.', 'error');
                return;
            }
            
            authToken = data.token;
            userInfo = data.user;
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            
            showDashboard();
            loadDashboardData();
            showMessage('Login successful!', 'success');
        } else {
            showMessage(data.message || 'Login failed', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage('Network error. Please try again.', 'error');
    } finally {
        button.disabled = false;
        button.textContent = originalText;
    }
});

// Upload Excel file
async function uploadFile() {
    const fileInput = document.getElementById('excelFile');
    const file = fileInput.files[0];

    if (!file) {
        showMessage('Please select a file', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('excelFile', file);

    const uploadBtn = document.querySelector('.upload-btn');
    const originalText = uploadBtn.textContent;
    uploadBtn.disabled = true;
    uploadBtn.textContent = 'Uploading...';

    try {
        const response = await fetch(`${API_BASE_URL}/certificates/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            let message = `Upload successful! ${data.uploaded} certificates uploaded.`;
            if (data.errors > 0) {
                message += ` ${data.errors} errors occurred.`;
            }
            if (data.duplicates > 0) {
                message += ` ${data.duplicates} duplicates skipped.`;
            }
            showMessage(message, 'success');
            fileInput.value = '';
            loadDashboardData();
        } else {
            showMessage(data.message || 'Upload failed', 'error');
        }
    } catch (error) {
        console.error('Upload error:', error);
        showMessage('Upload failed. Check backend connection.', 'error');
    } finally {
        uploadBtn.disabled = false;
        uploadBtn.textContent = originalText;
    }
}

// Load dashboard data
async function loadDashboardData() {
    try {
        // Load statistics
        const statsResponse = await fetch(`${API_BASE_URL}/certificates/stats`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (statsResponse.ok) {
            const statsData = await statsResponse.json();
            updateStats(statsData.stats);
        }

        // Load certificates
        const certsResponse = await fetch(`${API_BASE_URL}/certificates/all?limit=10`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (certsResponse.ok) {
            const certsData = await certsResponse.json();
            displayCertificates(certsData.certificates);
        } else if (certsResponse.status === 401) {
            logout();
        }
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showMessage('Error loading dashboard data', 'error');
    }
}

// Update statistics
function updateStats(stats) {
    document.getElementById('total-certificates').textContent = stats.total || 0;
    document.getElementById('recent-uploads').textContent = stats.recentUploads || 0;
}

// Display certificates list
function displayCertificates(certificates) {
    const listContainer = document.getElementById('certificates-list');
    
    if (!certificates || certificates.length === 0) {
        listContainer.innerHTML = '<p class="loading">No certificates found</p>';
        return;
    }
    
    listContainer.innerHTML = certificates.map(cert => `
        <div class="certificate-item">
            <div class="certificate-info">
                <h4>${cert.studentName}</h4>
                <p>${cert.internshipDomain}</p>
                <p>Duration: ${new Date(cert.startDate).toLocaleDateString()} - ${new Date(cert.endDate).toLocaleDateString()}</p>
            </div>
            <div class="certificate-id">${cert.certificateId}</div>
        </div>
    `).join('');
}

// Show/hide sections
function showLogin() {
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('dashboard-section').classList.add('hidden');
}

function showDashboard() {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('dashboard-section').classList.remove('hidden');
}

// Logout
function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    authToken = null;
    userInfo = null;
    showLogin();
    showMessage('Logged out successfully', 'success');
}

// Show messages
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());

    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;

    const container = document.querySelector('.container');
    container.insertBefore(messageDiv, container.firstChild);

    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Helper functions from auth-cert.js
function getAuthToken() {
    return localStorage.getItem('authToken');
}

function getUserInfo() {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
}