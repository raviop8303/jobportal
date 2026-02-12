// Simple Job Portal - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is authenticated
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    console.log('User authenticated:', isAuth);
    
    // Load employer jobs from localStorage and merge with main jobs
    const loadAllJobs = () => {
        if (typeof jobs !== 'undefined') {
            const employerJobs = localStorage.getItem('employerJobs');
            if (employerJobs) {
                const parsedEmployerJobs = JSON.parse(employerJobs);
                console.log('Loading employer jobs:', parsedEmployerJobs.length);
                // Merge employer jobs with main jobs (avoid duplicates)
                parsedEmployerJobs.forEach(empJob => {
                    if (!jobs.find(j => j.id === empJob.id || j._id === empJob._id)) {
                        jobs.push(empJob);
                        console.log('Added employer job:', empJob.title);
                    }
                });
            }
            console.log('Total jobs after merge:', jobs.length);
            return jobs;
        }
        return [];
    };
    
    // Update stats with real data
    const updateStats = () => {
        const allJobs = loadAllJobs();
        if (allJobs.length > 0) {
            const remoteJobs = allJobs.filter(j => j.location.toLowerCase().includes('remote')).length;
            const internships = allJobs.filter(j => j.title.toLowerCase().includes('intern')).length;
            const companies = new Set(allJobs.map(j => j.company)).size;
            
            const statNumbers = document.querySelectorAll('.stat-number');
            const targets = [allJobs.length, companies, remoteJobs, internships];
            
            statNumbers.forEach((el, i) => {
                const target = targets[i] || 0;
                el.textContent = target;
            });
        }
    };
    
    // Wait for jobs to load
    setTimeout(() => {
        const allJobs = loadAllJobs();
        if (allJobs.length > 0) {
            displayJobListings(allJobs);
            // updateStats(); // Disabled - using HTML values
            console.log('✅ Jobs loaded successfully:', allJobs.length);
        } else {
            console.log('❌ Jobs not loaded, retrying...');
            // Retry after more time
            setTimeout(() => {
                const retryJobs = loadAllJobs();
                if (retryJobs.length > 0) {
                    displayJobListings(retryJobs);
                    console.log('✅ Jobs loaded on retry:', retryJobs.length);
                }
            }, 500);
        }
    }, 200);
    


    // View All Jobs button
    const viewAllJobsBtn = document.getElementById('view-all-jobs-btn');
    if (viewAllJobsBtn) {
        viewAllJobsBtn.addEventListener('click', () => {
            console.log('🚀 View All Jobs clicked');
            const allJobs = loadAllJobs();
            
            // Hide ALL home sections
            const heroSection = document.querySelector('.hero-banner');
            if (heroSection) heroSection.style.display = 'none';
            
            document.getElementById('job-search-section').style.display = 'none';
            
            const companies = document.querySelector('.featured-companies');
            if (companies) companies.style.display = 'none';
            
            const testimonials = document.querySelector('.testimonials-section');
            if (testimonials) testimonials.style.display = 'none';
            
            const newsletter = document.querySelector('.newsletter-section');
            if (newsletter) newsletter.style.display = 'none';
            
            // Show all jobs section
            const allJobsSection = document.getElementById('all-jobs-section');
            allJobsSection.classList.remove('section-hidden');
            allJobsSection.style.display = '';
            
            // Display jobs
            displayAllJobs(allJobs);
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            console.log('✅ All jobs page shown');
        });
    }

    // Listen for localStorage changes (when employer adds job)
    window.addEventListener('storage', (e) => {
        if (e.key === 'employerJobs') {
            console.log('📢 New job added by employer!');
            const allJobs = loadAllJobs();
            displayJobListings(allJobs);
            updateStats();
        }
    });
    
    // Back to home button
    const backToHomeBtn = document.getElementById('back-to-home');
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', () => {
            console.log('🏠 Back to Home clicked');
            
            // Hide all jobs section
            const allJobsSection = document.getElementById('all-jobs-section');
            allJobsSection.classList.add('section-hidden');
            allJobsSection.style.display = 'none';
            
            // Show ALL home sections
            const heroSection = document.querySelector('.hero-banner');
            if (heroSection) heroSection.style.display = 'block';
            
            document.getElementById('job-search-section').style.display = 'block';
            
            const companies = document.querySelector('.featured-companies');
            if (companies) companies.style.display = 'block';
            
            const testimonials = document.querySelector('.testimonials-section');
            if (testimonials) testimonials.style.display = 'block';
            
            const newsletter = document.querySelector('.newsletter-section');
            if (newsletter) newsletter.style.display = 'block';
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            console.log('✅ Home page restored');
        });
    }

    // All jobs search button
    const allSearchBtn = document.getElementById('all-search-btn');
    if (allSearchBtn) {
        allSearchBtn.addEventListener('click', filterAllJobs);
    }
    
    // Category tags click handler
    document.querySelectorAll('.category-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const category = this.textContent.trim();
            filterByCategory(category);
        });
    });

    // Dashboard functionality
    const dashboardToggle = document.getElementById('dashboard-toggle');
    const dashboardPanel = document.getElementById('dashboard-section');
    const dashboardClose = document.getElementById('dashboard-close');
    const dashboardOverlay = document.getElementById('dashboard-overlay');
    
    if (dashboardToggle) {
        dashboardToggle.addEventListener('click', () => {
            console.log('🎯 Dashboard toggle clicked');
            dashboardPanel.classList.remove('section-hidden');
            dashboardPanel.classList.add('open');
            if (dashboardOverlay) {
                dashboardOverlay.classList.remove('section-hidden');
                dashboardOverlay.classList.add('open');
            }
            loadDashboard();
        });
    }
    
    if (dashboardClose) {
        dashboardClose.addEventListener('click', () => {
            console.log('❌ Dashboard close clicked');
            dashboardPanel.classList.add('section-hidden');
            dashboardPanel.classList.remove('open');
            if (dashboardOverlay) {
                dashboardOverlay.classList.add('section-hidden');
                dashboardOverlay.classList.remove('open');
            }
        });
    }
    
    // Close dashboard when clicking overlay
    if (dashboardOverlay) {
        dashboardOverlay.addEventListener('click', () => {
            console.log('🔲 Overlay clicked - closing dashboard');
            dashboardPanel.classList.add('section-hidden');
            dashboardPanel.classList.remove('open');
            dashboardOverlay.classList.add('section-hidden');
            dashboardOverlay.classList.remove('open');
        });
    }
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeToggle.textContent = isDark ? '☀️' : '🌙';
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark-theme');
            themeToggle.textContent = '☀️';
        } else {
            themeToggle.textContent = '🌙';
        }
    }
    
    // Initialize user data
    initializeUserData();
    
    // Profile button functionality
    const profileBtn = document.getElementById('nav-logout');
    if (profileBtn) {
        const isAuth = localStorage.getItem('isAuthenticated') === 'true';
        const userName = localStorage.getItem('userName');
        const userPhoto = localStorage.getItem('userPhoto');
        
        if (isAuth && userPhoto) {
            // Show profile photo
            profileBtn.innerHTML = `<img src="${userPhoto}" alt="Profile" style="width:32px;height:32px;border-radius:50%;object-fit:cover;border:2px solid white">`;
            profileBtn.title = `${userName} - Click for profile menu`;
        } else if (isAuth && userName) {
            // Show initial
            profileBtn.textContent = userName.charAt(0).toUpperCase();
            profileBtn.title = `${userName} - Click for profile menu`;
        } else {
            // Not logged in - show login text
            profileBtn.textContent = 'Login';
            profileBtn.title = 'Click to login';
        }
        
        profileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check if user is logged in
            const isAuth = localStorage.getItem('isAuthenticated') === 'true';
            if (!isAuth) {
                // Redirect to login page
                window.location.href = 'login.html';
                return;
            }
            
            // Check if dropdown already exists
            const existingMenu = document.querySelector('.profile-dropdown');
            if (existingMenu) {
                existingMenu.remove();
                return;
            }
            
            // Create dropdown menu
            const menu = document.createElement('div');
            menu.className = 'profile-dropdown';
            menu.style.cssText = `
                position: absolute;
                top: 100%;
                right: 0;
                background: white;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                min-width: 150px;
                z-index: 1000;
            `;
            
            const userName = localStorage.getItem('userName') || 'User';
            const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
            
            const userPhoto = localStorage.getItem('userPhoto');
            
            menu.innerHTML = `
                <div style="padding:15px;border-bottom:1px solid #e5e7eb;background:white">
                    <div style="display:flex;align-items:center;gap:12px">
                        ${userPhoto ? `<img src="${userPhoto}" alt="Profile" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid #0ea5a4">` : `<div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#0ea5a4,#0b7b76);display:flex;align-items:center;justify-content:center;font-size:18px;color:white">👤</div>`}
                        <div style="flex:1">
                            <div style="font-weight:600;color:#1a202c;margin-bottom:2px;font-size:14px">${userName}</div>
                            <div style="font-size:11px;color:#718096">${userEmail}</div>
                        </div>
                    </div>
                </div>
                <button onclick="openDashboardFromProfile()" style="width:100%;padding:12px;border:none;background:white;cursor:pointer;text-align:left;border-bottom:1px solid #f3f4f6" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='white'">📋 Dashboard</button>
                <button onclick="showProfileSettings()" style="width:100%;padding:12px;border:none;background:white;cursor:pointer;text-align:left;border-bottom:1px solid #f3f4f6" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='white'">⚙️ Settings</button>
                <button onclick="logoutUser()" style="width:100%;padding:12px;border:none;background:white;cursor:pointer;text-align:left;color:#ef4444;border-radius:0 0 8px 8px" onmouseover="this.style.background='#fef2f2'" onmouseout="this.style.background='white'">🚪 Logout</button>
            `;
            
            profileBtn.parentElement.style.position = 'relative';
            profileBtn.parentElement.appendChild(menu);
            
            // Close on outside click
            setTimeout(() => {
                document.addEventListener('click', function closeMenu(e) {
                    if (!menu.contains(e.target) && e.target !== profileBtn) {
                        menu.remove();
                        document.removeEventListener('click', closeMenu);
                    }
                });
            }, 100);
        });
    }
});

// Filter all jobs function
function filterAllJobs() {
    if (!jobs) return;
    
    const keyword = document.getElementById('all-search-input').value.toLowerCase().trim();
    const typeFilter = document.getElementById('all-type-filter').value;
    const location = document.getElementById('all-location-filter').value.toLowerCase().trim();
    
    let filtered = jobs.filter(job => {
        const matchKeyword = !keyword || 
            job.title.toLowerCase().includes(keyword) || 
            job.description.toLowerCase().includes(keyword) ||
            job.company.toLowerCase().includes(keyword);
        
        const matchLocation = !location || 
            job.location.toLowerCase().includes(location);
        
        let matchType = true;
        if (typeFilter === 'jobs') {
            matchType = !job.title.toLowerCase().includes('intern');
        } else if (typeFilter === 'internships') {
            matchType = job.title.toLowerCase().includes('intern');
        }
        
        return matchKeyword && matchLocation && matchType;
    });
    
    displayAllJobs(filtered);
}

// Display jobs on main page
function displayJobListings(jobList) {
    const container = document.getElementById('job-listings');
    if (!container || !jobList) return;

    container.innerHTML = '';
    jobList.slice(0, 5).forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.setAttribute('data-job-id', job.id);
        
        const isSaved = isJobSaved(job.id);
        
        card.innerHTML = `
            <h3>${job.title}</h3>
            <div class="job-meta">
                <strong>${job.company}</strong> • <span>${job.location}</span>
            </div>
            <p class="job-salary"><strong>Salary:</strong> ${job.salary}</p>
            <p class="job-desc">${job.description.substring(0, 140)}...</p>
            <div class="job-actions">
                <button class="apply-btn" data-job-id="${job.id}">🚀 APPLY NOW</button>
                <button class="save-btn" data-job-id="${job.id}">${isSaved ? '❤️ Saved' : '🤍 Save'}</button>
                <button class="compare-btn" onclick="if(typeof jobComparison !== 'undefined') jobComparison.add(${job.id})" style="padding:10px 16px;background:#f3f4f6;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:13px">⚖️ Compare</button>
                <button class="share-btn" onclick="shareJob({id:${job.id},title:'${job.title.replace(/'/g, "\\'").replace(/"/g, '&quot;')}',company:'${job.company.replace(/'/g, "\\'").replace(/"/g, '&quot;')}',location:'${job.location.replace(/'/g, "\\'").replace(/"/g, '&quot;')}',salary:'${job.salary}'})" style="padding:10px 16px;background:#f3f4f6;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:13px">🔗 Share</button>
            </div>
        `;
        
        // Add event listeners directly
        const applyBtn = card.querySelector('.apply-btn');
        const saveBtn = card.querySelector('.save-btn');
        
        applyBtn.addEventListener('click', () => applyToJobFixed(job.id));
        saveBtn.addEventListener('click', () => toggleSaveJob(job.id));
        
        container.appendChild(card);
    });
}

// Display all jobs page
function displayAllJobs(jobList) {
    const container = document.getElementById('all-jobs-list');
    if (!container || !jobList) return;

    container.innerHTML = '';
    jobList.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.setAttribute('data-job-id', job.id);
        
        const isSaved = isJobSaved(job.id);
        
        card.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>${job.company}</strong> • ${job.location}</p>
            <p class="job-salary"><strong>Salary:</strong> ${job.salary}</p>
            <p class="job-desc">${job.description.substring(0, 150)}...</p>
            <div class="job-actions">
                <button class="apply-btn" data-job-id="${job.id}">🚀 APPLY NOW</button>
                <button class="save-btn" data-job-id="${job.id}">${isSaved ? '❤️ Saved' : '🤍 Save'}</button>
                <button class="share-btn" onclick="shareJob({id:${job.id},title:'${job.title.replace(/'/g, "\\'").replace(/"/g, '&quot;')}',company:'${job.company.replace(/'/g, "\\'").replace(/"/g, '&quot;')}',location:'${job.location.replace(/'/g, "\\'").replace(/"/g, '&quot;')}',salary:'${job.salary}'})" style="padding:10px 16px;background:#f3f4f6;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:13px">🔗 Share</button>
            </div>
        `;
        
        // Add event listeners directly
        const applyBtn = card.querySelector('.apply-btn');
        const saveBtn = card.querySelector('.save-btn');
        
        applyBtn.addEventListener('click', () => applyToJobFixed(job.id));
        saveBtn.addEventListener('click', () => toggleSaveJob(job.id));
        
        container.appendChild(card);
    });
}

