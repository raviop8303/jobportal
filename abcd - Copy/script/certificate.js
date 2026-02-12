// Certificate Verification JavaScript - API Mode
const API_BASE_URL = 'http://localhost:3001/api';
const USE_OFFLINE_MODE = false; // Use API since backend is running

let currentCertificate = null;

// Demo certificates for fallback
const demoCertificates = [
    {
        certificateId: 'CERT001',
        studentName: 'John Doe',
        internshipDomain: 'Web Development',
        startDate: '2024-01-01',
        endDate: '2024-03-01',
        issuedDate: '2024-03-05',
        isActive: true
    },
    {
        certificateId: 'CERT002',
        studentName: 'Jane Smith',
        internshipDomain: 'Data Science',
        startDate: '2024-02-01',
        endDate: '2024-04-01',
        issuedDate: '2024-04-05',
        isActive: true
    }
];

// Initialize demo data
if (!localStorage.getItem('certificates')) {
    localStorage.setItem('certificates', JSON.stringify(demoCertificates));
}

// Search certificate by ID
async function searchCertificate() {
    const certificateId = document.getElementById('certificateId').value.trim();
    
    if (!certificateId) {
        alert('Please enter a certificate ID');
        return;
    }

    showLoading();
    
    try {
        // Try API first
        const response = await fetch(`${API_BASE_URL}/certificates/search/${certificateId}`);
        const data = await response.json();

        if (data.success) {
            currentCertificate = data.certificate;
            displayCertificate(data.certificate);
            hideError();
        } else {
            // Fallback to localStorage
            const localCerts = JSON.parse(localStorage.getItem('certificates') || '[]');
            const cert = localCerts.find(c => c.certificateId.toLowerCase() === certificateId.toLowerCase());
            
            if (cert) {
                currentCertificate = cert;
                displayCertificate(cert);
                hideError();
            } else {
                showError(`Certificate not found. Try: ${demoCertificates.map(c => c.certificateId).join(', ')}`);
                hideCertificate();
            }
        }
    } catch (error) {
        console.error('API Error, using localStorage:', error);
        
        // Fallback to localStorage
        const localCerts = JSON.parse(localStorage.getItem('certificates') || '[]');
        const cert = localCerts.find(c => c.certificateId.toLowerCase() === certificateId.toLowerCase());
        
        if (cert) {
            currentCertificate = cert;
            displayCertificate(cert);
            hideError();
        } else {
            showError('Certificate not found');
            hideCertificate();
        }
    } finally {
        hideLoading();
    }
}

// Display certificate details
function displayCertificate(certificate) {
    document.getElementById('student-name').textContent = certificate.studentName;
    document.getElementById('internship-domain').textContent = certificate.internshipDomain;
    document.getElementById('cert-id').textContent = certificate.certificateId;
    
    const startDate = new Date(certificate.startDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    const endDate = new Date(certificate.endDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    document.getElementById('duration').textContent = `${startDate} to ${endDate}`;
    
    const issuedDate = new Date(certificate.issuedDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    document.getElementById('issued-date').textContent = issuedDate;
    
    document.getElementById('certificate-display').classList.remove('hidden');
}

// Download certificate as PDF
async function downloadCertificate() {
    if (!currentCertificate) {
        alert('No certificate selected');
        return;
    }

    try {
        // Try API download
        const response = await fetch(`${API_BASE_URL}/certificates/download/${currentCertificate.certificateId}`);
        
        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `certificate-${currentCertificate.certificateId}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            return;
        }
    } catch (error) {
        console.log('API download failed, using fallback');
    }
    
    // Fallback: Generate text file
    const certData = `
CERTIFICATE OF COMPLETION

This is to certify that
${currentCertificate.studentName}

has successfully completed the internship in
${currentCertificate.internshipDomain}

Duration: ${new Date(currentCertificate.startDate).toLocaleDateString()} to ${new Date(currentCertificate.endDate).toLocaleDateString()}

Certificate ID: ${currentCertificate.certificateId}
Issued on: ${new Date(currentCertificate.issuedDate).toLocaleDateString()}
    `;
    
    const blob = new Blob([certData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificate-${currentCertificate.certificateId}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    alert('Certificate downloaded! (Text format - Backend PDF available)');
}

// Show/hide sections
function showLoading() {
    const button = document.querySelector('.search-btn');
    button.disabled = true;
    button.innerHTML = '<span>Searching...</span>';
}

function hideLoading() {
    const button = document.querySelector('.search-btn');
    button.disabled = false;
    button.innerHTML = '<span>Search Certificate</span><span class="btn-arrow">→</span>';
}

function showError(message = 'Certificate not found. Please check your certificate ID and try again.') {
    const errorSection = document.getElementById('error-section');
    const errorMessage = errorSection.querySelector('p');
    errorMessage.textContent = message;
    errorSection.classList.remove('hidden');
}

function hideError() {
    document.getElementById('error-section').classList.add('hidden');
}

function hideCertificate() {
    document.getElementById('certificate-display').classList.add('hidden');
}

// Enter key support for search
document.getElementById('certificateId').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchCertificate();
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Hide sections initially
    hideCertificate();
    hideError();
});