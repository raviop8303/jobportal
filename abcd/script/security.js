// Security Module - FREE Protection

// 1. Input Sanitization
function sanitize(input) {
    if (!input) return '';
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// 2. XSS Protection
function escapeHTML(str) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;'
    };
    return String(str).replace(/[&<>"'/]/g, s => map[s]);
}

// 3. Disable Console in Production
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
    console.info = () => {};
    console.debug = () => {};
}

// 4. Prevent DevTools (Optional - Can be bypassed but adds layer)
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        return false;
    }
});

// 5. Data Encryption for localStorage
const SECRET_KEY = 'JobPortal2025SecureKey'; // Change this

function encryptData(data) {
    try {
        return btoa(encodeURIComponent(JSON.stringify(data)));
    } catch (e) {
        return data;
    }
}

function decryptData(encrypted) {
    try {
        return JSON.parse(decodeURIComponent(atob(encrypted)));
    } catch (e) {
        return encrypted;
    }
}

// 6. Secure localStorage wrapper
const secureStorage = {
    setItem: (key, value) => {
        const encrypted = encryptData(value);
        localStorage.setItem(key, encrypted);
    },
    getItem: (key) => {
        const encrypted = localStorage.getItem(key);
        if (!encrypted) return null;
        return decryptData(encrypted);
    },
    removeItem: (key) => {
        localStorage.removeItem(key);
    }
};

// 7. Rate Limiting
const rateLimiter = {
    attempts: {},
    check: function(action, maxAttempts = 5, timeWindow = 60000) {
        const now = Date.now();
        if (!this.attempts[action]) {
            this.attempts[action] = [];
        }
        
        // Remove old attempts
        this.attempts[action] = this.attempts[action].filter(
            time => now - time < timeWindow
        );
        
        if (this.attempts[action].length >= maxAttempts) {
            return false; // Rate limit exceeded
        }
        
        this.attempts[action].push(now);
        return true;
    }
};

// 8. Session Timeout (Auto logout after 30 min)
let sessionTimeout;
function resetSessionTimeout() {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
        if (localStorage.getItem('isAuthenticated') === 'true') {
            localStorage.clear();
            alert('Session expired. Please login again.');
            window.location.href = 'login.html';
        }
    }, 30 * 60 * 1000); // 30 minutes
}

// Reset on user activity
['click', 'keypress', 'scroll', 'mousemove'].forEach(event => {
    document.addEventListener(event, resetSessionTimeout, { passive: true });
});

// 9. Validate Input
function validateInput(input, type) {
    switch(type) {
        case 'email':
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
        case 'phone':
            return /^[0-9]{10}$/.test(input);
        case 'name':
            return /^[a-zA-Z\s]{2,50}$/.test(input);
        default:
            return input.length > 0;
    }
}

// 10. CSRF Token (Simple implementation)
function generateCSRFToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Initialize CSRF token
if (!sessionStorage.getItem('csrfToken')) {
    sessionStorage.setItem('csrfToken', generateCSRFToken());
}

// Export functions
window.security = {
    sanitize,
    escapeHTML,
    encryptData,
    decryptData,
    secureStorage,
    rateLimiter,
    validateInput,
    generateCSRFToken
};

console.log('🔒 Security Module Loaded');
