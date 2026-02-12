// --- Enhanced Features ---

// Saved Jobs Management
const savedJobsKey = 'savedJobs';

function getSavedJobs() {
    try {
        return JSON.parse(localStorage.getItem(savedJobsKey) || '[]');
    } catch {
        return [];
    }
}

function saveJob(jobId) {
    const saved = getSavedJobs();
    if (!saved.includes(jobId)) {
        saved.push(jobId);
        localStorage.setItem(savedJobsKey, JSON.stringify(saved));
        showToast('Job saved!', {type:'success'});
        return true;
    }
    showToast('Job already saved', {type:'info'});
    return false;
}

function unsaveJob(jobId) {
    const saved = getSavedJobs();
    const filtered = saved.filter(id => id !== jobId);
    localStorage.setItem(savedJobsKey, JSON.stringify(filtered));
    showToast('Job removed from saved', {type:'info'});
}

function isJobSaved(jobId) {
    return getSavedJobs().includes(jobId);
}

// Advanced Search with Salary Filter
function advancedSearch(keyword, location, minSalary, maxSalary, jobType) {
    return jobs.filter(job => {
        const matchKeyword = !keyword || 
            job.title.toLowerCase().includes(keyword.toLowerCase()) || 
            job.description.toLowerCase().includes(keyword.toLowerCase());
        
        const matchLocation = !location || 
            job.location.toLowerCase().includes(location.toLowerCase());
        
        const matchType = !jobType || 
            (jobType === 'internship' && job.title.toLowerCase().includes('intern')) ||
            (jobType === 'fulltime' && !job.title.toLowerCase().includes('intern'));
        
        let matchSalary = true;
        if (minSalary || maxSalary) {
            const salaryMatch = job.salary.match(/(\d+)k/gi);
            if (salaryMatch) {
                const jobMin = parseInt(salaryMatch[0]);
                const jobMax = salaryMatch[1] ? parseInt(salaryMatch[1]) : jobMin;
                if (minSalary) matchSalary = matchSalary && jobMax >= minSalary;
                if (maxSalary) matchSalary = matchSalary && jobMin <= maxSalary;
            }
        }
        
        return matchKeyword && matchLocation && matchType && matchSalary;
    });
}

// Job Recommendations
function getRecommendedJobs(userSkills = [], limit = 5) {
    if (!userSkills.length) return jobs.slice(0, limit);
    
    const scored = jobs.map(job => {
        let score = 0;
        const jobText = (job.title + ' ' + job.description).toLowerCase();
        userSkills.forEach(skill => {
            if (jobText.includes(skill.toLowerCase())) score++;
        });
        return { job, score };
    });
    
    return scored
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.job);
}

// Application Statistics
function getApplicationStats() {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuth) return null;
    
    const saved = getSavedJobs();
    return {
        saved: saved.length,
        applied: 0 // Will be fetched from backend
    };
}

// Toggle save job function
function toggleSaveJob(jobId) {
    if (isJobSaved(jobId)) {
        unsaveJob(jobId);
    } else {
        saveJob(jobId);
    }
    
    // Update button text if on page
    const saveBtn = document.querySelector(`[onclick="toggleSaveJob(${jobId})"]`);
    if (saveBtn) {
        saveBtn.textContent = isJobSaved(jobId) ? '❤️ Saved' : '🤍 Save';
    }
    
    // Refresh dashboard if open
    const dashboard = document.getElementById('dashboard-section');
    if (dashboard && !dashboard.classList.contains('section-hidden')) {
        const dashboardContent = document.getElementById('dashboard-content');
        if (dashboardContent && dashboardContent.innerHTML.includes('Saved Jobs')) {
            showSavedJobs();
        }
    }
}

// Export for global access
window.jobFeatures = {
    saveJob,
    unsaveJob,
    isJobSaved,
    getSavedJobs,
    advancedSearch,
    getRecommendedJobs,
    getApplicationStats,
    toggleSaveJob
};

// Make toggleSaveJob globally accessible
window.toggleSaveJob = toggleSaveJob;