// Universal Apply Function - Works for all apply buttons
window.applyToJob = window.applyToJobFixed = window.applyForJob = window.redirectToApply = function(jobId) {
    console.log('🚀 Applying to job:', jobId);
    
    // Check authentication
    if (localStorage.getItem('isAuthenticated') !== 'true') {
        alert('Please login to apply for jobs');
        window.location.href = 'login.html';
        return;
    }
    
    // Check if user is employer
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'employer') {
        alert('Employers cannot apply for jobs. Only Job Seekers can apply.');
        return;
    }
    
    // Save jobs data
    if (typeof jobs !== 'undefined' && jobs.length > 0) {
        localStorage.setItem('currentJobs', JSON.stringify(jobs));
        console.log('✅ Jobs data saved:', jobs.length, 'jobs');
    }
    
    // Redirect to apply page
    window.location.href = 'apply.html?jobId=' + jobId;
};

// Save/Unsave job
function toggleSaveJob(jobId) {
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    
    if (savedJobs.includes(jobId)) {
        // Remove from saved
        savedJobs = savedJobs.filter(id => id !== jobId);
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    } else {
        // Add to saved
        savedJobs.push(jobId);
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    }
    
    // Refresh current view
    if (document.getElementById('all-jobs-section').classList.contains('section-hidden')) {
        displayJobListings(jobs);
    } else {
        displayAllJobs(jobs);
    }
}

