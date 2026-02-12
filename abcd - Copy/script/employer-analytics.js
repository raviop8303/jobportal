// Employer Analytics & Insights

function showJobAnalytics() {
    const container = document.getElementById('dashboard-content');
    const myJobs = getEmployerJobs();
    
    // Calculate analytics
    const totalJobs = myJobs.length;
    const totalApps = myJobs.reduce((sum, job) => sum + (job.applications?.length || 0), 0);
    const avgAppsPerJob = totalJobs > 0 ? (totalApps / totalJobs).toFixed(1) : 0;
    const jobsWithApps = myJobs.filter(j => j.applications?.length > 0).length;
    const responseRate = totalJobs > 0 ? ((jobsWithApps / totalJobs) * 100).toFixed(0) : 0;
    
    // Most popular job
    const mostPopular = myJobs.length > 0 ? myJobs.reduce((max, job) => 
        (job.applications?.length || 0) > (max.applications?.length || 0) ? job : max
    , myJobs[0]) : null;
    
    // Recent jobs (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentJobs = myJobs.filter(job => new Date(job.createdAt) > sevenDaysAgo).length;
    
    container.innerHTML = `
        <div class="dashboard-view">
            <h3>📊 Job Analytics & Insights</h3>
            <button class="btn-secondary" onclick="loadDashboard()" style="margin-bottom:20px">← Back to Dashboard</button>
            
            <!-- Overview Stats -->
            <div style="background:white;padding:20px;border-radius:12px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.1)">
                <h4 style="margin:0 0 15px 0">📈 Overview</h4>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:15px">
                    <div style="text-align:center;padding:15px;background:#f0f9ff;border-radius:8px">
                        <div style="font-size:32px;font-weight:700;color:#0ea5a4">${totalJobs}</div>
                        <div style="font-size:13px;color:#64748b;margin-top:4px">Total Jobs</div>
                    </div>
                    <div style="text-align:center;padding:15px;background:#f0f9ff;border-radius:8px">
                        <div style="font-size:32px;font-weight:700;color:#3b82f6">${totalApps}</div>
                        <div style="font-size:13px;color:#64748b;margin-top:4px">Total Applications</div>
                    </div>
                    <div style="text-align:center;padding:15px;background:#f0f9ff;border-radius:8px">
                        <div style="font-size:32px;font-weight:700;color:#8b5cf6">${avgAppsPerJob}</div>
                        <div style="font-size:13px;color:#64748b;margin-top:4px">Avg Apps/Job</div>
                    </div>
                    <div style="text-align:center;padding:15px;background:#f0f9ff;border-radius:8px">
                        <div style="font-size:32px;font-weight:700;color:#10b981">${responseRate}%</div>
                        <div style="font-size:13px;color:#64748b;margin-top:4px">Response Rate</div>
                    </div>
                </div>
            </div>
            
            <!-- Performance Insights -->
            <div style="background:white;padding:20px;border-radius:12px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.1)">
                <h4 style="margin:0 0 15px 0">💡 Insights</h4>
                <div style="display:flex;flex-direction:column;gap:12px">
                    ${mostPopular ? `
                        <div style="padding:12px;background:#ecfdf5;border-left:4px solid #10b981;border-radius:4px">
                            <strong style="color:#10b981">🏆 Most Popular Job</strong>
                            <p style="margin:4px 0 0 0;color:#64748b;font-size:14px">${mostPopular.title} - ${mostPopular.applications?.length || 0} applications</p>
                        </div>
                    ` : ''}
                    <div style="padding:12px;background:#fef3c7;border-left:4px solid #f59e0b;border-radius:4px">
                        <strong style="color:#f59e0b">📅 Recent Activity</strong>
                        <p style="margin:4px 0 0 0;color:#64748b;font-size:14px">${recentJobs} jobs posted in last 7 days</p>
                    </div>
                    ${totalJobs === 0 ? `
                        <div style="padding:12px;background:#fee2e2;border-left:4px solid #ef4444;border-radius:4px">
                            <strong style="color:#ef4444">⚠️ Action Needed</strong>
                            <p style="margin:4px 0 0 0;color:#64748b;font-size:14px">No jobs posted yet. <a href="#" onclick="showPostJobForm()" style="color:#ef4444;text-decoration:underline">Post your first job</a></p>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <!-- Job Performance Table -->
            ${myJobs.length > 0 ? `
                <div style="background:white;padding:20px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.1)">
                    <h4 style="margin:0 0 15px 0">📋 Job Performance</h4>
                    <div style="overflow-x:auto">
                        <table style="width:100%;border-collapse:collapse">
                            <thead>
                                <tr style="background:#f8fafc;border-bottom:2px solid #e2e8f0">
                                    <th style="padding:12px;text-align:left;font-size:13px;color:#64748b">Job Title</th>
                                    <th style="padding:12px;text-align:center;font-size:13px;color:#64748b">Applications</th>
                                    <th style="padding:12px;text-align:center;font-size:13px;color:#64748b">Posted</th>
                                    <th style="padding:12px;text-align:center;font-size:13px;color:#64748b">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${myJobs.map(job => `
                                    <tr style="border-bottom:1px solid #f1f5f9">
                                        <td style="padding:12px;font-size:14px">${job.title}</td>
                                        <td style="padding:12px;text-align:center;font-weight:600;color:#0ea5a4">${job.applications?.length || 0}</td>
                                        <td style="padding:12px;text-align:center;font-size:13px;color:#64748b">${formatDate(job.createdAt)}</td>
                                        <td style="padding:12px;text-align:center">
                                            <span style="padding:4px 12px;border-radius:12px;font-size:12px;font-weight:600;background:${(job.applications?.length || 0) > 0 ? '#dcfce7' : '#fef3c7'};color:${(job.applications?.length || 0) > 0 ? '#16a34a' : '#f59e0b'}">
                                                ${(job.applications?.length || 0) > 0 ? 'Active' : 'Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            ` : ''}
            
            <!-- Quick Actions -->
            <div style="margin-top:20px;display:flex;gap:10px;flex-wrap:wrap">
                <button class="btn-primary" onclick="showPostJobForm()">+ Post New Job</button>
                <button class="btn-secondary" onclick="showManageJobs()">📋 Manage Jobs</button>
                <button class="btn-secondary" onclick="showAllApplicants()">👥 View Applicants</button>
            </div>
        </div>
    `;
}
