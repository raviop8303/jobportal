// Inline scripts moved from HTML

// SCROLL TO TOP BUTTON - FIXED
setTimeout(() => {
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        console.log('✅ Scroll to top button initialized');
    }
}, 100);

// NEWSLETTER SUBSCRIPTION - FIXED
if (typeof window.subscribeNewsletter === 'undefined') {
    window.subscribeNewsletter = function() {
        const emailInput = document.getElementById('newsletter-email');
        if (!emailInput) {
            console.error('Newsletter email input not found');
            return;
        }
        
        const email = emailInput.value.trim();
        
        if (!email) {
            alert('⚠️ Please enter your email address');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('⚠️ Please enter a valid email address');
            return;
        }
        
        let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
        
        if (subscribers.includes(email)) {
            alert('ℹ️ You are already subscribed!');
            return;
        }
        
        subscribers.push(email);
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
        
        alert('✅ Successfully subscribed! You will receive job alerts at ' + email);
        emailInput.value = '';
    };
}
console.log('✅ Newsletter function loaded');

// ANIMATE ELEMENTS ON SCROLL
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

setTimeout(() => {
    document.querySelectorAll('.featured-companies, .testimonials-section, .newsletter-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}, 100);

// CATEGORY FILTER FUNCTION
window.filterByCategory = function(category) {
    if (typeof jobs === 'undefined' || !jobs) {
        alert('Jobs are loading, please wait...');
        return;
    }
    
    const filtered = jobs.filter(job => {
        const title = job.title.toLowerCase();
        const description = job.description.toLowerCase();
        const categoryLower = category.toLowerCase();
        return title.includes(categoryLower) || description.includes(categoryLower);
    });
    
    showAllJobsPage(filtered, `${category} Jobs (${filtered.length})`);
};

// SHOW ALL JOBS PAGE FUNCTION
function showAllJobsPage(jobsList, title = 'All Jobs & Internships') {
    // Hide ALL home sections including hero
    const heroSection = document.querySelector('.hero-banner');
    if (heroSection) heroSection.style.display = 'none';
    
    document.getElementById('job-search-section').style.display = 'none';
    document.querySelector('.featured-companies').style.display = 'none';
    document.querySelector('.testimonials-section').style.display = 'none';
    document.querySelector('.newsletter-section').style.display = 'none';
    
    // Show all jobs section
    document.getElementById('all-jobs-section').classList.remove('section-hidden');
    document.getElementById('all-jobs-section').style.display = 'block';
    
    // Update header
    const header = document.querySelector('#all-jobs-section .all-jobs-header h2');
    if (header) header.textContent = title;
    
    // Display jobs
    if (typeof displayAllJobs === 'function') {
        displayAllJobs(jobsList);
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// SHOW HOME PAGE FUNCTION
function showHomePage() {
    // Hide all jobs section
    document.getElementById('all-jobs-section').classList.add('section-hidden');
    document.getElementById('all-jobs-section').style.display = 'none';
    
    // Show ALL home sections including hero
    const heroSection = document.querySelector('.hero-banner');
    if (heroSection) heroSection.style.display = 'block';
    
    document.getElementById('job-search-section').style.display = 'block';
    document.querySelector('.featured-companies').style.display = 'block';
    document.querySelector('.testimonials-section').style.display = 'block';
    document.querySelector('.newsletter-section').style.display = 'block';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// WAIT FOR DOM TO LOAD
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Inline Scripts - DOM Loaded');
    console.log('Jobs available:', typeof jobs !== 'undefined' ? jobs.length : 'NOT LOADED');
    console.log('displayAllJobs function:', typeof displayAllJobs);
    
    // Verify all elements exist
    const elements = {
        'view-all-jobs-btn': document.getElementById('view-all-jobs-btn'),
        'back-to-home': document.getElementById('back-to-home'),
        'keyword-search': document.getElementById('keyword-search'),
        'location-filter': document.getElementById('location-filter'),
        'newsletter-email': document.getElementById('newsletter-email'),
        'job-listings': document.getElementById('job-listings'),
        'all-jobs-section': document.getElementById('all-jobs-section'),
        'dashboard-section': document.getElementById('dashboard-section'),
        'theme-toggle': document.getElementById('theme-toggle'),
        'dashboard-toggle': document.getElementById('dashboard-toggle')
    };
    
    Object.keys(elements).forEach(key => {
        if (elements[key]) {
            console.log('✅ Found:', key);
        } else {
            console.error('❌ Missing:', key);
        }
    });

    // FOOTER LINKS
    document.querySelectorAll('.footer-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.textContent.trim();
            console.log('Footer link clicked:', text);
            
            if (text === 'Browse Jobs') {
                document.getElementById('view-all-jobs-btn')?.click();
            }
            else if (text === 'Companies') {
                document.querySelector('.featured-companies')?.scrollIntoView({ behavior: 'smooth' });
            }
            else if (text === 'Career Tips') {
                alert('📚 Career Tips section coming soon!');
            }
            else if (text === 'Contact') {
                alert('📧 Contact: support@jobportal.com | +91 1234567890');
            }
            else if (text === 'Technology' || text === 'Design' || text === 'Marketing') {
                filterByCategory(text);
            }
            else if (text === 'Remote Jobs') {
                if (typeof jobs !== 'undefined') {
                    const remoteJobs = jobs.filter(job => 
                        job.location?.toLowerCase().includes('remote')
                    );
                    document.getElementById('job-search-section').style.display = 'none';
                    document.getElementById('all-jobs-section').classList.remove('section-hidden');
                    if (typeof displayAllJobs === 'function') {
                        displayAllJobs(remoteJobs);
                    }
                    const header = document.querySelector('#all-jobs-section .all-jobs-header h2');
                    if (header) header.textContent = `Remote Jobs (${remoteJobs.length})`;
                }
            }
        });
    });
    
    // SOCIAL LINKS
    document.querySelectorAll('.social-link').forEach(link => {
        link.style.cursor = 'pointer';
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.textContent.trim();
            console.log('Social link clicked:', icon);
            
            if (icon === '📧') {
                window.open('https://www.twitter.com', '_blank');
            } else if (icon === '💼') {
                window.open('https://www.linkedin.com', '_blank');
            } else if (icon === '🐦') {
                window.open('https://www.instagram.com', '_blank');
            }
        });
    });

    console.log('✅ Footer and social links set up');
    console.log('✅ Inline Scripts - All event listeners ready');
});

