// UI Helper Functions for Advanced Features

function showAdvancedMenu() {
    const container = document.getElementById('dashboard-content');
    container.innerHTML = `
        <h3>⚙️ Advanced Features</h3>
        <div class="dashboard-section">
            <button class="btn-primary full-width" onclick="showJobAlerts()">🔔 Job Alerts</button>
            <button class="btn-primary full-width" onclick="showAnalytics()">📊 Analytics</button>
            <button class="btn-primary full-width" onclick="showMessages()">💬 Messages</button>
            <button class="btn-primary full-width" onclick="showInterviews()">📅 Interviews</button>
            <button class="btn-primary full-width" onclick="showCategories()">📂 Browse by Category</button>
            <button class="btn-primary full-width" onclick="showSearchHistory()">🕐 Search History</button>
            <button class="btn-primary full-width" onclick="showSalaryCalc()">💰 Salary Calculator</button>
            <button class="btn-secondary full-width" onclick="loadDashboard()">← Back</button>
        </div>
    `;
}

function uploadResume() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
        if (window.advancedFeatures && e.target.files[0]) {
            window.advancedFeatures.resumeManager.upload(e.target.files[0]);
            setTimeout(() => loadDashboard(), 1000);
        }
    };
    input.click();
}

function deleteResume() {
    if (confirm('Delete resume?') && window.advancedFeatures) {
        window.advancedFeatures.resumeManager.delete();
        loadDashboard();
    }
}

function showJobAlerts() {
    const container = document.getElementById('dashboard-content');
    const alerts = window.advancedFeatures ? JSON.parse(localStorage.getItem('jobAlerts') || '[]') : [];
    
    container.innerHTML = `
        <h3>🔔 Job Alerts</h3>
        <div class="dashboard-section">
            <h5>Create New Alert</h5>
            <input type="text" id="alert-keyword" placeholder="Keywords" style="width:100%;margin-bottom:10px;padding:10px;border-radius:8px;border:1px solid #e6edf0">
            <input type="text" id="alert-location" placeholder="Location" style="width:100%;margin-bottom:10px;padding:10px;border-radius:8px;border:1px solid #e6edf0">
            <button class="btn-primary" onclick="createAlert()">Create Alert</button>
        </div>
        <div class="dashboard-section">
            <h5>Your Alerts (${alerts.length})</h5>
            ${alerts.map((a, i) => `<p>🔔 ${a.keyword} ${a.location ? 'in ' + a.location : ''} <button class="btn-secondary" onclick="deleteAlert(${i})">Delete</button></p>`).join('') || '<p>No alerts yet</p>'}
        </div>
        <button class="btn-secondary" onclick="showAdvancedMenu()">← Back</button>
    `;
}

function createAlert() {
    const keyword = document.getElementById('alert-keyword').value;
    const location = document.getElementById('alert-location').value;
    if (keyword && window.advancedFeatures) {
        window.advancedFeatures.jobAlerts.saveAlert(keyword, location);
        showJobAlerts();
    }
}

function deleteAlert(index) {
    const alerts = JSON.parse(localStorage.getItem('jobAlerts') || '[]');
    alerts.splice(index, 1);
    localStorage.setItem('jobAlerts', JSON.stringify(alerts));
    showJobAlerts();
}

function showAnalytics() {
    const container = document.getElementById('dashboard-content');
    const stats = window.advancedFeatures ? window.advancedFeatures.analytics.getStats() : {};
    const chartData = window.advancedFeatures ? window.advancedFeatures.analytics.getChartData() : {};
    
    container.innerHTML = `
        <h3>📊 Your Analytics</h3>
        <div class="dashboard-section">
            <h5>Activity Summary</h5>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
                <div style="padding:15px;background:#e0f2f1;border-radius:8px;text-align:center">
                    <h2 style="margin:0">${stats.applications || 0}</h2>
                    <p style="margin:5px 0 0">Applications</p>
                </div>
                <div style="padding:15px;background:#fff3e0;border-radius:8px;text-align:center">
                    <h2 style="margin:0">${stats.searches || 0}</h2>
                    <p style="margin:5px 0 0">Searches</p>
                </div>
                <div style="padding:15px;background:#f3e5f5;border-radius:8px;text-align:center">
                    <h2 style="margin:0">${stats.views || 0}</h2>
                    <p style="margin:5px 0 0">Views</p>
                </div>
                <div style="padding:15px;background:#e8f5e9;border-radius:8px;text-align:center">
                    <h2 style="margin:0">${stats.total || 0}</h2>
                    <p style="margin:5px 0 0">Total Events</p>
                </div>
            </div>
        </div>
        <div class="dashboard-section">
            <h5>Last 7 Days Activity</h5>
            ${Object.entries(chartData).map(([date, count]) => `
                <div style="margin-bottom:8px">
                    <span style="display:inline-block;width:100px">${date}</span>
                    <div style="display:inline-block;width:${count * 20}px;height:20px;background:var(--accent);border-radius:4px"></div>
                    <span style="margin-left:8px">${count}</span>
                </div>
            `).join('')}
        </div>
        <button class="btn-secondary" onclick="showAdvancedMenu()">← Back</button>
    `;
}

