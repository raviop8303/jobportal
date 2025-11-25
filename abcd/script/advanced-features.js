// --- Advanced Features Module ---

// 1. Job Alerts & Notifications
const jobAlerts = {
    requestPermission: async () => {
        if ('Notification' in window && Notification.permission === 'default') {
            await Notification.requestPermission();
        }
    },
    
    notify: (title, body) => {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, { body, icon: '/favicon.ico' });
        }
    },
    
    saveAlert: (keyword, location) => {
        const alerts = JSON.parse(localStorage.getItem('jobAlerts') || '[]');
        alerts.push({ keyword, location, created: Date.now() });
        localStorage.setItem('jobAlerts', JSON.stringify(alerts));
        showToast('Job alert created!', {type:'success'});
    },
    
    checkAlerts: () => {
        const alerts = JSON.parse(localStorage.getItem('jobAlerts') || '[]');
        alerts.forEach(alert => {
            const matches = jobs.filter(j => 
                j.title.toLowerCase().includes(alert.keyword.toLowerCase()) &&
                (!alert.location || j.location.toLowerCase().includes(alert.location.toLowerCase()))
            );
            if (matches.length > 0) {
                jobAlerts.notify('New Jobs Found!', `${matches.length} jobs match your alert`);
            }
        });
    }
};

// 2. Resume Upload
const resumeManager = {
    upload: (file) => {
        if (file.size > 5 * 1024 * 1024) {
            showToast('File too large (max 5MB)', {type:'error'});
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            localStorage.setItem('resume', JSON.stringify({
                name: file.name,
                data: e.target.result,
                uploaded: Date.now()
            }));
            showToast('Resume uploaded!', {type:'success'});
        };
        reader.readAsDataURL(file);
        return true;
    },
    
    get: () => JSON.parse(localStorage.getItem('resume') || 'null'),
    
    delete: () => {
        localStorage.removeItem('resume');
        showToast('Resume deleted', {type:'info'});
    }
};

// 3. Job Sharing
const jobShare = {
    share: (job) => {
        const url = `${window.location.origin}?job=${job.id}`;
        const text = `Check out this job: ${job.title} at ${job.company}`;
        
        if (navigator.share) {
            navigator.share({ title: job.title, text, url });
        } else {
            navigator.clipboard.writeText(url);
            showToast('Link copied to clipboard!', {type:'success'});
        }
    },
    
    shareToSocial: (job, platform) => {
        const url = encodeURIComponent(`${window.location.origin}?job=${job.id}`);
        const text = encodeURIComponent(`${job.title} at ${job.company}`);
        const links = {
            twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`
        };
        window.open(links[platform], '_blank', 'width=600,height=400');
    }
};

// 4. Analytics
const analytics = {
    track: (event, data) => {
        const events = JSON.parse(localStorage.getItem('analytics') || '[]');
        events.push({ event, data, timestamp: Date.now() });
        localStorage.setItem('analytics', JSON.stringify(events.slice(-100)));
    },
    
    getStats: () => {
        const events = JSON.parse(localStorage.getItem('analytics') || '[]');
        const applications = events.filter(e => e.event === 'apply').length;
        const searches = events.filter(e => e.event === 'search').length;
        const views = events.filter(e => e.event === 'view').length;
        return { applications, searches, views, total: events.length };
    },
    
    getChartData: () => {
        const events = JSON.parse(localStorage.getItem('analytics') || '[]');
        const last7Days = {};
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const key = date.toLocaleDateString();
            last7Days[key] = 0;
        }
        events.forEach(e => {
            const key = new Date(e.timestamp).toLocaleDateString();
            if (key in last7Days) last7Days[key]++;
        });
        return last7Days;
    }
};

// 5. Messaging System
const messaging = {
    send: (to, message) => {
        const messages = JSON.parse(localStorage.getItem('messages') || '[]');
        messages.push({
            id: Date.now(),
            from: localStorage.getItem('userName'),
            to,
            message,
            timestamp: Date.now(),
            read: false
        });
        localStorage.setItem('messages', JSON.stringify(messages));
        showToast('Message sent!', {type:'success'});
    },
    
    getInbox: () => {
        const messages = JSON.parse(localStorage.getItem('messages') || '[]');
        const user = localStorage.getItem('userName');
        return messages.filter(m => m.to === user).sort((a, b) => b.timestamp - a.timestamp);
    },
    
    markRead: (id) => {
        const messages = JSON.parse(localStorage.getItem('messages') || '[]');
        const msg = messages.find(m => m.id === id);
        if (msg) msg.read = true;
        localStorage.setItem('messages', JSON.stringify(messages));
    },
    
    getUnreadCount: () => {
        return messaging.getInbox().filter(m => !m.read).length;
    }
};

// 6. Job Expiry
const jobExpiry = {
    setExpiry: (jobId, days = 30) => {
        const expiry = Date.now() + (days * 24 * 60 * 60 * 1000);
        const expiryData = JSON.parse(localStorage.getItem('jobExpiry') || '{}');
        expiryData[jobId] = expiry;
        localStorage.setItem('jobExpiry', JSON.stringify(expiryData));
    },
    
    isExpired: (jobId) => {
        const expiryData = JSON.parse(localStorage.getItem('jobExpiry') || '{}');
        return expiryData[jobId] && Date.now() > expiryData[jobId];
    },
    
    getActiveJobs: (jobList) => {
        return jobList.filter(j => !jobExpiry.isExpired(j.id));
    }
};

// 7. Salary Calculator
const salaryCalc = {
    parse: (salaryStr) => {
        const match = salaryStr.match(/(\d+)k?-?(\d+)?k?/i);
        if (!match) return { min: 0, max: 0 };
        const min = parseInt(match[1]) * 1000;
        const max = match[2] ? parseInt(match[2]) * 1000 : min;
        return { min, max };
    },
    
    compare: (salary1, salary2) => {
        const s1 = salaryCalc.parse(salary1);
        const s2 = salaryCalc.parse(salary2);
        const avg1 = (s1.min + s1.max) / 2;
        const avg2 = (s2.min + s2.max) / 2;
        const diff = avg1 - avg2;
        const percent = ((diff / avg2) * 100).toFixed(1);
        return { diff, percent, higher: diff > 0 ? 'first' : 'second' };
    },
    
    calculateTakeHome: (salary, taxRate = 0.2) => {
        const s = salaryCalc.parse(salary);
        const avg = (s.min + s.max) / 2;
        const takeHome = avg * (1 - taxRate);
        const monthly = takeHome / 12;
        return { annual: takeHome, monthly: monthly.toFixed(0) };
    }
};

// 8. Interview Scheduler
const scheduler = {
    schedule: (jobId, date, time, notes) => {
        const interviews = JSON.parse(localStorage.getItem('interviews') || '[]');
        interviews.push({
            id: Date.now(),
            jobId,
            date,
            time,
            notes,
            status: 'scheduled',
            created: Date.now()
        });
        localStorage.setItem('interviews', JSON.stringify(interviews));
        showToast('Interview scheduled!', {type:'success'});
    },
    
    getUpcoming: () => {
        const interviews = JSON.parse(localStorage.getItem('interviews') || '[]');
        const now = Date.now();
        return interviews.filter(i => {
            const interviewDate = new Date(`${i.date} ${i.time}`).getTime();
            return interviewDate > now && i.status === 'scheduled';
        }).sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`));
    },
    
    updateStatus: (id, status) => {
        const interviews = JSON.parse(localStorage.getItem('interviews') || '[]');
        const interview = interviews.find(i => i.id === id);
        if (interview) interview.status = status;
        localStorage.setItem('interviews', JSON.stringify(interviews));
    }
};

