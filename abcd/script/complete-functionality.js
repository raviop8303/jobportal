// COMPLETE FUNCTIONALITY - Makes ALL HTML elements working
// This file ensures every button, link, and feature works properly

console.log('🚀 Complete Functionality Script Loaded');

// Wait for everything to load
window.addEventListener('load', function() {
    console.log('✅ Page fully loaded - Activating all features');
    
    // 1. NAV HOME BUTTON - Click logo to go home
    const navHome = document.getElementById('nav-home');
    if (navHome) {
        navHome.addEventListener('click', function(e) {
            e.preventDefault();
            location.reload();
        });
    }
    
    // 2. COMPANY LOGOS - Disabled (using onclick in HTML)
    /*setTimeout(() => {
        document.querySelectorAll('.company-logo').forEach(logo => {
            logo.style.cursor = 'pointer';
            logo.style.transition = 'all 0.3s ease';
            
            logo.addEventListener('click', function() {
                const fullText = this.textContent.trim();
                const company = fullText.split(' ').slice(1).join(' ').trim(); // Get company name
                
                console.log('🏢 Company clicked:', company);
                
                // Show company jobs
                if (typeof jobs !== 'undefined') {
                    const companyJobs = jobs.filter(job => 
                        job.company.toLowerCase().includes(company.toLowerCase())
                    );
                    
                    if (companyJobs.length > 0) {
                        // Hide home sections
                        const heroSection = document.querySelector('.hero-banner');
                        if (heroSection) heroSection.style.display = 'none';
                        
                        document.getElementById('job-search-section').style.display = 'none';
                        document.querySelector('.featured-companies').style.display = 'none';
                        document.querySelector('.testimonials-section').style.display = 'none';
                        document.querySelector('.newsletter-section').style.display = 'none';
                        
                        // Show all jobs section
                        const allJobsSection = document.getElementById('all-jobs-section');
                        allJobsSection.classList.remove('section-hidden');
                        allJobsSection.style.display = 'block';
                        
                        // Update header
                        const header = document.querySelector('#all-jobs-section .all-jobs-header h2');
                        if (header) header.textContent = `${company} Jobs (${companyJobs.length})`;
                        
                        // Display jobs
                        if (typeof displayAllJobs === 'function') {
                            displayAllJobs(companyJobs);
                        }
                        
                        // Scroll to top
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        
                        if (typeof showToast === 'function') {
                            showToast(`Showing ${companyJobs.length} jobs from ${company}`, { type: 'success' });
                        }
                    } else {
                        alert(`🏢 ${company}\n\nNo current openings. Check back later!`);
                    }
                }
            });
            
            // Add hover effect
            logo.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.05)';
                this.style.boxShadow = '0 12px 30px rgba(14,165,164,0.3)';
            });
            
            logo.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
        });
        
        console.log('✅ Company logos activated:', document.querySelectorAll('.company-logo').length);
    }, 500);*/
    
    // 3. HERO SEARCH - Enter key support
    const keywordSearch = document.getElementById('keyword-search');
    const locationFilter = document.getElementById('location-filter');
    
    if (keywordSearch) {
        keywordSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchJobs();
            }
        });
    }
    
    // 4. ALL JOBS FILTERS - Make them work
    const allSearchInput = document.getElementById('all-search-input');
    const allTypeFilter = document.getElementById('all-type-filter');
    const allLocationFilter = document.getElementById('all-location-filter');
    
    if (allSearchInput) {
        allSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterAllJobs();
            }
        });
    }
    
    if (allTypeFilter) {
        allTypeFilter.addEventListener('change', filterAllJobs);
    }
    
    if (allLocationFilter) {
        allLocationFilter.addEventListener('change', filterAllJobs);
    }
    
    // 5. DASHBOARD OVERLAY - Click to close
    const dashboardOverlay = document.getElementById('dashboard-overlay');
    if (dashboardOverlay) {
        dashboardOverlay.addEventListener('click', function() {
            const dashboardPanel = document.getElementById('dashboard-section');
            if (dashboardPanel) {
                dashboardPanel.classList.add('section-hidden');
                dashboardPanel.classList.remove('open');
                this.classList.add('section-hidden');
                this.classList.remove('open');
            }
        });
    }
    
    // 6. TESTIMONIAL CARDS - Add hover effect
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 7. CATEGORY TAGS - Visual feedback
    document.querySelectorAll('.category-tag').forEach(tag => {
        tag.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        tag.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // 8. HERO STATS - Disabled (using HTML values)
    // updateHeroStats();
    
    // 9. LOADING STATE - Remove after jobs load
    setTimeout(() => {
        const loadingState = document.querySelector('.loading-state');
        if (loadingState && typeof jobs !== 'undefined' && jobs.length > 0) {
            loadingState.style.display = 'none';
        }
    }, 1000);
    
    // 10. NEWSLETTER EMAIL - Validation on input
    const newsletterEmail = document.getElementById('newsletter-email');
    if (newsletterEmail) {
        newsletterEmail.addEventListener('input', function() {
            const email = this.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '';
            }
        });
        
        newsletterEmail.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeNewsletter();
            }
        });
    }
    
    console.log('✅ All features activated successfully');
});

