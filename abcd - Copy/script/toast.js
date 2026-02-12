// Toast Notification System - Top Center with 2 second auto-hide

function showToast(message, options = {}) {
    const { type = 'info', duration = 2000 } = options;
    
    // Create toasts container if it doesn't exist
    let toastsContainer = document.querySelector('.toasts');
    if (!toastsContainer) {
        toastsContainer = document.createElement('div');
        toastsContainer.className = 'toasts';
        document.body.appendChild(toastsContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    // Add to container
    toastsContainer.appendChild(toast);
    
    // Auto remove after duration
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        toast.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
            // Remove container if empty
            if (toastsContainer && toastsContainer.children.length === 0) {
                toastsContainer.remove();
            }
        }, 300);
    }, duration);
}
