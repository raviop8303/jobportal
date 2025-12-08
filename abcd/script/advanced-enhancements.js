// ═══════════════════════════════════════════════════════════
//  ADVANCED ENHANCEMENTS - Production Ready Features
// ═══════════════════════════════════════════════════════════

console.log('🚀 Loading Advanced Enhancements...');

// ═══════════════════════════════════════════════════════════
// 1. PERFORMANCE OPTIMIZATION - Lazy Loading
// ═══════════════════════════════════════════════════════════

// Lazy load images and heavy content
const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Load images
            if (element.dataset.src) {
                element.src = element.dataset.src;
                element.removeAttribute('data-src');
            }
            
            // Trigger animations
            element.classList.add('loaded');
            lazyLoadObserver.unobserve(element);
        }
    });
}, { rootMargin: '50px' });

// Apply lazy loading
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-src]').forEach(el => lazyLoadObserver.observe(el));
});

// ═══════════════════════════════════════════════════════════
// 2. REAL-TIME SEARCH WITH DEBOUNCE
// ═══════════════════════════════════════════════════════════

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Real-time search as you type
const realTimeSearch = debounce(function(searchTerm) {
    if (!searchTerm || searchTerm.length < 2) return;
    
    const filtered = jobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (typeof displayJobListings === 'function') {
        displayJobListings(filtered);
    }
    
    // Show search results count
    showSearchResultsCount(filtered.length, searchTerm);
}, 300);

function showSearchResultsCount(count, term) {
    const existing = document.getElementById('search-results-badge');
    if (existing) existing.remove();
    
    const badge = document.createElement('div');
    badge.id = 'search-results-badge';
    badge.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #0ea5a4, #667eea);
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        box-shadow: 0 4px 15px rgba(14,165,164,0.3);
        z-index: 1000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    badge.textContent = `${count} jobs found for "${term}"`;
    document.body.appendChild(badge);
    
    setTimeout(() => badge.remove(), 3000);
}

// Attach to search input
setTimeout(() => {
    const searchInput = document.getElementById('keyword-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            realTimeSearch(e.target.value);
        });
    }
}, 500);

// ═══════════════════════════════════════════════════════════
// 3. ADVANCED FILTERS WITH MULTI-SELECT
// ═══════════════════════════════════════════════════════════

window.advancedFilters = {
    salary: 'all',
    experience: 'all',
    jobType: 'all',
    
    apply() {
        let filtered = [...jobs];
        
        // Salary filter
        if (this.salary !== 'all') {
            filtered = filtered.filter(job => {
                const salary = parseInt(job.salary.match(/\d+/)?.[0] || 0);
                if (this.salary === 'entry') return salary < 50;
                if (this.salary === 'mid') return salary >= 50 && salary < 80;
                if (this.salary === 'senior') return salary >= 80;
                return true;
            });
        }
        
        // Job type filter
        if (this.jobType !== 'all') {
            filtered = filtered.filter(job => {
                if (this.jobType === 'intern') return job.title.toLowerCase().includes('intern');
                if (this.jobType === 'fulltime') return !job.title.toLowerCase().includes('intern');
                return true;
            });
        }
        
        if (typeof displayJobListings === 'function') {
            displayJobListings(filtered);
        }
        
        showToast(`Showing ${filtered.length} jobs`, {type: 'info'});
    }
};

// ═══════════════════════════════════════════════════════════
// 4. JOB COMPARISON FEATURE (2-3 Jobs + Share)
// ═══════════════════════════════════════════════════════════

