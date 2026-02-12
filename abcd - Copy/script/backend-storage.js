// Backend-First Storage System
// All data goes to backend API first, then cached locally

const BACKEND_API = 'http://localhost:3001/api';

// Get auth token
const getAuthToken = () => localStorage.getItem('token');

// API call helper with auth
async function apiRequest(endpoint, options = {}) {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    try {
        const response = await fetch(`${BACKEND_API}${endpoint}`, {
            ...options,
            headers
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Backend API Error:', error);
        throw error;
    }
}

// User Profile - Backend First
async function saveUserProfileBackend(userData) {
    try {
        const response = await apiRequest('/profile', {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
        
        // Cache locally after successful backend save
        localStorage.setItem('userProfile', JSON.stringify(response.data));
        return response;
    } catch (error) {
        console.error('Failed to save profile to backend:', error);
        // Fallback to local storage
        localStorage.setItem('userProfile', JSON.stringify(userData));
        return { success: false, cached: true };
    }
}

async function getUserProfileBackend() {
    try {
        const response = await apiRequest('/profile');
        localStorage.setItem('userProfile', JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        // Return cached data
        const cached = localStorage.getItem('userProfile');
        return cached ? JSON.parse(cached) : null;
    }
}

// Applications - Backend First
async function saveApplicationBackend(jobId, applicationData) {
    try {
        const response = await apiRequest('/applications', {
            method: 'POST',
            body: JSON.stringify({ jobId, ...applicationData })
        });
        
        // Update local cache
        const apps = JSON.parse(localStorage.getItem('applications') || '[]');
        apps.push(response.data);
        localStorage.setItem('applications', JSON.stringify(apps));
        
        return response;
    } catch (error) {
        console.error('Failed to save application to backend:', error);
        return { success: false, error: error.message };
    }
}

async function getUserApplicationsBackend() {
    try {
        const response = await apiRequest('/applications/my-applications');
        localStorage.setItem('applications', JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        const cached = localStorage.getItem('applications');
        return cached ? JSON.parse(cached) : [];
    }
}

// Jobs - Backend First
async function getJobsBackend(filters = {}) {
    try {
        const query = new URLSearchParams(filters).toString();
        const response = await apiRequest(`/jobs?${query}`);
        localStorage.setItem('jobs', JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        const cached = localStorage.getItem('jobs');
        return cached ? JSON.parse(cached) : [];
    }
}

// Resume Upload - Backend First
async function uploadResumeBackend(file) {
    try {
        const formData = new FormData();
        formData.append('resume', file);
        
        const token = getAuthToken();
        const response = await fetch(`${BACKEND_API}/profile/upload-resume`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('resumeUrl', data.data.resumeUrl);
        }
        return data;
    } catch (error) {
        console.error('Resume upload failed:', error);
        return { success: false, error: error.message };
    }
}

// Export for global use
window.backendStorage = {
    saveUserProfile: saveUserProfileBackend,
    getUserProfile: getUserProfileBackend,
    saveApplication: saveApplicationBackend,
    getUserApplications: getUserApplicationsBackend,
    getJobs: getJobsBackend,
    uploadResume: uploadResumeBackend
};

console.log('✅ Backend-first storage system loaded');