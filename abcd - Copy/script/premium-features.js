// ═══════════════════════════════════════════════════════════
// PREMIUM FEATURES - LIGHTWEIGHT & OPTIMIZED
// ═══════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════
// 1. ADVANCED FILTERS (Salary, Experience, Work Mode)
// ═══════════════════════════════════════════════════════════

function initAdvancedFilters() {
    const sidebar = document.querySelector('.jobs-sidebar');
    if (!sidebar) return;
    
    const filterCard = document.createElement('div');
    filterCard.className = 'sidebar-card';
    filterCard.innerHTML = `
        <h3>🎯 Advanced Filters</h3>
        
        <div style="margin:15px 0">
            <label style="font-weight:600;font-size:13px;color:var(--primary);display:block;margin-bottom:8px">💰 Salary Range</label>
            <select id="salary-filter" style="width:100%;padding:10px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px">
                <option value="">Any Salary</option>
                <option value="0-30">₹0 - ₹30k</option>
                <option value="30-50">₹30k - ₹50k</option>
                <option value="50-70">₹50k - ₹70k</option>
                <option value="70-100">₹70k - ₹1L</option>
                <option value="100+">₹1L+</option>
            </select>
        </div>
        
        <div style="margin:15px 0">
            <label style="font-weight:600;font-size:13px;color:var(--primary);display:block;margin-bottom:8px">📊 Experience</label>
            <select id="experience-filter" style="width:100%;padding:10px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px">
                <option value="">Any Experience</option>
                <option value="fresher">Fresher</option>
                <option value="1-3">1-3 Years</option>
                <option value="3-5">3-5 Years</option>
                <option value="5+">5+ Years</option>
            </select>
        </div>
        
        <div style="margin:15px 0">
            <label style="font-weight:600;font-size:13px;color:var(--primary);display:block;margin-bottom:8px">🏢 Work Mode</label>
            <select id="workmode-filter" style="width:100%;padding:10px;border:2px solid #e5e7eb;border-radius:8px;font-size:14px">
                <option value="">Any Mode</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
            </select>
        </div>
        
        <button onclick="applyAdvancedFilters()" style="width:100%;padding:12px;background:linear-gradient(135deg,#667eea,#764ba2);color:white;border:none;border-radius:10px;font-weight:700;cursor:pointer;margin-top:10px">
            Apply Filters
        </button>
        <button onclick="clearAllFilters()" style="width:100%;padding:10px;background:#f3f4f6;color:#6b7280;border:none;border-radius:10px;font-weight:600;cursor:pointer;margin-top:8px;font-size:13px">
            Clear All
        </button>
    `;
    
    sidebar.appendChild(filterCard);
}

window.applyAdvancedFilters = function() {
    if (!jobs) return;
    
    const salary = document.getElementById('salary-filter').value;
    const experience = document.getElementById('experience-filter').value;
    const workmode = document.getElementById('workmode-filter').value;
    
    let filtered = jobs.filter(job => {
        let match = true;
        
        // Salary filter
        if (salary) {
            const jobSalary = parseInt(job.salary.match(/\d+/)?.[0] || 0);
            const [min, max] = salary.split('-').map(s => parseInt(s) || 999);
            match = match && (jobSalary >= min && (max === 999 || jobSalary <= max));
        }
        
        // Experience filter
        if (experience) {
            const title = job.title.toLowerCase();
            if (experience === 'fresher') match = match && title.includes('intern');
            else match = match && !title.includes('intern');
        }
        
        // Work mode filter
        if (workmode) {
            const location = job.location.toLowerCase();
            match = match && location.includes(workmode);
        }
        
        return match;
    });
    
    displayJobListings(filtered);
    showToast(`Found ${filtered.length} jobs`, {type:'success'});
};

window.clearAllFilters = function() {
    document.getElementById('salary-filter').value = '';
    document.getElementById('experience-filter').value = '';
    document.getElementById('workmode-filter').value = '';
    displayJobListings(jobs);
    showToast('Filters cleared', {type:'info'});
};

// ═══════════════════════════════════════════════════════════
// 2. JOB ALERTS & NOTIFICATIONS
// ═══════════════════════════════════════════════════════════

function initJobAlerts() {
    // Check if user wants alerts
    const alertsEnabled = localStorage.getItem('jobAlertsEnabled') === 'true';
    
    if (!alertsEnabled && !localStorage.getItem('alertPromptShown')) {
        setTimeout(() => {
            if (confirm('🔔 Want to receive job alerts?\n\nGet notified when new jobs matching your preferences are posted!')) {
                enableJobAlerts();
            }
            localStorage.setItem('alertPromptShown', 'true');
        }, 5000);
    }
}

function enableJobAlerts() {
    localStorage.setItem('jobAlertsEnabled', 'true');
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                showToast('Job alerts enabled! 🔔', {type:'success'});
                new Notification('Job Portal', {
                    body: 'You will now receive job alerts!',
                    icon: '🔔'
                });
            }
        });
    }
}

// Check for new jobs periodically (lightweight)
function checkNewJobs() {
    const lastCheck = parseInt(localStorage.getItem('lastJobCheck') || '0');
    const currentJobCount = jobs?.length || 0;
    
    if (currentJobCount > lastCheck) {
        const newJobs = currentJobCount - lastCheck;
        if (newJobs > 0 && localStorage.getItem('jobAlertsEnabled') === 'true') {
            showToast(`${newJobs} new jobs posted! 🎉`, {type:'success'});
        }
    }
    
    localStorage.setItem('lastJobCheck', currentJobCount.toString());
}

// ═══════════════════════════════════════════════════════════
// 3. JOB RECOMMENDATIONS (Simple Algorithm)
// ═══════════════════════════════════════════════════════════

