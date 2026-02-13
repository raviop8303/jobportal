// API Configuration
const API_URL = 'http://localhost:3001/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// API Helper function
const apiCall = async (endpoint, options = {}) => {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Authentication APIs
const authAPI = {
    register: async (userData) => {
        return await apiCall('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },

    login: async (credentials) => {
        return await apiCall('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    },

    getMe: async () => {
        return await apiCall('/auth/me');
    }
};

// Job APIs
const jobAPI = {
    getAll: async (params = {}) => {
        const query = new URLSearchParams(params).toString();
        return await apiCall(`/jobs?${query}`);
    },

    getById: async (id) => {
        return await apiCall(`/jobs/${id}`);
    },

    create: async (jobData) => {
        return await apiCall('/jobs', {
            method: 'POST',
            body: JSON.stringify(jobData)
        });
    },

    update: async (id, jobData) => {
        return await apiCall(`/jobs/${id}`, {
            method: 'PUT',
            body: JSON.stringify(jobData)
        });
    },

    delete: async (id) => {
        return await apiCall(`/jobs/${id}`, {
            method: 'DELETE'
        });
    },

    getMyJobs: async () => {
        return await apiCall('/jobs/employer/my-jobs');
    }
};

// Application APIs
const applicationAPI = {
    apply: async (jobId) => {
        return await apiCall('/applications', {
            method: 'POST',
            body: JSON.stringify({ jobId })
        });
    },

    getMyApplications: async () => {
        return await apiCall('/applications/my-applications');
    },

    getJobApplications: async (jobId) => {
        return await apiCall(`/applications/job/${jobId}`);
    },

    updateStatus: async (id, status) => {
        return await apiCall(`/applications/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ status })
        });
    }
};

// Profile APIs
const profileAPI = {
    get: async () => {
        return await apiCall('/profile');
    },

    update: async (profileData) => {
        return await apiCall('/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData)
        });
    },

    uploadResume: async (file) => {
        const formData = new FormData();
        formData.append('resume', file);

        const token = getToken();
        const response = await fetch(`${API_URL}/profile/upload-resume`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Upload failed');
        }
        return data;
    },

    deleteResume: async () => {
        return await apiCall('/profile/resume', {
            method: 'DELETE'
        });
    }
};

// Toast notification helper
function showToast(message, options = {}) {
    const { type = 'info', duration = 2000 } = options;

    let toastsContainer = document.querySelector('.toasts');
    if (!toastsContainer) {
        toastsContainer = document.createElement('div');
        toastsContainer.classList.add('toasts');
        toastsContainer.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
        `;
        document.body.appendChild(toastsContainer);
    }

    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.textContent = message;
    toast.style.cssText = `
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideDown 0.3s ease;
        min-width: 250px;
        text-align: center;
    `;
    
    // Set colors based on type
    if (type === 'success') {
        toast.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        toast.style.color = 'white';
    } else if (type === 'error') {
        toast.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        toast.style.color = 'white';
    } else if (type === 'info') {
        toast.style.background = 'linear-gradient(135deg, #0ea5a4, #0b7b76)';
        toast.style.color = 'white';
    } else {
        toast.style.background = 'linear-gradient(135deg, #6b7280, #4b5563)';
        toast.style.color = 'white';
    }

    toastsContainer.appendChild(toast);

    // Auto-hide after duration
    setTimeout(() => {
        toast.style.transition = 'all 0.3s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            if (toast && toast.parentElement) {
                toast.remove();
            }
            // Remove container if empty
            if (toastsContainer && toastsContainer.children.length === 0) {
                toastsContainer.remove();
            }
        }, 300);
    }, duration);
}
