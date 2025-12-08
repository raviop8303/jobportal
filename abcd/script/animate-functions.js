// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize scroll animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.job-card, .sidebar-card, .company-logo, .testimonial-card, .stat-item, .section-header');
    elements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Animate search function
const originalSearchJobs = window.searchJobs;
window.searchJobs = function() {
    const btn = document.querySelector('.search-btn');
    
    // Button animation
    btn.style.transform = 'scale(0.95)';
    btn.innerHTML = '<span>🔍 Searching...</span>';
    
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
        if (originalSearchJobs) originalSearchJobs();
        
        setTimeout(() => {
            btn.innerHTML = '<span>Search Jobs</span><span class="btn-arrow">→</span>';
            
            // Animate results
            const jobCards = document.querySelectorAll('.job-card');
            jobCards.forEach((card, i) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, i * 50);
            });
        }, 300);
    }, 500);
};

// Animate apply button
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('apply-btn') || e.target.closest('.apply-btn')) {
        const btn = e.target.classList.contains('apply-btn') ? e.target : e.target.closest('.apply-btn');
        
        // Ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = 'position:absolute;border-radius:50%;background:rgba(255,255,255,0.6);width:20px;height:20px;animation:ripple 0.6s ease-out;pointer-events:none';
        ripple.style.left = (e.clientX - btn.getBoundingClientRect().left - 10) + 'px';
        ripple.style.top = (e.clientY - btn.getBoundingClientRect().top - 10) + 'px';
        
        btn.style.position = 'relative';
        btn.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Success animation
        const originalText = btn.innerHTML;
        btn.innerHTML = '✓ Applied!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    }
});

// Animate save button
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('save-btn') || e.target.closest('.save-btn')) {
        const btn = e.target.classList.contains('save-btn') ? e.target : e.target.closest('.save-btn');
        
        // Heart animation
        btn.style.transform = 'scale(1.3)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 200);
        
        // Particle effect
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('span');
            particle.textContent = '❤️';
            particle.style.cssText = `position:fixed;pointer-events:none;font-size:12px;animation:float-up 1s ease-out forwards;left:${e.clientX}px;top:${e.clientY}px;z-index:9999`;
            particle.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }
    }
});

// Animate filter apply
const originalApplyFilters = window.applyAdvancedFilters;
window.applyAdvancedFilters = function() {
    const filterCard = document.querySelector('.sidebar-card');
    
    // Pulse animation
    filterCard.style.animation = 'pulse 0.5s ease';
    
    if (originalApplyFilters) originalApplyFilters();
    
    setTimeout(() => {
        filterCard.style.animation = '';
    }, 500);
};

// Animate newsletter subscription
const originalSubscribe = window.subscribeNewsletter;
window.subscribeNewsletter = function() {
    const btn = document.querySelector('.newsletter-btn');
    const input = document.getElementById('newsletter-email');
    
    if (!input.value) {
        input.style.animation = 'shake 0.5s ease';
        setTimeout(() => input.style.animation = '', 500);
        return;
    }
    
    // Success animation
    btn.innerHTML = '✓ Subscribed!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    // Confetti
    createConfetti(btn);
    
    if (originalSubscribe) originalSubscribe();
    
    setTimeout(() => {
        btn.innerHTML = 'Subscribe';
        btn.style.background = '';
        input.value = '';
    }, 3000);
};

// Confetti effect
function createConfetti(element) {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#10b981', '#f59e0b'];
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position:fixed;
            width:8px;
            height:8px;
            background:${colors[Math.floor(Math.random() * colors.length)]};
            left:${rect.left + rect.width/2}px;
            top:${rect.top}px;
            border-radius:50%;
            pointer-events:none;
            z-index:9999;
            animation:confetti-fall 1.5s ease-out forwards;
        `;
        confetti.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
        confetti.style.setProperty('--ty', -Math.random() * 200 + 'px');
        confetti.style.setProperty('--r', Math.random() * 360 + 'deg');
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1500);
    }
}

// Animate category tags
document.querySelectorAll('.category-tag').forEach(tag => {
    tag.addEventListener('click', function() {
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Animate company logos
document.querySelectorAll('.company-logo').forEach(logo => {
    logo.addEventListener('click', function() {
        this.style.animation = 'bounce 0.6s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 600);
    });
});

// Smooth scroll with animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            target.style.animation = 'highlight 1s ease';
            setTimeout(() => target.style.animation = '', 1000);
        }
    });
});

// Animate scroll to top
const scrollBtn = document.getElementById('scroll-top-btn');
if (scrollBtn) {
    scrollBtn.addEventListener('click', function() {
        this.style.transform = 'rotate(360deg) scale(1.2)';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            this.style.transform = '';
        }, 600);
    });
}

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    initScrollAnimations();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to { width: 200px; height: 200px; opacity: 0; }
    }
    
    @keyframes float-up {
        to { 
            transform: translateY(-100px) translateX(var(--tx)); 
            opacity: 0; 
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    @keyframes confetti-fall {
        to {
            transform: translateX(var(--tx)) translateY(var(--ty)) rotate(var(--r));
            opacity: 0;
        }
    }
    
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
    }
    
    @keyframes highlight {
        0%, 100% { background: transparent; }
        50% { background: rgba(102,126,234,0.1); }
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .job-card, .sidebar-card, .company-logo, .testimonial-card {
        transition: all 0.3s ease !important;
    }
    
    button {
        transition: all 0.3s ease !important;
    }
`;
document.head.appendChild(style);

console.log('✨ Animated Functions Loaded!');
