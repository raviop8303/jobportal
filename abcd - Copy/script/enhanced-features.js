// Enhanced Features JavaScript

// Advanced Filters Toggle
function toggleAdvancedFilters() {
    const panel = document.getElementById('advanced-filters');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

// Live Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// Animate Metrics on Scroll
function animateMetrics() {
    const metrics = document.querySelectorAll('.metric-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateMetricNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    metrics.forEach(metric => observer.observe(metric));
}

function animateMetricNumber(element, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 25);
}

// Initialize Counters on Page Load
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const jobsCounter = document.getElementById('jobs-counter');
        const companiesCounter = document.getElementById('companies-counter');
        const remoteCounter = document.getElementById('remote-counter');
        const internshipsCounter = document.getElementById('internships-counter');
        
        if (jobsCounter) animateCounter(jobsCounter, 130);
        if (companiesCounter) animateCounter(companiesCounter, 30);
        if (remoteCounter) animateCounter(remoteCounter, 40);
        if (internshipsCounter) animateCounter(internshipsCounter, 45);
        
        // Animate metrics on scroll
        animateMetrics();
    }, 500);
});

// Resume Builder Functions
function showResumeBuilder() {
    document.getElementById('resume-builder-modal').style.display = 'flex';
}

function closeResumeBuilder() {
    document.getElementById('resume-builder-modal').style.display = 'none';
}