// Navigation handlers
document.getElementById('nav-home-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({top:0,behavior:'smooth'});
    document.getElementById('back-to-home')?.click();
});

document.getElementById('nav-about')?.addEventListener('click', (e) => {
    e.preventDefault();
    const m = document.createElement('div');
    m.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center';
    m.innerHTML = '<div style="background:white;padding:40px;border-radius:20px;max-width:600px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.3)"><h2 style="margin:0 0 20px;color:#0ea5a4">💼 About JobPortal</h2><p style="line-height:1.8;color:#4a5568;margin-bottom:20px">JobPortal is your trusted partner in finding the perfect career opportunity. We connect talented professionals with leading companies across India.</p><p style="line-height:1.8;color:#4a5568;margin-bottom:20px"><strong>Our Mission:</strong> To make job searching simple, fast, and effective for everyone.</p><p style="line-height:1.8;color:#4a5568;margin-bottom:30px"><strong>Founded:</strong> 2024 | <strong>Jobs Posted:</strong> 130+ | <strong>Happy Users:</strong> 1000+</p><button onclick="this.parentElement.parentElement.remove()" style="background:#0ea5a4;color:white;border:none;padding:12px 30px;border-radius:10px;font-weight:700;cursor:pointer;width:100%">Close</button></div>';
    document.body.appendChild(m);
    m.onclick = (e) => e.target === m && m.remove();
});

document.getElementById('nav-careers')?.addEventListener('click', (e) => {
    e.preventDefault();
    const m = document.createElement('div');
    m.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center';
    m.innerHTML = '<div style="background:white;padding:40px;border-radius:20px;max-width:600px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.3)"><h2 style="margin:0 0 20px;color:#0ea5a4">🚀 Join Our Team</h2><p style="line-height:1.8;color:#4a5568;margin-bottom:20px">We are always looking for talented individuals to join the JobPortal family!</p><div style="background:#f7fafc;padding:20px;border-radius:12px;margin-bottom:20px"><h3 style="margin:0 0 10px;font-size:16px;color:#2d3748">💻 Open Positions:</h3><ul style="margin:10px 0;padding-left:20px;color:#4a5568"><li>Full Stack Developer</li><li>UI/UX Designer</li><li>Product Manager</li><li>Marketing Specialist</li></ul></div><p style="color:#4a5568;margin-bottom:30px">📧 Send your resume to: <strong>careers@jobportal.com</strong></p><button onclick="this.parentElement.parentElement.remove()" style="background:#0ea5a4;color:white;border:none;padding:12px 30px;border-radius:10px;font-weight:700;cursor:pointer;width:100%">Close</button></div>';
    document.body.appendChild(m);
    m.onclick = (e) => e.target === m && m.remove();
});

document.getElementById('nav-contact')?.addEventListener('click', (e) => {
    e.preventDefault();
    const m = document.createElement('div');
    m.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center';
    m.innerHTML = '<div style="background:white;padding:40px;border-radius:20px;max-width:600px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.3)"><h2 style="margin:0 0 20px;color:#0ea5a4">📞 Contact Us</h2><div style="background:#f7fafc;padding:20px;border-radius:12px;margin-bottom:20px"><p style="margin:10px 0;color:#4a5568">📧 <strong>Email:</strong> support@jobportal.com</p><p style="margin:10px 0;color:#4a5568">📞 <strong>Phone:</strong> +91 1234567890</p><p style="margin:10px 0;color:#4a5568">📍 <strong>Address:</strong> Lucknow, India</p><p style="margin:10px 0;color:#4a5568">🕗 <strong>Hours:</strong> Mon-Fri, 9AM-6PM</p></div><div style="display:flex;gap:15px;margin-bottom:30px"><a href="https://twitter.com" target="_blank" style="flex:1;padding:12px;background:#1da1f2;color:white;text-align:center;border-radius:10px;text-decoration:none;font-weight:600">🐦 Twitter</a><a href="https://linkedin.com" target="_blank" style="flex:1;padding:12px;background:#0077b5;color:white;text-align:center;border-radius:10px;text-decoration:none;font-weight:600">💼 LinkedIn</a></div><button onclick="this.parentElement.parentElement.remove()" style="background:#0ea5a4;color:white;border:none;padding:12px 30px;border-radius:10px;font-weight:700;cursor:pointer;width:100%">Close</button></div>';
    document.body.appendChild(m);
    m.onclick = (e) => e.target === m && m.remove();
});

console.log('✅ inline-scripts.js loaded successfully');