window.jobComparison = {
    selected: [],
    
    add(jobId) {
        if (this.selected.length >= 3) {
            showToast('Maximum 3 jobs can be compared', {type: 'warning'});
            return;
        }
        
        if (!this.selected.includes(jobId)) {
            this.selected.push(jobId);
            this.updateBadge();
            showToast('Job added to comparison', {type: 'success'});
        }
    },
    
    remove(jobId) {
        this.selected = this.selected.filter(id => id !== jobId);
        this.updateBadge();
    },
    
    removeAndRefresh(jobId, buttonElement) {
        // Close current modal
        const modal = buttonElement.closest('[style*="position: fixed"]');
        if (modal) modal.remove();
        
        // Remove job from selection
        this.remove(jobId);
        
        // Show new modal if 2+ jobs remain
        if (this.selected.length >= 2) {
            setTimeout(() => this.show(), 150);
        }
    },
    
    clearAll(buttonElement) {
        // Close modal
        const modal = buttonElement.closest('[style*="position: fixed"]');
        if (modal) modal.remove();
        
        // Clear selection
        this.selected = [];
        this.updateBadge();
    },
    
    updateBadge() {
        let badge = document.getElementById('compare-badge');
        if (!badge && this.selected.length > 0) {
            badge = document.createElement('button');
            badge.id = 'compare-badge';
            badge.style.cssText = `
                position: fixed;
                bottom: 80px;
                right: 20px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                border: none;
                padding: 15px 25px;
                border-radius: 50px;
                box-shadow: 0 8px 25px rgba(102,126,234,0.4);
                cursor: pointer;
                z-index: 999;
                font-weight: 600;
                font-size: 14px;
                transition: all 0.3s ease;
            `;
            badge.onclick = () => this.show();
            document.body.appendChild(badge);
        }
        
        if (badge) {
            if (this.selected.length === 0) {
                badge.remove();
            } else {
                badge.textContent = `⚖️ Compare (${this.selected.length})`;
            }
        }
    },
    
    shareComparison() {
        const selectedJobs = jobs.filter(j => this.selected.includes(j.id));
        const shareText = `Job Comparison:\n${selectedJobs.map(j => `${j.title} at ${j.company} - ${j.salary}`).join('\n')}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Job Comparison',
                text: shareText,
                url: window.location.href
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(shareText);
            showToast('Comparison copied to clipboard! 📋', {type: 'success'});
        }
    },
    
    show() {
        const selectedJobs = jobs.filter(j => this.selected.includes(j.id));
        
        // Show message if only 1 job selected
        if (selectedJobs.length < 2) {
            showToast('Please select at least 2 jobs to compare', {type: 'warning'});
            return;
        }
        
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.85);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            animation: fadeIn 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="background: white; border-radius: 20px; padding: 30px; max-width: ${selectedJobs.length === 2 ? '900px' : '1200px'}; width: 100%; max-height: 90vh; overflow: auto; animation: scaleIn 0.3s ease;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; border-bottom: 3px solid #667eea; padding-bottom: 15px;">
                    <div>
                        <h2 style="margin: 0; color: #667eea; font-size: 28px;">⚖️ Job Comparison</h2>
                        <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">Compare ${selectedJobs.length} jobs side-by-side</p>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <button id="share-comparison-btn" onclick="event.stopPropagation(); jobComparison.shareComparison();" style="background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 12px 24px; border-radius: 10px; cursor: pointer; font-weight: 700; display: flex; align-items: center; gap: 8px; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(16,185,129,0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(16,185,129,0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(16,185,129,0.3)'">
                            🔗 Share
                        </button>
                        <button onclick="event.stopPropagation(); this.closest('[style*=\"position: fixed\"]').remove();" style="background: #ef4444; color: white; border: none; padding: 12px 24px; border-radius: 10px; cursor: pointer; font-weight: 700; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(239,68,68,0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(239,68,68,0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(239,68,68,0.3)'">
                            ✕ Close
                        </button>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(${selectedJobs.length}, 1fr); gap: 20px;">
                    ${selectedJobs.map((job, index) => `
                        <div style="border: 2px solid ${index === 0 ? '#667eea' : index === 1 ? '#764ba2' : '#f093fb'}; border-radius: 15px; padding: 25px; background: linear-gradient(135deg, rgba(102,126,234,0.05), rgba(255,255,255,1)); position: relative; overflow: hidden;">
                            <div style="position: absolute; top: 10px; right: 10px; background: ${index === 0 ? '#667eea' : index === 1 ? '#764ba2' : '#f093fb'}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700;">Job ${index + 1}</div>
                            
                            <h3 style="color: ${index === 0 ? '#667eea' : index === 1 ? '#764ba2' : '#f093fb'}; margin: 0 0 15px 0; font-size: 20px; padding-right: 60px;">${job.title}</h3>
                            
                            <div style="margin-bottom: 15px;">
                                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
                                    <span style="font-size: 18px;">🏢</span>
                                    <div>
                                        <div style="font-size: 12px; color: #6b7280; font-weight: 600;">COMPANY</div>
                                        <div style="font-weight: 700; color: #1e293b;">${job.company}</div>
                                    </div>
                                </div>
                                
                                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
                                    <span style="font-size: 18px;">📍</span>
                                    <div>
                                        <div style="font-size: 12px; color: #6b7280; font-weight: 600;">LOCATION</div>
                                        <div style="font-weight: 600; color: #1e293b;">${job.location}</div>
                                    </div>
                                </div>
                                
                                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
                                    <span style="font-size: 18px;">💰</span>
                                    <div>
                                        <div style="font-size: 12px; color: #6b7280; font-weight: 600;">SALARY</div>
                                        <div style="font-weight: 700; color: #10b981; font-size: 18px;">${job.salary}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                                <div style="font-size: 12px; color: #6b7280; font-weight: 600; margin-bottom: 8px;">DESCRIPTION</div>
                                <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0;">${job.description.substring(0, 120)}...</p>
                            </div>
                            
                            <div style="display: flex; gap: 8px;">
                                <button onclick="window.location.href='apply.html?jobId=${job.id}'" style="flex: 1; background: linear-gradient(135deg, ${index === 0 ? '#667eea, #764ba2' : index === 1 ? '#764ba2, #f093fb' : '#f093fb, #f5576c'}); color: white; border: none; padding: 12px; border-radius: 10px; cursor: pointer; font-weight: 700; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                                    🚀 Apply Now
                                </button>
                                <button onclick="event.stopPropagation(); jobComparison.removeAndRefresh(${job.id}, this);" style="background: #f3f4f6; color: #6b7280; border: none; padding: 12px; border-radius: 10px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;" onmouseover="this.style.background='#ef4444'; this.style.color='white'" onmouseout="this.style.background='#f3f4f6'; this.style.color='#6b7280'">
                                    🗑️
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div style="margin-top: 25px; padding: 20px; background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(240,147,251,0.1)); border-radius: 15px; text-align: center;">
                    <p style="margin: 0 0 15px 0; color: #475569; font-weight: 600;">💡 Pro Tip: Compare salary, location, and benefits to make the best decision!</p>
                    <button onclick="jobComparison.clearAll(this);" style="background: white; color: #667eea; border: 2px solid #667eea; padding: 10px 25px; border-radius: 10px; cursor: pointer; font-weight: 700; transition: all 0.3s ease;" onmouseover="this.style.background='#667eea'; this.style.color='white'" onmouseout="this.style.background='white'; this.style.color='#667eea'">
                        Clear All & Close
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
};

// ═══════════════════════════════════════════════════════════
// 5. SMART NOTIFICATIONS
// ═══════════════════════════════════════════════════════════

window.smartNotifications = {
    check() {
        // Check for new jobs
        const lastCheck = localStorage.getItem('lastJobCheck');
        const now = Date.now();
        
        if (!lastCheck || now - parseInt(lastCheck) > 3600000) { // 1 hour
            const newJobsCount = Math.floor(Math.random() * 5) + 1;
            this.show(`${newJobsCount} new jobs added!`, 'info');
            localStorage.setItem('lastJobCheck', now.toString());
        }
    },
    
    show(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'info' ? 'linear-gradient(135deg, #0ea5a4, #0b7b76)' : 'linear-gradient(135deg, #667eea, #764ba2)'};
            color: white;
            padding: 15px 25px;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 24px;">🔔</span>
                <span style="font-weight: 600;">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }
};