// 9. Job Categories
const categories = {
    list: ['Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Sales', 'Design', 'Engineering', 'Other'],
    
    categorize: (job) => {
        const title = job.title.toLowerCase();
        if (title.includes('dev') || title.includes('engineer') || title.includes('programmer')) return 'Technology';
        if (title.includes('design') || title.includes('ui') || title.includes('ux')) return 'Design';
        if (title.includes('market')) return 'Marketing';
        if (title.includes('sales')) return 'Sales';
        if (title.includes('data') || title.includes('analyst')) return 'Technology';
        return 'Other';
    },
    
    getByCategory: (category) => {
        return jobs.filter(j => categories.categorize(j) === category);
    },
    
    getCounts: () => {
        const counts = {};
        categories.list.forEach(cat => {
            counts[cat] = categories.getByCategory(cat).length;
        });
        return counts;
    }
};

// 10. Search History
const searchHistory = {
    save: (keyword, location, filters) => {
        const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        history.unshift({ keyword, location, filters, timestamp: Date.now() });
        localStorage.setItem('searchHistory', JSON.stringify(history.slice(0, 20)));
    },
    
    get: () => JSON.parse(localStorage.getItem('searchHistory') || '[]'),
    
    clear: () => {
        localStorage.removeItem('searchHistory');
        showToast('Search history cleared', {type:'info'});
    },
    
    getPopular: () => {
        const history = searchHistory.get();
        const keywords = {};
        history.forEach(h => {
            if (h.keyword) keywords[h.keyword] = (keywords[h.keyword] || 0) + 1;
        });
        return Object.entries(keywords).sort((a, b) => b[1] - a[1]).slice(0, 5);
    }
};

// Export to global
window.advancedFeatures = {
    jobAlerts,
    resumeManager,
    jobShare,
    analytics,
    messaging,
    jobExpiry,
    salaryCalc,
    scheduler,
    categories,
    searchHistory
};

// Initialize
if (localStorage.getItem('isAuthenticated') === 'true') {
    jobAlerts.requestPermission();
}