// UPDATE HERO STATS DYNAMICALLY
function updateHeroStats() {
    if (typeof jobs === 'undefined') return;
    
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 4) {
        statNumbers[0].textContent = jobs.length;
        const companies = [...new Set(jobs.map(j => j.company))];
        statNumbers[1].textContent = companies.length;
        const remoteJobs = jobs.filter(j => j.location?.toLowerCase().includes('remote'));
        statNumbers[2].textContent = remoteJobs.length;
        const internships = jobs.filter(j => j.title.toLowerCase().includes('intern'));
        statNumbers[3].textContent = internships.length;
    }
}

// ENHANCED SEARCH WITH FILTERS
window.searchJobsEnhanced = function() {
    if (!jobs || jobs.length === 0) {
        alert('⚠️ Jobs are loading, please wait...');
        return;
    }
    
    const keyword = document.getElementById('keyword-search')?.value.toLowerCase().trim() || '';
    const location = document.getElementById('location-filter')?.value.toLowerCase().trim() || '';
    
    console.log('🔍 Searching:', { keyword, location });
    
    let filtered = jobs;
    
    // Filter by keyword
    if (keyword) {
        filtered = filtered.filter(job => 
            job.title.toLowerCase().includes(keyword) ||
            job.description.toLowerCase().includes(keyword) ||
            job.company.toLowerCase().includes(keyword)
        );
    }
    
    // Filter by location
    if (location) {
        filtered = filtered.filter(job => 
            job.location.toLowerCase().includes(location)
        );
    }
    
    console.log('✅ Found:', filtered.length, 'jobs');
    
    // Show results
    if (filtered.length === 0) {
        alert('😔 No jobs found matching your criteria. Try different keywords or location.');
        return;
    }
    
    // Display filtered jobs
    if (typeof displayJobListings === 'function') {
        displayJobListings(filtered);
    }
    
    // Scroll to results
    document.getElementById('job-search-section')?.scrollIntoView({ behavior: 'smooth' });
    
    // Show toast
    if (typeof showToast === 'function') {
        showToast(`Found ${filtered.length} jobs matching your search`, { type: 'success' });
    }
};

// Override default searchJobs
window.searchJobs = window.searchJobsEnhanced;

// SMOOTH SCROLL FOR ALL INTERNAL LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// KEYBOARD SHORTCUTS
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K = Focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('keyword-search')?.focus();
    }
    
    // Escape = Close dashboard
    if (e.key === 'Escape') {
        const dashboard = document.getElementById('dashboard-section');
        if (dashboard && !dashboard.classList.contains('section-hidden')) {
            document.getElementById('dashboard-close')?.click();
        }
    }
    
    // Ctrl/Cmd + H = Go home
    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        document.getElementById('back-to-home')?.click();
    }
});

// ACCESSIBILITY - Add ARIA labels dynamically
setTimeout(() => {
    document.querySelectorAll('button:not([aria-label])').forEach(btn => {
        if (!btn.getAttribute('aria-label')) {
            btn.setAttribute('aria-label', btn.textContent.trim() || 'Button');
        }
    });
}, 1000);

console.log('✅ Complete Functionality Script Ready');
console.log('💡 Keyboard Shortcuts:');
console.log('   - Ctrl/Cmd + K: Focus search');
console.log('   - Ctrl/Cmd + H: Go home');
console.log('   - Escape: Close dashboard');