// Check if job is saved
function isJobSaved(jobId) {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    return savedJobs.includes(jobId);
}

// Search jobs - OPTIMIZED
function searchJobs() {
    console.log('🔍 Search Jobs triggered');
    
    if (!jobs || jobs.length === 0) {
        alert('⚠️ Jobs are loading, please wait...');
        return;
    }
    
    const keywordInput = document.getElementById('keyword-search');
    const locationSelect = document.getElementById('location-filter');
    
    if (!keywordInput || !locationSelect) {
        console.error('Search elements not found');
        return;
    }
    
    const keyword = keywordInput.value.toLowerCase().trim();
    const location = locationSelect.value.toLowerCase().trim();
    
    console.log('Search params:', { keyword, location });
    
    let filtered = jobs;
    
    // Filter by keyword
    if (keyword) {
        filtered = filtered.filter(job => {
            const title = job.title.toLowerCase();
            const company = job.company.toLowerCase();
            const description = job.description.toLowerCase();
            const loc = job.location.toLowerCase();
            
            return title.includes(keyword) || 
                   company.includes(keyword) || 
                   description.includes(keyword) ||
                   loc.includes(keyword);
        });
    }
    
    // Filter by location
    if (location) {
        filtered = filtered.filter(job => {
            const jobLocation = job.location.toLowerCase();
            return jobLocation.includes(location);
        });
    }
    
    console.log('✅ Found:', filtered.length, 'jobs');
    
    // Display results
    if (filtered.length === 0) {
        alert('😔 No jobs found matching your criteria. Try different keywords or location.');
        displayJobListings(jobs.slice(0, 6)); // Show default jobs
        return;
    }
    
    displayJobListings(filtered);
    
    // Show success message
    if (typeof showToast === 'function') {
        showToast(`Found ${filtered.length} jobs`, { type: 'success' });
    }
    
    // Scroll to results
    const jobSection = document.getElementById('job-search-section');
    if (jobSection) {
        jobSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Filter by category
function filterByCategory(category) {
    if (!jobs) return;
    
    console.log('Filtering by category:', category);
    
    const filtered = jobs.filter(job => {
        const title = job.title.toLowerCase();
        const description = job.description.toLowerCase();
        const categoryLower = category.toLowerCase();
        
        // Match category in title or description
        return title.includes(categoryLower) || description.includes(categoryLower);
    });
    
    console.log('Found jobs:', filtered.length);
    
    // Show all jobs section with filtered results
    document.getElementById('job-search-section').style.display = 'none';
    document.getElementById('all-jobs-section').classList.remove('section-hidden');
    
    // Display filtered jobs
    displayAllJobs(filtered);
    
    // Update header to show category
    const header = document.querySelector('#all-jobs-section .all-jobs-header h2');
    if (header) {
        header.textContent = `${category} Jobs (${filtered.length})`;
    }
}

// Filter by company
function filterByCompany(companyName) {
    if (!jobs) return;
    
    console.log('Filtering by company:', companyName);
    
    const filtered = jobs.filter(job => {
        return job.company.toLowerCase() === companyName.toLowerCase();
    });
    
    console.log('Found jobs:', filtered.length);
    
    // Hide home sections
    const heroSection = document.querySelector('.hero-banner');
    if (heroSection) heroSection.style.display = 'none';
    document.getElementById('job-search-section').style.display = 'none';
    const companies = document.querySelector('.featured-companies');
    if (companies) companies.style.display = 'none';
    const testimonials = document.querySelector('.testimonials-section');
    if (testimonials) testimonials.style.display = 'none';
    const newsletter = document.querySelector('.newsletter-section');
    if (newsletter) newsletter.style.display = 'none';
    
    // Show all jobs section
    const allJobsSection = document.getElementById('all-jobs-section');
    allJobsSection.classList.remove('section-hidden');
    allJobsSection.style.display = 'block';
    
    // Display filtered jobs
    displayAllJobs(filtered);
    
    // Update header
    const header = document.querySelector('#all-jobs-section .all-jobs-header h2');
    if (header) {
        header.textContent = `${companyName} Jobs (${filtered.length})`;
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Show toast
    if (typeof showToast === 'function') {
        showToast(`Found ${filtered.length} jobs at ${companyName}`, { type: 'success' });
    }
}

// Dashboard functions - Check if dashboard.js loadDashboard exists
if (typeof window.loadDashboard === 'undefined') {
    window.loadDashboard = function() {
        const container = document.getElementById('dashboard-content');
        if (!container) return;
        
        const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        const applications = JSON.parse(localStorage.getItem('userApplications') || '[]');
        const userName = localStorage.getItem('userName') || 'User';
        const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
        
        container.innerHTML = `
            <div class="dashboard-view">
                <div class="user-welcome" style="background:linear-gradient(135deg, var(--accent), #0b7b76);color:white;padding:20px;border-radius:12px;margin-bottom:20px;text-align:center">
                    <div style="font-size:2rem;margin-bottom:8px">👤</div>
                    <h3 style="margin:0 0 4px 0;color:white">Welcome back, ${userName}!</h3>
                    <p style="margin:0;opacity:0.9;font-size:14px">${userEmail}</p>
                </div>
                <h4>Dashboard Overview</h4>
                
                <!-- Quick Stats -->
                <div class="stats-grid" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px;margin:20px 0">
                    <div class="stat-card" style="background:rgba(14,165,164,0.1);padding:15px;border-radius:8px;text-align:center">
                        <span style="display:block;font-size:24px;font-weight:700;color:var(--accent)">${savedJobs.length}</span>
                        <span style="font-size:12px;color:var(--muted)">Saved Jobs</span>
                    </div>
                    <div class="stat-card" style="background:rgba(59,130,246,0.1);padding:15px;border-radius:8px;text-align:center">
                        <span style="display:block;font-size:24px;font-weight:700;color:#3b82f6">${applications.length}</span>
                        <span style="font-size:12px;color:var(--muted)">Applications</span>
                    </div>
                    <div class="stat-card" style="background:rgba(16,185,129,0.1);padding:15px;border-radius:8px;text-align:center">
                        <span style="display:block;font-size:24px;font-weight:700;color:#10b981">${jobs ? jobs.length : 0}</span>
                        <span style="font-size:12px;color:var(--muted)">Total Jobs</span>
                    </div>
                </div>
                
                <!-- Main Actions -->
                <div class="dashboard-section" style="margin:20px 0">
                    <h5>Quick Actions</h5>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px 0">
                        <button class="btn-primary" onclick="searchJobsInDash()">🔍 Search Jobs</button>
                        <button class="btn-secondary" onclick="showSavedJobsInDash()">🤍 Saved Jobs (${savedJobs.length})</button>
                        <button class="btn-secondary" onclick="showApplicationsInDash()">📋 Applications (${applications.length})</button>
                        <button class="btn-secondary" onclick="showProfileInDash()">👤 Profile</button>
                    </div>
                </div>
                
                <!-- Recent Activity -->
                <div class="dashboard-section" style="margin:20px 0">
                    <h5>Recent Activity</h5>
                    ${getRecentActivity()}
                </div>
            </div>
        `;
    };
}

function showSavedJobsInDash() {
    const container = document.getElementById('dashboard-content');
    if (!container) return;
    
    const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const savedJobs = jobs.filter(job => savedJobIds.includes(job.id));
    
    let html = `
        <div class="dashboard-view">
            <h3>Saved Jobs (${savedJobs.length})</h3>
            <button class="btn-secondary" onclick="loadDashboard()" style="margin-bottom:20px">← Back</button>
    `;
    
    if (savedJobs.length === 0) {
        html += '<p>No saved jobs yet.</p>';
    } else {
        savedJobs.forEach(job => {
            html += `
                <div class="job-card">
                    <h3>${job.title}</h3>
                    <p><strong>${job.company}</strong> • ${job.location} • ${job.salary}</p>
                    <p>${job.description.substring(0, 150)}...</p>
                    <div class="job-actions">
                        <button class="apply-btn" onclick="applyToJobFixed(${job.id})">🚀 APPLY NOW</button>
                        <button class="save-btn" onclick="removeSavedJob(${job.id})">❤️ Remove</button>
                    </div>
                </div>
            `;
        });
    }
    
    html += '</div>';
    container.innerHTML = html;
}

function removeSavedJob(jobId) {
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    savedJobs = savedJobs.filter(id => id !== jobId);
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    showSavedJobsInDash(); // Refresh
}

function showApplicationsInDash() {
    const container = document.getElementById('dashboard-content');
    if (!container) return;
    
    const applications = JSON.parse(localStorage.getItem('userApplications') || '[]');
    
    let html = `
        <div class="dashboard-view">
            <h3>My Applications (${applications.length})</h3>
            <button class="btn-secondary" onclick="loadDashboard()" style="margin-bottom:20px">← Back</button>
    `;
    
    if (applications.length === 0) {
        html += '<p>No applications yet.</p>';
    } else {
        applications.forEach(app => {
            html += `
                <div class="job-card">
                    <h3>${app.jobTitle}</h3>
                    <p><strong>${app.company}</strong></p>
                    <p>Applied: ${new Date(app.appliedAt).toLocaleDateString()}</p>
                    <p>Status: ${app.status || 'Submitted'}</p>
                </div>
            `;
        });
    }
    
    html += '</div>';
    container.innerHTML = html;
}

// New Dashboard Features
function searchJobsInDash() {
    const container = document.getElementById('dashboard-content');
    if (!container) return;
    
    container.innerHTML = `
        <div class="dashboard-view">
            <h3>🔍 Search Jobs</h3>
            <button class="btn-secondary" onclick="loadDashboard()" style="margin-bottom:20px">← Back</button>
            
            <div class="search-bar" style="margin-bottom:20px;display:flex;gap:10px">
                <input type="text" id="dash-keyword" placeholder="Keywords" style="flex:1;padding:10px;border:1px solid #ddd;border-radius:5px">
                <select id="dash-location" style="padding:10px;border:1px solid #ddd;border-radius:5px">
                    <option value="">Any Location</option>
                    <option value="remote">Remote</option>
                    <option value="new york">New York</option>
                    <option value="boston">Boston</option>
                </select>
                <button class="btn-primary" onclick="performDashSearch()">Search</button>
            </div>
            
            <div id="dash-search-results"></div>
        </div>
    `;
    
    displayDashSearchResults(jobs.slice(0, 10));
}

function performDashSearch() {
    const keyword = document.getElementById('dash-keyword').value.toLowerCase();
    const location = document.getElementById('dash-location').value.toLowerCase();
    
    const filtered = jobs.filter(job => {
        const matchKeyword = !keyword || 
            job.title.toLowerCase().includes(keyword) || 
            job.description.toLowerCase().includes(keyword);
        const matchLocation = !location || job.location.toLowerCase().includes(location);
        return matchKeyword && matchLocation;
    });
    
    displayDashSearchResults(filtered);
}

function displayDashSearchResults(jobList) {
    const container = document.getElementById('dash-search-results');
    if (!container) return;
    
    if (jobList.length === 0) {
        container.innerHTML = '<p>No jobs found.</p>';
        return;
    }
    
    container.innerHTML = `<h4>Found ${jobList.length} jobs</h4>`;
    
    jobList.forEach(job => {
        const isSaved = isJobSaved(job.id);
        const card = document.createElement('div');
        card.className = 'job-card';
        card.style.cssText = 'margin:10px 0;padding:15px;border:1px solid #eee;border-radius:8px';
        
        card.innerHTML = `
            <h4>${job.title}</h4>
            <p><strong>${job.company}</strong> • ${job.location} • ${job.salary}</p>
            <p>${job.description.substring(0, 120)}...</p>
            <div class="job-actions" style="margin-top:10px">
                <button class="apply-btn" data-job-id="${job.id}">🚀 APPLY NOW</button>
                <button class="save-btn" data-job-id="${job.id}">${isSaved ? '❤️ Saved' : '🤍 Save'}</button>
            </div>
        `;
        
        const applyBtn = card.querySelector('.apply-btn');
        const saveBtn = card.querySelector('.save-btn');
        
        applyBtn.addEventListener('click', () => applyToJobFixed(job.id));
        saveBtn.addEventListener('click', () => toggleSaveJob(job.id));
        
        container.appendChild(card);
    });
}

function showProfileInDash() {
    const container = document.getElementById('dashboard-content');
    if (!container) return;
    
    const applications = JSON.parse(localStorage.getItem('userApplications') || '[]');
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const userName = localStorage.getItem('userName') || 'User';
    const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
    const userRole = localStorage.getItem('userRole') || 'jobseeker';
    const joinDate = localStorage.getItem('joinDate') || new Date().toISOString();
    
    container.innerHTML = `
        <div class="dashboard-view">
            <h3>👤 Profile & Settings</h3>
            <button class="btn-secondary" onclick="loadDashboard()" style="margin-bottom:20px">← Back</button>
            
            <div class="profile-card" style="background:white;padding:20px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.1);margin:20px 0">
                <div style="text-align:center;margin-bottom:20px">
                    ${localStorage.getItem('userPhoto') ? 
                        `<img src="${localStorage.getItem('userPhoto')}" alt="Profile" style="width:100px;height:100px;border-radius:50%;object-fit:cover;border:4px solid var(--accent);margin:0 auto 15px;display:block">` :
                        `<div style="width:100px;height:100px;background:linear-gradient(135deg, var(--accent), #0b7b76);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 15px;font-size:2.5rem;color:white">👤</div>`
                    }
                    <h3 style="margin:0 0 5px 0;color:var(--primary)">${userName}</h3>
                    <p style="margin:0;color:var(--muted);font-size:14px">${userEmail}</p>
                    <span style="background:var(--accent);color:white;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;margin-top:8px;display:inline-block">${userRole.toUpperCase()}</span>
                    <div style="margin-top:15px">
                        <button class="btn-secondary" onclick="showChangeProfilePhoto()" style="background:#8b5cf6;color:white;padding:8px 16px;font-size:13px">📸 Change Photo</button>
                    </div>
                </div>
                
                <div class="profile-stats" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px;margin:20px 0">
                    <div style="text-align:center;padding:15px;background:#f8f9fa;border-radius:8px">
                        <div style="font-size:24px;font-weight:700;color:var(--accent)">${applications.length}</div>
                        <div style="font-size:12px;color:var(--muted)">Applications</div>
                    </div>
                    <div style="text-align:center;padding:15px;background:#f8f9fa;border-radius:8px">
                        <div style="font-size:24px;font-weight:700;color:#ef4444">${savedJobs.length}</div>
                        <div style="font-size:12px;color:var(--muted)">Saved Jobs</div>
                    </div>
                    <div style="text-align:center;padding:15px;background:#f8f9fa;border-radius:8px">
                        <div style="font-size:24px;font-weight:700;color:#10b981">${Math.floor((new Date() - new Date(joinDate)) / (1000 * 60 * 60 * 24))}</div>
                        <div style="font-size:12px;color:var(--muted)">Days Active</div>
                    </div>
                </div>
            </div>
            
            <div class="profile-section" style="margin:20px 0">
                <h4>Account Information</h4>
                <div style="background:#f8f9fa;padding:15px;border-radius:8px;margin:10px 0">
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px">
                        <div>
                            <label style="font-size:12px;color:var(--muted);font-weight:600">Full Name</label>
                            <p style="margin:4px 0 0 0;font-weight:600">${userName}</p>
                        </div>
                        <div>
                            <label style="font-size:12px;color:var(--muted);font-weight:600">Email</label>
                            <p style="margin:4px 0 0 0;font-weight:600">${userEmail}</p>
                        </div>
                        <div>
                            <label style="font-size:12px;color:var(--muted);font-weight:600">Account Type</label>
                            <p style="margin:4px 0 0 0;font-weight:600">${userRole}</p>
                        </div>
                        <div>
                            <label style="font-size:12px;color:var(--muted);font-weight:600">Member Since</label>
                            <p style="margin:4px 0 0 0;font-weight:600">${new Date(joinDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="settings-section" style="margin:20px 0">
                <h4>Profile Settings</h4>
                <button class="btn-secondary" onclick="showChangeProfilePhoto()" style="background:#8b5cf6;color:white;margin:5px">📸 Change Profile Photo</button>
                <button class="btn-secondary" onclick="clearAllData()" style="background:#ef4444;color:white;margin:5px">🗑️ Clear All Data</button>
                <button class="btn-secondary" onclick="exportData()" style="margin:5px">📥 Export Data</button>
            </div>
            
            <div class="danger-zone" style="margin:20px 0;padding:15px;background:rgba(239,68,68,0.05);border:2px solid #ef4444;border-radius:10px">
                
            
                <button class="btn-secondary" onclick="deleteAccount()" style="background:#dc2626;color:white;margin-top:10px">🚨 Delete Account Permanently</button>
            </div>
        </div>
    `;
}

function getRecentActivity() {
    const applications = JSON.parse(localStorage.getItem('userApplications') || '[]');
    const recentApps = applications.slice(-3).reverse();
    
    if (recentApps.length === 0) {
        return '<p style="color:var(--muted);font-style:italic">No recent activity. Start applying to jobs!</p>';
    }
    
    return recentApps.map(app => `
        <div style="background:#f8f9fa;padding:10px;margin:5px 0;border-radius:5px;border-left:3px solid var(--accent)">
            <strong>Applied to ${app.jobTitle}</strong><br>
            <small style="color:var(--muted)">${app.company} • ${formatDate(app.appliedAt)}</small>
        </div>
    `).join('');
}

function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'today';
        if (diffDays === 2) return 'yesterday';
        if (diffDays <= 7) return `${diffDays - 1} days ago`;
        
        return date.toLocaleDateString();
    } catch (error) {
        return 'recently';
    }
}

function clearAllData() {
    if (confirm('Are you sure you want to clear all your data?')) {
        localStorage.removeItem('savedJobs');
        localStorage.removeItem('userApplications');
        showToast('All data cleared!', {type:'success'});
        loadDashboard();
    }
}

function exportData() {
    const data = {
        savedJobs: JSON.parse(localStorage.getItem('savedJobs') || '[]'),
        applications: JSON.parse(localStorage.getItem('userApplications') || '[]'),
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'job-portal-data.json';
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('Data exported successfully!', {type:'success'});
}

// Delete Account Permanently
function deleteAccount() {
    const userName = localStorage.getItem('userName') || 'User';
    const userEmail = localStorage.getItem('userEmail') || '';
    
    // First confirmation
    const firstConfirm = confirm(`⚠️ WARNING: Delete Account\n\nAre you absolutely sure you want to delete your account?\n\nUser: ${userName}\nEmail: ${userEmail}\n\nThis action CANNOT be undone!`);
    
    if (!firstConfirm) {
        return;
    }
    
    // Second confirmation with typing
    const confirmText = prompt(`To confirm account deletion, please type: DELETE\n\n(Type in CAPITAL letters)`);
    
    if (confirmText !== 'DELETE') {
        alert('❌ Account deletion cancelled. Text did not match.');
        return;
    }
    
    // Final confirmation
    const finalConfirm = confirm(`🚨 FINAL WARNING\n\nThis is your last chance!\n\nDeleting account for: ${userName}\n\nClick OK to permanently delete your account.`);
    
    if (!finalConfirm) {
        alert('Account deletion cancelled.');
        return;
    }
    
    // Delete all user data
    try {
        // Clear authentication
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        
        // Clear user info
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        localStorage.removeItem('joinDate');
        
        // Clear user data
        localStorage.removeItem('savedJobs');
        localStorage.removeItem('userApplications');
        localStorage.removeItem('applicationCount');
        localStorage.removeItem('userResume');
        localStorage.removeItem('userResumeName');
        localStorage.removeItem('userResumeType');
        localStorage.removeItem('userResumeSize');
        localStorage.removeItem('userResumeUploadDate');
        
        // Clear employer data
        localStorage.removeItem('employerJobs');
        localStorage.removeItem('companyName');
        localStorage.removeItem('companyInfo');
        localStorage.removeItem('companyWebsite');
        localStorage.removeItem('userLocation');
        localStorage.removeItem('companyIndustry');
        localStorage.removeItem('companySize');
        
        // Clear theme
        localStorage.removeItem('theme');
        
        // Show success message
        alert('✅ Account Deleted Successfully\n\nYour account and all associated data have been permanently deleted.\n\nYou will now be redirected to the login page.');
        
        // Redirect to login page
        window.location.href = 'login.html';
        
    } catch (error) {
        alert('❌ Error deleting account. Please try again or contact support.');
        console.error('Delete account error:', error);
    }
}

// Profile dropdown functions
function openDashboardFromProfile() {
    document.querySelector('.profile-dropdown')?.remove();
    const dashboardPanel = document.getElementById('dashboard-section');
    if (dashboardPanel) {
        dashboardPanel.classList.remove('section-hidden');
        dashboardPanel.classList.add('open');
        loadDashboard();
    }
}

function showProfileSettings() {
    document.querySelector('.profile-dropdown')?.remove();
    const dashboardPanel = document.getElementById('dashboard-section');
    if (dashboardPanel) {
        dashboardPanel.classList.remove('section-hidden');
        dashboardPanel.classList.add('open');
        showProfileInDash();
    }
}

function logoutUser() {
    document.querySelector('.profile-dropdown')?.remove();
    const userName = localStorage.getItem('userName') || 'User';
    if (confirm(`${userName}, are you sure you want to logout?`)) {
        // Clear all user data including photo
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('joinDate');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userPhoto');
        localStorage.removeItem('userPhotoName');
        localStorage.removeItem('userPhotoSize');
        localStorage.removeItem('userPhotoType');
        localStorage.removeItem('userPhotoUploadDate');
        localStorage.removeItem('loginProvider');
        showToast('Logged out successfully!', {type:'success'});
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 500);
    }
}

// Initialize user data if not exists
function initializeUserData() {
    if (localStorage.getItem('isAuthenticated') === 'true' && !localStorage.getItem('userName')) {
        // Set default user data if missing
        localStorage.setItem('userName', 'User');
        localStorage.setItem('userEmail', 'user.doe@example.com');
        localStorage.setItem('userRole', 'jobseeker');
        localStorage.setItem('joinDate', new Date().toISOString());
    }
}

// Animate counter
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// Global share job function
window.shareJob = function(job) {
    const shareText = `Check out this job: ${job.title} at ${job.company}\nLocation: ${job.location}\nSalary: ${job.salary}`;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: job.title,
            text: shareText,
            url: shareUrl
        }).then(() => {
            showToast('Shared successfully! 🚀', {type:'success'});
        }).catch(() => {
            navigator.clipboard.writeText(shareText + '\n' + shareUrl);
            showToast('Link copied to clipboard! 📋', {type:'success'});
        });
    } else {
        navigator.clipboard.writeText(shareText + '\n' + shareUrl).then(() => {
            showToast('Link copied to clipboard! 📋', {type:'success'});
        }).catch(() => {
            showToast('Unable to share', {type:'error'});
        });
    }
};

