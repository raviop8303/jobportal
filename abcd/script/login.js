// Only run if we're on the login page
const loginContainer = document.getElementById('login-container');
const registerContainer = document.getElementById('register-container');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

if (showRegisterLink) {
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    });
}

if (showLoginLink) {
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        await simulateLogin(email, password);
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const phone = document.getElementById('register-phone').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const role = document.getElementById('reg-role').value;
        const terms = document.getElementById('register-terms').checked;
        
        // Validation
        if (!role) {
            showToast('Please select account type', {type:'error'});
            return;
        }
        
        if (password !== confirmPassword) {
            showToast('Passwords do not match!', {type:'error'});
            return;
        }
        
        if (!terms) {
            showToast('Please accept Terms & Conditions', {type:'error'});
            return;
        }
        
        // Get role-specific data
        let additionalData = {};
        if (role === 'jobseeker') {
            additionalData = {
                location: document.getElementById('register-location')?.value || '',
                bio: document.getElementById('register-bio')?.value || ''
            };
        } else if (role === 'employer') {
            const companyName = document.getElementById('company-name')?.value;
            if (!companyName) {
                showToast('Please enter company name', {type:'error'});
                return;
            }
            additionalData = {
                companyName: companyName,
                companyLocation: document.getElementById('company-location')?.value || '',
                companyDescription: document.getElementById('company-description')?.value || '',
                companyWebsite: document.getElementById('company-website')?.value || '',
                companyIndustry: document.getElementById('company-industry')?.value || ''
            };
        }
        
        await simulateRegister(name, email, phone, password, role, additionalData);
    });
}

// --- Wrapper functions used by UI flows ---

async function simulateRegister(name, email, phone, password, role, additionalData) {
    try {
        const result = await registerUser(name, email, password, role);
        if (result.ok) {
            // Save additional profile data
            localStorage.setItem('userPhone', phone);
            
            if (role === 'jobseeker') {
                if (additionalData.location) localStorage.setItem('userLocation', additionalData.location);
                if (additionalData.bio) localStorage.setItem('userBio', additionalData.bio);
            } else if (role === 'employer') {
                localStorage.setItem('companyName', additionalData.companyName);
                if (additionalData.companyLocation) localStorage.setItem('userLocation', additionalData.companyLocation);
                if (additionalData.companyDescription) localStorage.setItem('companyInfo', additionalData.companyDescription);
                if (additionalData.companyWebsite) localStorage.setItem('companyWebsite', additionalData.companyWebsite);
                if (additionalData.companyIndustry) localStorage.setItem('companyIndustry', additionalData.companyIndustry);
            }
            
            showToast('Registration successful! Redirecting...', {type:'success'});
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showToast(result.reason || 'Registration failed', {type:'error'});
        }
    } catch (e) {
        showToast(e.message || 'Registration failed', {type:'error'});
    }
}

async function simulateLogin(email, password) {
    try {
        const res = await loginUser(email, password);
        if (!res.ok) {
            showToast(res.reason || 'Login failed', {type:'error'});
            return;
        }
        showToast('Login successful!', {type:'success'});
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    } catch (e) {
        showToast(e.message || 'Login failed', {type:'error'});
    }
}

// --- Toast Notification System ---
function showToast(message, options = {}) {
    const { type = 'info', duration = 2000 } = options;

    let toastsContainer = document.querySelector('.toasts');
    if (!toastsContainer) {
        toastsContainer = document.createElement('div');
        toastsContainer.classList.add('toasts');
        document.body.appendChild(toastsContainer);
    }

    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.textContent = message;

    toastsContainer.appendChild(toast);

    // Auto-hide after duration
    setTimeout(() => {
        toast.style.transition = 'all 0.3s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            if (toast && toast.parentElement) {
                toast.remove();
            }
            // Remove container if empty
            if (toastsContainer && toastsContainer.children.length === 0) {
                toastsContainer.remove();
            }
        }, 300);
    }, duration);
}