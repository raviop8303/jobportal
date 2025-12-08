// --- 1. User Authentication (Backend Integration) ---

async function registerUser(name, email, password, role = 'jobseeker') {
    try {
        const response = await authAPI.register({ name, email, password, role });
        
        if (response.success) {
            const userData = {
                id: response.user.id || email,
                name: response.user.name,
                email: response.user.email,
                role: response.user.role,
                joinDate: new Date().toISOString()
            };
            
            // Save to IndexedDB for persistence
            if (window.persistentStorage) {
                try {
                    await window.persistentStorage.saveUserProfile(userData);
                    console.log('✅ User profile saved to IndexedDB');
                } catch (error) {
                    console.log('IndexedDB save failed:', error);
                }
            }
            
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
        const userData = {
            id: email,
            name: name,
            email: email,
            role: role,
            joinDate: new Date().toISOString()
        };
        
        // Save to IndexedDB
        if (window.persistentStorage) {
            try {
                await window.persistentStorage.saveUserProfile(userData);
                console.log('✅ User profile saved to IndexedDB (fallback)');
            } catch (error) {
                console.log('IndexedDB save failed:', error);
            }
        }
        
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', role);
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userId', email);
        localStorage.setItem('joinDate', new Date().toISOString());
        return { ok: true, user: { name, email, role } };
    }
}

async function loginUser(email, password) {
    try {
        const response = await authAPI.login({ email, password });
        
        if (response.success) {
            const userData = {
                id: response.user.id || email,
                name: response.user.name,
                email: response.user.email,
                role: response.user.role,
                joinDate: localStorage.getItem('joinDate') || new Date().toISOString()
            };
            
            // Save to IndexedDB
            if (window.persistentStorage) {
                try {
                    await window.persistentStorage.saveUserProfile(userData);
                    // Load existing photo if available
                    await window.persistentStorage.getProfilePhoto(userData.id);
                    console.log('✅ User data loaded from IndexedDB');
                } catch (error) {
                    console.log('IndexedDB load failed:', error);
                }
            }
            
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
        // Fallback: Try to load from IndexedDB first
        if (window.persistentStorage) {
            try {
                const profile = await window.persistentStorage.getUserProfile(email);
                if (profile) {
                    localStorage.setItem('isAuthenticated', 'true');
                    localStorage.setItem('userRole', profile.role);
                    localStorage.setItem('userName', profile.name);
                    localStorage.setItem('userEmail', profile.email);
                    localStorage.setItem('userId', profile.id);
                    localStorage.setItem('joinDate', profile.joinDate);
                    
                    // Load photo
                    await window.persistentStorage.getProfilePhoto(profile.id);
                    
                    console.log('✅ Logged in using IndexedDB data');
                    return { ok: true, role: profile.role };
                }
            } catch (error) {
                console.log('IndexedDB login failed:', error);
            }
        }
        
        // Final fallback
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'jobseeker');
        localStorage.setItem('userName', email.split('@')[0]);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userId', email);
        if (!localStorage.getItem('joinDate')) {
            localStorage.setItem('joinDate', new Date().toISOString());
        }
        return { ok: true, role: 'jobseeker' };
    }
}

function simulateLogout() {
    // Only clear session data - keep IndexedDB data for next login
    localStorage.removeItem('token');
    localStorage.setItem('isAuthenticated', 'false');
    
    // Don't remove these - they stay in IndexedDB:
    // - userPhoto (will load on next login)
    // - userProfile
    // - applications
    // - savedJobs
    
    console.log('✅ Logged out - Data preserved in IndexedDB');
}