// Certificate Functions
let currentCertificate = null;

function showCertificatePage(e) {
    if (e) e.preventDefault();
    
    document.querySelector('.hero-banner').style.display = 'none';
    document.getElementById('job-search-section').style.display = 'none';
    document.querySelector('.featured-companies').style.display = 'none';
    document.querySelector('.testimonials-section').style.display = 'none';
    document.querySelector('.newsletter-section').style.display = 'none';
    document.getElementById('all-jobs-section').classList.add('section-hidden');
    document.getElementById('dedicated-page').classList.add('section-hidden');
    
    document.getElementById('certificate-section').classList.remove('section-hidden');
    document.getElementById('cert-result').classList.add('section-hidden');
    document.getElementById('cert-error').classList.add('section-hidden');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function searchCert() {
    const certId = document.getElementById('cert-search-id').value.trim();
    
    if (!certId) {
        alert('Please enter a certificate ID');
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:3001/api/certificates/search/${certId}`);
        const data = await response.json();
        
        if (data.success && data.certificate) {
            currentCertificate = data.certificate;
            displayCertificate(data.certificate);
        } else {
            showCertError();
        }
    } catch (error) {
        console.error('Search error:', error);
        showCertError();
    }
}

function displayCertificate(cert) {
    document.getElementById('cert-result').classList.remove('section-hidden');
    document.getElementById('cert-error').classList.add('section-hidden');
    
    document.getElementById('cert-student-name').textContent = cert.studentName;
    document.getElementById('cert-domain').textContent = cert.internshipDomain;
    document.getElementById('cert-duration').textContent = 
        `${new Date(cert.startDate).toLocaleDateString()} - ${new Date(cert.endDate).toLocaleDateString()}`;
    document.getElementById('cert-id-display').textContent = cert.certificateId;
    document.getElementById('cert-issued').textContent = new Date(cert.issuedDate || cert.createdAt).toLocaleDateString();
}

function showCertError() {
    document.getElementById('cert-result').classList.add('section-hidden');
    document.getElementById('cert-error').classList.remove('section-hidden');
}

async function downloadCert() {
    if (!currentCertificate) return;
    
    try {
        const response = await fetch(`http://localhost:3001/api/certificates/download/${currentCertificate.certificateId}`);
        const blob = await response.blob();
        
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `certificate-${currentCertificate.certificateId}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        if (typeof showToast === 'function') {
            showToast('Certificate downloaded!', {type:'success'});
        }
    } catch (error) {
        console.error('Download error:', error);
        alert('Download failed. Please try again.');
    }
}