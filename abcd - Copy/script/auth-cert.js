// Certificate Authentication - Works Offline
const API_URL = 'http://localhost:3001/api';
const USE_OFFLINE = false; // Set to true for offline mode

// Registration
document.getElementById('register-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        role: document.getElementById('role').value
    };
    
    // Show loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating Account...';
    submitBtn.disabled = true;
    
    try {
        if (!USE_OFFLINE) {
            // Try API registration
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                alert('Registration successful!');
                window.location.href = formData.role === 'admin' ? 'admin-dashboard.html' : 'student-portal.html';
                return;
            }
        }
    } catch (error) {
        console.log('API failed, using offline mode');
    }
    
    // Offline mode - Save to localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email exists
    if (users.find(u => u.email === formData.email)) {
        showError('Email already registered');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        return;
    }
    
    // Create user
    const newUser = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    localStorage.setItem('isLoggedIn', 'true');
    
    alert('Registration successful!');
    window.location.href = formData.role === 'admin' ? 'admin-dashboard.html' : 'student-portal.html';
});

// Login
document.getElementById('login-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Logging in...';
    submitBtn.disabled = true;
    
    try {
        if (!USE_OFFLINE) {
            // Try API login
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                alert('Login successful!');
                window.location.href = data.user.role === 'admin' ? 'admin-dashboard.html' : 'student-portal.html';
                return;
            }
        }
    } catch (error) {
        console.log('API failed, using offline mode');
    }
    
    // Offline mode - Check localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        alert('Login successful!');
        window.location.href = user.role === 'admin' ? 'admin-dashboard.html' : 'student-portal.html';
    } else {
        showError('Invalid email or password');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

function showError(message) {
    // Remove existing error
    const existingError = document.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Create error element
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    error.style.cssText = 'background: #fee; color: #c00; padding: 12px; border-radius: 6px; margin-bottom: 15px; border: 1px solid #fcc;';
    
    // Insert at top of form
    const form = document.querySelector('.auth-form');
    form.insertBefore(error, form.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => error.remove(), 5000);
}