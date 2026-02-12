// Performance Optimization - Reduce Lag

// Debounce function for search inputs
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll to top button
document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.getElementById('scroll-top-btn');
    if (scrollBtn) {
        const handleScroll = throttle(() => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        }, 200);
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Optimize animations
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}

// Request Animation Frame for smooth updates
let ticking = false;
function requestTick(callback) {
    if (!ticking) {
        requestAnimationFrame(() => {
            callback();
            ticking = false;
        });
        ticking = true;
    }
}

// Optimize job card rendering
window.optimizedJobRender = function(jobs, container) {
    const fragment = document.createDocumentFragment();
    jobs.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>${job.company}</strong> • ${job.location}</p>
            <p class="job-salary"><strong>Salary:</strong> ${job.salary}</p>
            <p class="job-desc">${job.description.substring(0, 150)}...</p>
        `;
        fragment.appendChild(card);
    });
    container.appendChild(fragment);
};