function showMessages() {
    const container = document.getElementById('dashboard-content');
    const messages = window.advancedFeatures ? window.advancedFeatures.messaging.getInbox() : [];
    
    container.innerHTML = `
        <h3>💬 Messages (${messages.length})</h3>
        <div class="dashboard-section">
            ${messages.map(m => `
                <div class="job-card" style="${m.read ? '' : 'border-left:4px solid var(--accent)'}">
                    <p><strong>From:</strong> ${m.from}</p>
                    <p>${m.message}</p>
                    <p style="font-size:12px;color:var(--muted)">${new Date(m.timestamp).toLocaleString()}</p>
                    ${!m.read ? `<button class="btn-secondary" onclick="markMessageRead(${m.id})">Mark Read</button>` : ''}
                </div>
            `).join('') || '<p>No messages</p>'}
        </div>
        <button class="btn-secondary" onclick="showAdvancedMenu()">← Back</button>
    `;
}

function markMessageRead(id) {
    if (window.advancedFeatures) {
        window.advancedFeatures.messaging.markRead(id);
        showMessages();
    }
}

function showInterviews() {
    const container = document.getElementById('dashboard-content');
    const interviews = window.advancedFeatures ? window.advancedFeatures.scheduler.getUpcoming() : [];
    
    container.innerHTML = `
        <h3>📅 Upcoming Interviews</h3>
        <div class="dashboard-section">
            <button class="btn-primary" onclick="scheduleInterview()">+ Schedule Interview</button>
        </div>
        <div class="dashboard-section">
            ${interviews.map(i => {
                const job = jobs.find(j => j.id === i.jobId);
                return `
                    <div class="job-card">
                        <h4>${job ? job.title : 'Job #' + i.jobId}</h4>
                        <p>📅 ${i.date} at ${i.time}</p>
                        <p>${i.notes}</p>
                        <button class="btn-secondary" onclick="updateInterviewStatus(${i.id}, 'completed')">Mark Complete</button>
                        <button class="btn-secondary" onclick="updateInterviewStatus(${i.id}, 'cancelled')">Cancel</button>
                    </div>
                `;
            }).join('') || '<p>No upcoming interviews</p>'}
        </div>
        <button class="btn-secondary" onclick="showAdvancedMenu()">← Back</button>
    `;
}

function scheduleInterview() {
    const container = document.getElementById('dashboard-content');
    container.innerHTML = `
        <h3>Schedule Interview</h3>
        <div class="dashboard-section">
            <input type="number" id="int-jobid" placeholder="Job ID" style="width:100%;margin-bottom:10px;padding:10px;border-radius:8px;border:1px solid #e6edf0">
            <input type="date" id="int-date" style="width:100%;margin-bottom:10px;padding:10px;border-radius:8px;border:1px solid #e6edf0">
            <input type="time" id="int-time" style="width:100%;margin-bottom:10px;padding:10px;border-radius:8px;border:1px solid #e6edf0">
            <textarea id="int-notes" placeholder="Notes" style="width:100%;margin-bottom:10px;padding:10px;border-radius:8px;border:1px solid #e6edf0"></textarea>
            <button class="btn-primary" onclick="saveInterview()">Schedule</button>
            <button class="btn-secondary" onclick="showInterviews()">Cancel</button>
        </div>
    `;
}

function saveInterview() {
    const jobId = parseInt(document.getElementById('int-jobid').value);
    const date = document.getElementById('int-date').value;
    const time = document.getElementById('int-time').value;
    const notes = document.getElementById('int-notes').value;
    
    if (jobId && date && time && window.advancedFeatures) {
        window.advancedFeatures.scheduler.schedule(jobId, date, time, notes);
        showInterviews();
    }
}

function updateInterviewStatus(id, status) {
    if (window.advancedFeatures) {
        window.advancedFeatures.scheduler.updateStatus(id, status);
        showInterviews();
    }
}

function showCategories() {
    const container = document.getElementById('dashboard-content');
    const counts = window.advancedFeatures ? window.advancedFeatures.categories.getCounts() : {};
    
    container.innerHTML = `
        <h3>📂 Browse by Category</h3>
        <div class="dashboard-section">
            ${Object.entries(counts).map(([cat, count]) => `
                <button class="btn-primary full-width" onclick="browseCategory('${cat}')" style="margin-bottom:8px">
                    ${cat} (${count} jobs)
                </button>
            `).join('')}
        </div>
        <button class="btn-secondary" onclick="showAdvancedMenu()">← Back</button>
    `;
}