function generateResume() {
    const name = document.getElementById('resume-name').value;
    const email = document.getElementById('resume-email').value;
    const phone = document.getElementById('resume-phone').value;
    const skills = document.getElementById('resume-skills').value;
    const exp = document.getElementById('resume-exp').value;
    const education = document.getElementById('resume-education').value;
    
    if (!name || !email || !phone) {
        alert('⚠️ Please fill all required fields!');
        return;
    }
    
    // Create resume content
    const resumeContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Segoe UI', Arial; padding: 40px; max-width: 800px; margin: 0 auto; background: #f9fafb; }
                .resume { background: white; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                h1 { color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px; margin-bottom: 20px; }
                h2 { color: #2563eb; margin-top: 25px; border-left: 4px solid #2563eb; padding-left: 10px; }
                .contact { display: flex; gap: 20px; margin-bottom: 20px; color: #6b7280; }
                .section { margin-bottom: 20px; }
                .skills { display: flex; flex-wrap: wrap; gap: 10px; }
                .skill-tag { background: #dbeafe; color: #1e40af; padding: 5px 15px; border-radius: 20px; font-size: 14px; }
            </style>
        </head>
        <body>
            <div class="resume">
                <h1>${name}</h1>
                <div class="contact">
                    <span>📧 ${email}</span>
                    <span>📞 ${phone}</span>
                    <span>💼 ${exp} years experience</span>
                </div>
                
                <div class="section">
                    <h2>Professional Skills</h2>
                    <div class="skills">
                        ${skills.split(',').map(s => `<span class="skill-tag">${s.trim()}</span>`).join('')}
                    </div>
                </div>
                
                <div class="section">
                    <h2>Education</h2>
                    <p>${education || 'Not specified'}</p>
                </div>
                
                <div class="section">
                    <h2>Experience</h2>
                    <p>${exp} years of professional experience in the industry</p>
                </div>
            </div>
        </body>
        </html>
    `;
    
    // Open in new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(resumeContent);
    printWindow.document.close();
    
    alert('✅ Resume generated successfully! You can now print or save it.');
    closeResumeBuilder();
}

// Salary Calculator Functions
function showSalaryCalculator() {
    document.getElementById('salary-calculator-modal').style.display = 'flex';
}

function closeSalaryCalculator() {
    document.getElementById('salary-calculator-modal').style.display = 'none';
}

function calculateSalary() {
    const role = document.getElementById('salary-role').value;
    const exp = parseInt(document.getElementById('salary-exp').value) || 0;
    const location = document.getElementById('salary-location').value;
    
    // Salary calculation logic (base + experience multiplier + location factor)
    const baseSalaries = {
        frontend: 4,
        backend: 5,
        fullstack: 6,
        data: 7,
        devops: 6
    };
    
    const locationMultiplier = {
        bangalore: 1.2,
        mumbai: 1.15,
        pune: 1.0,
        hyderabad: 1.05,
        delhi: 1.1
    };
    
    const base = baseSalaries[role] || 5;
    const locMult = locationMultiplier[location] || 1;
    
    const minSalary = Math.round((base + exp * 1.5) * locMult);
    const maxSalary = Math.round((base + exp * 2) * locMult);
    const monthlySalary = Math.round((minSalary + maxSalary) / 2 * 100000 / 12);
    
    const trend = exp < 2 ? '📈 High Demand' : exp < 5 ? '🔥 Very High Demand' : '⭐ Expert Level';
    
    document.getElementById('salary-min').textContent = minSalary;
    document.getElementById('salary-max').textContent = maxSalary;
    document.getElementById('monthly-salary').textContent = monthlySalary.toLocaleString();
    document.getElementById('market-trend').textContent = trend;
    document.getElementById('salary-result').style.display = 'block';
}

// Skill Assessment Functions
function showSkillAssessment() {
    document.getElementById('skill-assessment-modal').style.display = 'flex';
}

function closeSkillAssessment() {
    document.getElementById('skill-assessment-modal').style.display = 'none';
}

function startAssessment() {
    const domain = document.getElementById('skill-domain').value;
    const level = document.getElementById('skill-level').value;
    
    // Simulate assessment
    const scores = {
        beginner: Math.floor(Math.random() * 20) + 40,
        intermediate: Math.floor(Math.random() * 20) + 60,
        advanced: Math.floor(Math.random() * 15) + 75,
        expert: Math.floor(Math.random() * 10) + 85
    };
    
    const score = scores[level];
    const feedback = score >= 80 ? '🎉 Excellent! You\'re ready for senior roles.' :
                     score >= 60 ? '👍 Good! Keep learning to advance.' :
                     '💪 Keep practicing! You\'re on the right track.';
    
    document.getElementById('skill-score').textContent = score;
    document.getElementById('skill-feedback').textContent = feedback;
    document.getElementById('assessment-result').style.display = 'block';
}

// Job Match Score Functions
function showJobMatchScore() {
    document.getElementById('job-match-modal').style.display = 'flex';
}

function closeJobMatch() {
    document.getElementById('job-match-modal').style.display = 'none';
}

function calculateJobMatch() {
    const skills = document.getElementById('match-skills').value;
    const location = document.getElementById('match-location').value;
    const salary = document.getElementById('match-salary').value;
    
    if (!skills) {
        alert('⚠️ Please enter your skills!');
        return;
    }
    
    // Sample matching jobs
    const matches = [
        { title: 'Senior Frontend Developer', company: 'Google', match: 95, salary: '15-20 LPA' },
        { title: 'Full Stack Engineer', company: 'Microsoft', match: 88, salary: '12-18 LPA' },
        { title: 'React Developer', company: 'Amazon', match: 82, salary: '10-15 LPA' },
        { title: 'Software Engineer', company: 'Meta', match: 78, salary: '12-16 LPA' }
    ];
    
    const matchList = document.getElementById('match-list');
    matchList.innerHTML = matches.map(job => `
        <div class="match-item">
            <div class="match-header">
                <h4>${job.title}</h4>
                <span class="match-score">${job.match}% Match</span>
            </div>
            <p><strong>${job.company}</strong> | ${job.salary}</p>
        </div>
    `).join('');
    
    document.getElementById('match-results').style.display = 'block';
}

// Interview Tips Function
function showInterviewTips() {
    const tips = `
        <div class="tips-container">
            <h2>🎯 Interview Preparation Guide</h2>
            <div class="tip-card">
                <h3>1. Research the Company</h3>
                <p>Learn about company culture, products, recent news, and competitors. Check their LinkedIn, website, and recent press releases.</p>
            </div>
            <div class="tip-card">
                <h3>2. Practice Common Questions</h3>
                <p>Prepare STAR method answers for behavioral questions. Practice technical questions on platforms like LeetCode.</p>
            </div>
            <div class="tip-card">
                <h3>3. Prepare Your Questions</h3>
                <p>Ask about team structure, growth opportunities, tech stack, and company vision. Shows genuine interest.</p>
            </div>
            <div class="tip-card">
                <h3>4. Dress Professionally</h3>
                <p>First impressions matter. Dress one level above the company dress code. Be well-groomed.</p>
            </div>
            <div class="tip-card">
                <h3>5. Body Language Matters</h3>
                <p>Maintain eye contact, sit upright, smile naturally, and show enthusiasm through your gestures.</p>
            </div>
            <div class="tip-card">
                <h3>6. Follow Up</h3>
                <p>Send a thank you email within 24 hours. Mention specific discussion points from the interview.</p>
            </div>
        </div>
    `;
    
    document.getElementById('dedicated-page-content').innerHTML = tips;
    document.getElementById('dedicated-page').classList.remove('section-hidden');
    document.getElementById('job-search-section').style.display = 'none';
}

// Enhanced Newsletter Subscription
const originalSubscribe = window.subscribeNewsletter;
window.subscribeNewsletter = function() {
    const email = document.getElementById('newsletter-email').value;
    const prefTech = document.getElementById('pref-tech')?.checked;
    const prefRemote = document.getElementById('pref-remote')?.checked;
    const prefIntern = document.getElementById('pref-intern')?.checked;
    
    if (!email) {
        alert('⚠️ Please enter your email!');
        return;
    }
    
    const preferences = [];
    if (prefTech) preferences.push('Technology');
    if (prefRemote) preferences.push('Remote Jobs');
    if (prefIntern) preferences.push('Internships');
    
    console.log('Subscribed with preferences:', preferences);
    
    if (typeof originalSubscribe === 'function') {
        originalSubscribe();
    } else {
        alert(`✅ Subscribed successfully!\nPreferences: ${preferences.join(', ')}`);
        document.getElementById('newsletter-email').value = '';
    }
};

// Close modals on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.style.display = 'none';
    }
});

// Application Tracker Functions
let applications = JSON.parse(localStorage.getItem('jobApplications')) || [];

function showApplicationTracker() {
    document.getElementById('application-tracker-modal').style.display = 'flex';
    updateTrackerStats();
    displayApplications();
}

function closeApplicationTracker() {
    document.getElementById('application-tracker-modal').style.display = 'none';
}

function addApplication() {
    const company = document.getElementById('app-company').value;
    const position = document.getElementById('app-position').value;
    const status = document.getElementById('app-status').value;
    
    if (!company || !position) {
        alert('⚠️ Please fill all fields!');
        return;
    }
    
    const application = {
        id: Date.now(),
        company,
        position,
        status,
        date: new Date().toLocaleDateString()
    };
    
    applications.push(application);
    localStorage.setItem('jobApplications', JSON.stringify(applications));
    
    document.getElementById('app-company').value = '';
    document.getElementById('app-position').value = '';
    
    updateTrackerStats();
    displayApplications();
}

function updateTrackerStats() {
    const total = applications.length;
    const pending = applications.filter(app => app.status === 'applied' || app.status === 'screening').length;
    const interviews = applications.filter(app => app.status === 'interview').length;
    const offers = applications.filter(app => app.status === 'offer').length;
    
    document.getElementById('total-apps').textContent = total;
    document.getElementById('pending-apps').textContent = pending;
    document.getElementById('interview-apps').textContent = interviews;
    document.getElementById('offer-apps').textContent = offers;
}

function displayApplications() {
    const list = document.getElementById('applications-list');
    if (applications.length === 0) {
        list.innerHTML = '<p style="text-align:center;color:#6b7280;padding:20px;">No applications yet. Add your first application!</p>';
        return;
    }
    
    list.innerHTML = applications.map(app => `
        <div class="application-item">
            <div class="app-header">
                <div>
                    <h4>${app.position}</h4>
                    <p>${app.company}</p>
                </div>
                <span class="status-badge status-${app.status}">${app.status}</span>
            </div>
            <div class="app-footer">
                <span>📅 ${app.date}</span>
                <button onclick="deleteApplication(${app.id})" class="delete-btn">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
}

function deleteApplication(id) {
    applications = applications.filter(app => app.id !== id);
    localStorage.setItem('jobApplications', JSON.stringify(applications));
    updateTrackerStats();
    displayApplications();
}

// Job Comparison Functions
function showJobComparison() {
    document.getElementById('job-comparison-modal').style.display = 'flex';
}

function closeJobComparison() {
    document.getElementById('job-comparison-modal').style.display = 'none';
}

function compareJobs() {
    const job1 = {
        company: document.getElementById('job1-company').value,
        position: document.getElementById('job1-position').value,
        salary: parseFloat(document.getElementById('job1-salary').value) || 0,
        location: document.getElementById('job1-location').value,
        culture: parseInt(document.getElementById('job1-culture').value) || 3
    };
    
    const job2 = {
        company: document.getElementById('job2-company').value,
        position: document.getElementById('job2-position').value,
        salary: parseFloat(document.getElementById('job2-salary').value) || 0,
        location: document.getElementById('job2-location').value,
        culture: parseInt(document.getElementById('job2-culture').value) || 3
    };
    
    if (!job1.company || !job2.company) {
        alert('⚠️ Please fill both job details!');
        return;
    }
    
    // Calculate scores
    const job1Score = (job1.salary * 0.4) + (job1.culture * 4);
    const job2Score = (job2.salary * 0.4) + (job2.culture * 4);
    
    const winner = job1Score > job2Score ? job1 : job2;
    const difference = Math.abs(job1Score - job2Score).toFixed(1);
    
    const resultHTML = `
        <div class="comparison-result-card">
            <h3>🏆 Comparison Results</h3>
            <div class="comparison-table">
                <div class="comparison-row">
                    <div class="comparison-cell"><strong>Company</strong></div>
                    <div class="comparison-cell">${job1.company}</div>
                    <div class="comparison-cell">${job2.company}</div>
                </div>
                <div class="comparison-row">
                    <div class="comparison-cell"><strong>Position</strong></div>
                    <div class="comparison-cell">${job1.position}</div>
                    <div class="comparison-cell">${job2.position}</div>
                </div>
                <div class="comparison-row">
                    <div class="comparison-cell"><strong>Salary</strong></div>
                    <div class="comparison-cell">${job1.salary} LPA</div>
                    <div class="comparison-cell">${job2.salary} LPA</div>
                </div>
                <div class="comparison-row">
                    <div class="comparison-cell"><strong>Location</strong></div>
                    <div class="comparison-cell">${job1.location}</div>
                    <div class="comparison-cell">${job2.location}</div>
                </div>
                <div class="comparison-row">
                    <div class="comparison-cell"><strong>Overall Score</strong></div>
                    <div class="comparison-cell ${job1Score > job2Score ? 'winner' : ''}">${job1Score.toFixed(1)}</div>
                    <div class="comparison-cell ${job2Score > job1Score ? 'winner' : ''}">${job2Score.toFixed(1)}</div>
                </div>
            </div>
            <div class="recommendation">
                <p><strong>🎯 Recommendation:</strong> ${winner.company} appears to be the better choice based on salary and work culture, with a score difference of ${difference} points.</p>
            </div>
        </div>
    `;
    
    document.getElementById('comparison-result').innerHTML = resultHTML;
    document.getElementById('comparison-result').style.display = 'block';
}

// FAQ Toggle Function
function toggleFAQ(element) {
    const answer = element.querySelector('.faq-answer');
    const icon = element.querySelector('.faq-icon');
    const isOpen = answer.style.display === 'block';
    
    // Close all FAQs
    document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');
    document.querySelectorAll('.faq-icon').forEach(ic => ic.style.transform = 'rotate(0deg)');
    
    // Open clicked FAQ if it was closed
    if (!isOpen) {
        answer.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
    }
}

// Quick Actions FAB Toggle
function toggleQuickActions() {
    const menu = document.getElementById('fab-menu');
    const isVisible = menu.style.display === 'flex';
    menu.style.display = isVisible ? 'none' : 'flex';
}