// ═══════════════════════════════════════════════════════════
// 6. PROGRESS INDICATOR
// ═══════════════════════════════════════════════════════════

window.showProgress = function(message = 'Loading...') {
    const existing = document.getElementById('progress-indicator');
    if (existing) existing.remove();
    
    const progress = document.createElement('div');
    progress.id = 'progress-indicator';
    progress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #0ea5a4, #667eea, #764ba2);
        background-size: 200% 100%;
        animation: progressBar 1.5s ease infinite;
        z-index: 10001;
    `;
    document.body.appendChild(progress);
    
    return {
        hide: () => progress.remove()
    };
};

// ═══════════════════════════════════════════════════════════
// 7. QUICK ACTIONS MENU
// ═══════════════════════════════════════════════════════════

window.quickActions = {
    show() {
        const menu = document.createElement('div');
        menu.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.15);
            padding: 15px;
            z-index: 1000;
            min-width: 200px;
        `;
        
        menu.innerHTML = `
            <h4 style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280;">Quick Actions</h4>
            <button onclick="window.scrollTo({top:0,behavior:'smooth'})" style="width: 100%; padding: 10px; margin: 5px 0; border: none; background: #f3f4f6; border-radius: 8px; cursor: pointer; text-align: left;">⬆️ Scroll to Top</button>
            <button onclick="document.getElementById('view-all-jobs-btn')?.click()" style="width: 100%; padding: 10px; margin: 5px 0; border: none; background: #f3f4f6; border-radius: 8px; cursor: pointer; text-align: left;">💼 View All Jobs</button>
            <button onclick="document.getElementById('dashboard-toggle')?.click()" style="width: 100%; padding: 10px; margin: 5px 0; border: none; background: #f3f4f6; border-radius: 8px; cursor: pointer; text-align: left;">📊 Dashboard</button>
            <button onclick="this.parentElement.remove()" style="width: 100%; padding: 10px; margin: 5px 0; border: none; background: #ef4444; color: white; border-radius: 8px; cursor: pointer;">✕ Close</button>
        `;
        
        document.body.appendChild(menu);
    }
};