function browseCategory(category) {
    const container = document.getElementById('dashboard-content');
    const categoryJobs = window.advancedFeatures ? window.advancedFeatures.categories.getByCategory(category) : [];
    
    container.innerHTML = `
        <h3>📂 ${category} Jobs</h3>
        <div class="dashboard-section">
            ${categoryJobs.map(job => `
                <div class="job-card">
                    <h3>${job.title}</h3>
                    <p><strong>${job.company}</strong> • ${job.location} • ${job.salary}</p>
                    <p>${job.description.substring(0, 100)}...</p>
                    <button class="apply-btn" onclick="applyForJob(${job.id})">🚀 Apply Now</button>
                </div>
            `).join('') || '<p>No jobs in this category</p>'}
        </div>
        <button class="btn-secondary" onclick="showCategories()">← Back</button>
    `;
}

function showSearchHistory() {
    const container = document.getElementById('dashboard-content');
    const history = window.advancedFeatures ? window.advancedFeatures.searchHistory.get() : [];
    const popular = window.advancedFeatures ? window.advancedFeatures.searchHistory.getPopular() : [];
    
    container.innerHTML = `
        <h3>🕐 Search History</h3>
        <div class="dashboard-section">
            <h5>Popular Searches</h5>
            ${popular.map(([keyword, count]) => `
                <button class="btn-secondary" onclick="repeatSearch('${keyword}')" style="margin:4px">${keyword} (${count})</button>
            `).join('') || '<p>No searches yet</p>'}
        </div>
        <div class="dashboard-section">
            <h5>Recent Searches</h5>
            ${history.slice(0, 10).map(h => `
                <p>🔍 ${h.keyword} ${h.location ? 'in ' + h.location : ''} <span style="font-size:12px;color:var(--muted)">${new Date(h.timestamp).toLocaleString()}</span></p>
            `).join('') || '<p>No history</p>'}
            ${history.length > 0 ? '<button class="btn-secondary" onclick="clearSearchHistory()">Clear History</button>' : ''}
        </div>
        <button class="btn-secondary" onclick="showAdvancedMenu()">← Back</button>
    `;
}

function repeatSearch(keyword) {
    document.getElementById('dashboard-close').click();
    document.getElementById('keyword-search').value = keyword;
    searchJobs();
}

function clearSearchHistory() {
    if (confirm('Clear all search history?') && window.advancedFeatures) {
        window.advancedFeatures.searchHistory.clear();
        showSearchHistory();
    }
}

function showSalaryCalc() {
    const container = document.getElementById('dashboard-content');
    container.innerHTML = `
        <h3>💰 Salary Calculator</h3>
        <div class="dashboard-section">
            <h5>Compare Salaries</h5>
            <input type="text" id="sal1" placeholder="Salary 1 (e.g., 50k-70k)" style="width:100%;margin-bottom:10px;padding:10px;border-radius:8px;border:1px solid #e6edf0">
            <input type="text" id="sal2" placeholder="Salary 2 (e.g., 60k-80k)" style="width:100%;margin-bottom:10px;padding:10px;border-radius:8px;border:1px solid #e6edf0">
            <button class="btn-primary" onclick="compareSalaries()">Compare</button>
            <div id="sal-result" style="margin-top:15px"></div>
        </div>
        <div class="dashboard-section">
            <h5>Take-Home Calculator</h5>
            <input type="text" id="sal-calc" placeholder="Annual Salary (e.g., 60k)" style="width:100%;margin-bottom:10px;padding:10px;border-radius:8px;border:1px solid #e6edf0">
            <input type="number" id="tax-rate" placeholder="Tax Rate %" value="20" style="width:100%;margin-bottom:10px;padding:10px;border-radius:8px;border:1px solid #e6edf0">
            <button class="btn-primary" onclick="calculateTakeHome()">Calculate</button>
            <div id="takehome-result" style="margin-top:15px"></div>
        </div>
        <button class="btn-secondary" onclick="showAdvancedMenu()">← Back</button>
    `;
}

function compareSalaries() {
    const sal1 = document.getElementById('sal1').value;
    const sal2 = document.getElementById('sal2').value;
    
    if (sal1 && sal2 && window.advancedFeatures) {
        const result = window.advancedFeatures.salaryCalc.compare(sal1, sal2);
        document.getElementById('sal-result').innerHTML = `
            <div style="padding:15px;background:#e8f5e9;border-radius:8px">
                <p><strong>Difference:</strong> $${Math.abs(result.diff).toLocaleString()}</p>
                <p><strong>Percentage:</strong> ${Math.abs(result.percent)}%</p>
                <p><strong>Higher:</strong> ${result.higher === 'first' ? 'Salary 1' : 'Salary 2'}</p>
            </div>
        `;
    }
}

function calculateTakeHome() {
    const salary = document.getElementById('sal-calc').value;
    const taxRate = parseFloat(document.getElementById('tax-rate').value) / 100;
    
    if (salary && window.advancedFeatures) {
        const result = window.advancedFeatures.salaryCalc.calculateTakeHome(salary, taxRate);
        document.getElementById('takehome-result').innerHTML = `
            <div style="padding:15px;background:#e3f2fd;border-radius:8px">
                <p><strong>Annual Take-Home:</strong> $${result.annual.toLocaleString()}</p>
                <p><strong>Monthly Take-Home:</strong> $${result.monthly.toLocaleString()}</p>
            </div>
        `;
    }
}