function getJobRecommendations() {
    if (!jobs) return [];
    
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const applications = JSON.parse(localStorage.getItem('userApplications') || '[]');
    
    // Get user interests from saved/applied jobs
    const interests = new Set();
    [...savedJobs, ...applications.map(a => a.jobId)].forEach(id => {
        const job = jobs.find(j => j.id === id);
        if (job) {
            job.title.split(' ').forEach(word => interests.add(word.toLowerCase()));
        }
    });
    
    // Score jobs based on interests
    const scored = jobs.map(job => {
        let score = 0;
        interests.forEach(interest => {
            if (job.title.toLowerCase().includes(interest)) score += 2;
            if (job.description.toLowerCase().includes(interest)) score += 1;
        });
        return { job, score };
    });
    
    return scored
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6)
        .map(s => s.job);
}

function showRecommendations() {
    const recommended = getJobRecommendations();
    
    if (recommended.length === 0) return;
    
    const section = document.createElement('section');
    section.className = 'jobs-section';
    section.style.marginTop = '40px';
    section.innerHTML = `
        <div class="section-header">
            <h2>🎯 Recommended For You</h2>
            <p>Based on your activity and preferences</p>
        </div>
        <div id="recommended-jobs" class="job-listings" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px"></div>
    `;
    
    const container = document.querySelector('.jobs-section');
    container.parentNode.insertBefore(section, container.nextSibling);
    
    const recContainer = document.getElementById('recommended-jobs');
    recommended.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = `
            <h3>${job.title}</h3>
            <div class="job-meta"><strong>${job.company}</strong> • ${job.location}</div>
            <p class="job-salary"><strong>Salary:</strong> ${job.salary}</p>
            <p class="job-desc">${job.description.substring(0, 100)}...</p>
            <div class="job-actions">
                <button class="apply-btn" onclick="applyToJobFixed(${job.id})">🚀 APPLY</button>
                <button class="save-btn" onclick="toggleSaveJob(${job.id})">🤍 Save</button>
            </div>
        `;
        recContainer.appendChild(card);
    });
}

// ═══════════════════════════════════════════════════════════
// 4. JOB COMPARISON TOOL - DISABLED (Using advanced-enhancements.js)
// ═══════════════════════════════════════════════════════════

// Comparison feature moved to advanced-enhancements.js to avoid duplicates

// ═══════════════════════════════════════════════════════════
// 5. QUICK STATS & ANALYTICS
// ═══════════════════════════════════════════════════════════

function showQuickStats() {
    // Stats handled by complete-functionality.js
}

// ═══════════════════════════════════════════════════════════
// 6. SOCIAL SHARE FEATURE
// ═══════════════════════════════════════════════════════════

function addShareButtons() {
    document.querySelectorAll('.job-card').forEach(card => {
        if (card.querySelector('.share-btn')) return;
        
        const jobId = card.getAttribute('data-job-id');
        const job = jobs.find(j => j.id == jobId);
        if (!job) return;
        
        const shareBtn = document.createElement('button');
        shareBtn.className = 'share-btn';
        shareBtn.innerHTML = '🔗 Share';
        shareBtn.style.cssText = 'padding:8px 16px;background:#f3f4f6;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:13px;transition:all 0.3s';
        shareBtn.onclick = () => shareJob(job);
        
        const actions = card.querySelector('.job-actions');
        if (actions) actions.appendChild(shareBtn);
    });
}

function shareJob(job) {
    const shareData = {
        title: job.title,
        text: `Check out this job: ${job.title} at ${job.company}`,
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData);
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(`${job.title} at ${job.company}\n${window.location.href}`);
        showToast('Link copied to clipboard! 📋', {type:'success'});
    }
}

// ═══════════════════════════════════════════════════════════
// 7. SKELETON LOADING (Already exists, enhance it)
// ═══════════════════════════════════════════════════════════

function showSkeletonLoading() {
    const container = document.getElementById('job-listings');
    if (!container) return;
    
    container.innerHTML = `
        ${[1,2,3,4,5,6].map(() => `
            <div class="skeleton-card" style="background:#f3f4f6;border-radius:12px;padding:20px;margin:10px 0">
                <div class="skeleton" style="height:24px;width:70%;margin-bottom:15px;background:linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%);background-size:200% 100%;animation:skeleton-loading 1.5s infinite;border-radius:4px"></div>
                <div class="skeleton" style="height:16px;width:50%;margin-bottom:10px;background:linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%);background-size:200% 100%;animation:skeleton-loading 1.5s infinite;border-radius:4px"></div>
                <div class="skeleton" style="height:16px;width:90%;margin-bottom:10px;background:linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%);background-size:200% 100%;animation:skeleton-loading 1.5s infinite;border-radius:4px"></div>
                <div class="skeleton" style="height:40px;width:100%;margin-top:15px;background:linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%);background-size:200% 100%;animation:skeleton-loading 1.5s infinite;border-radius:8px"></div>
            </div>
        `).join('')}
    `;
}

// ═══════════════════════════════════════════════════════════
// 8. INITIALIZE ALL FEATURES
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    // Wait for jobs to load
    setTimeout(() => {
        if (jobs && jobs.length > 0) {
            initAdvancedFilters();
            initJobAlerts();
            showRecommendations();
            showQuickStats();
            checkNewJobs();
            
            // Add share buttons after jobs are displayed
            setTimeout(addShareButtons, 1000);
        }
    }, 1000);
});

// Check for new jobs every 5 minutes (lightweight)
setInterval(checkNewJobs, 300000);

console.log('✅ Premium Features Loaded (Lightweight Mode)');