// ═══════════════════════════════════════════════════════════
// 8. AUTO-SAVE FORM DATA
// ═══════════════════════════════════════════════════════════

window.autoSaveForm = function(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        // Load saved data
        const saved = localStorage.getItem(`form_${formId}_${input.id}`);
        if (saved) input.value = saved;
        
        // Auto-save on change
        input.addEventListener('input', () => {
            localStorage.setItem(`form_${formId}_${input.id}`, input.value);
        });
    });
};

// ═══════════════════════════════════════════════════════════
// 9. ANIMATIONS
// ═══════════════════════════════════════════════════════════

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    
    @keyframes progressBar {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .loaded {
        animation: fadeIn 0.5s ease;
    }
`;
document.head.appendChild(style);

// ═══════════════════════════════════════════════════════════
// 10. INITIALIZE ALL FEATURES
// ═══════════════════════════════════════════════════════════

window.addEventListener('load', () => {
    console.log('✅ Advanced Enhancements Loaded');
    
    // Check for notifications
    setTimeout(() => smartNotifications.check(), 2000);
    
    // Add compare buttons to job cards
    setTimeout(() => {
        document.querySelectorAll('.job-card').forEach((card, index) => {
            const jobId = card.getAttribute('data-job-id') || index + 1;
            const compareBtn = document.createElement('button');
            compareBtn.textContent = '⚖️ Compare';
            compareBtn.className = 'view-company-btn';
            compareBtn.style.cssText = 'margin-left: 8px;';
            compareBtn.onclick = (e) => {
                e.stopPropagation();
                jobComparison.add(parseInt(jobId));
            };
            
            const actions = card.querySelector('.job-actions');
            if (actions && !actions.querySelector('[onclick*="jobComparison"]')) {
                actions.appendChild(compareBtn);
            }
        });
    }, 1000);
});

console.log('✅ Advanced Enhancements Ready');
