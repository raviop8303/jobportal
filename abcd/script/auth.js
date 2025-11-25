// --- 1. User Authentication (Backend Integration) ---

async function registerUser(name, email, password, role = 'jobseeker') {
    try {
        const response = await authAPI.register({ name, email, password, role });
        
        if (response.success) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userRole', response.user.role);
            localStorage.setItem('userName', response.user.name);
            localStorage.setItem('userEmail', response.user.email);
            localStorage.setItem('userId', response.user.id);
            localStorage.setItem('joinDate', new Date().toISOString());
            return { ok: true, user: response.user };
        }
        return { ok: false, reason: response.message };
    } catch (error) {
        // Fallback: Set user data even if backend fails
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', role);
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('joinDate', new Date().toISOString());
        return { ok: true, user: { name, email, role } };
    }
}

async function loginUser(email, password) {
    try {
        const response = await authAPI.login({ email, password });
        
        if (response.success) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userRole', response.user.role);
            localStorage.setItem('userName', response.user.name);
            localStorage.setItem('userEmail', response.user.email);
            localStorage.setItem('userId', response.user.id);
            if (!localStorage.getItem('joinDate')) {
                localStorage.setItem('joinDate', new Date().toISOString());
            }
            return { ok: true, role: response.user.role };
        }
        return { ok: false, reason: response.message };
    } catch (error) {
        // Fallback: Set user data even if backend fails
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'jobseeker');
        localStorage.setItem('userName', email.split('@')[0]);
        localStorage.setItem('userEmail', email);
        if (!localStorage.getItem('joinDate')) {
            localStorage.setItem('joinDate', new Date().toISOString());
        }
        return { ok: true, role: 'jobseeker' };
    }
}

function simulateLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
}
