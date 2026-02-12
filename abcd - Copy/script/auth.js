// Authentication utility for persistent login
class AuthManager {
    constructor() {
        this.SESSION_KEY = 'userSession';
        this.EXPIRY_HOURS = 24; // 24 hours session
    }

    // Set user session (works for both job portal and certificates)
    setSession(userType, userData) {
        const session = {
            userType: userType, // 'student' or 'admin'
            userData: userData,
            loginTime: new Date().toISOString(),
            expiryTime: new Date(Date.now() + (this.EXPIRY_HOURS * 60 * 60 * 1000)).toISOString(),
            // Unified access - same login for all portals
            accessPortals: ['jobPortal', 'certificates', 'dashboard']
        };
        
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
        
        // Sync across tabs/windows
        window.dispatchEvent(new Event('storage'));
        
        return session;
    }

    // Get current session
    getSession() {
        try {
            const sessionData = localStorage.getItem(this.SESSION_KEY);
            if (!sessionData) return null;

            const session = JSON.parse(sessionData);
            
            // Check if session expired
            if (new Date() > new Date(session.expiryTime)) {
                this.clearSession();
                return null;
            }

            return session;
        } catch (error) {
            this.clearSession();
            return null;
        }
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.getSession() !== null;
    }

    // Get user type
    getUserType() {
        const session = this.getSession();
        return session ? session.userType : null;
    }

    // Get user data
    getUserData() {
        const session = this.getSession();
        return session ? session.userData : null;
    }

    // Clear session (logout)
    clearSession() {
        localStorage.removeItem(this.SESSION_KEY);
    }

    // Extend session
    extendSession() {
        const session = this.getSession();
        if (session) {
            session.expiryTime = new Date(Date.now() + (this.EXPIRY_HOURS * 60 * 60 * 1000)).toISOString();
            localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
        }
    }

    // Redirect based on user type
    redirectToDashboard() {
        const userType = this.getUserType();
        if (userType === 'student') {
            window.location.href = 'student-portal.html';
        } else if (userType === 'admin') {
            window.location.href = 'admin-dashboard.html';
        }
    }

    // Check if user has access to specific portal
    hasPortalAccess(portalName) {
        const session = this.getSession();
        if (!session) return false;
        return session.accessPortals && session.accessPortals.includes(portalName);
    }

    // Get unified user info (works across all portals)
    getUnifiedUserInfo() {
        const session = this.getSession();
        if (!session) return null;
        
        return {
            ...session.userData,
            userType: session.userType,
            isLoggedIn: true,
            accessPortals: session.accessPortals
        };
    }

    // Check authentication and redirect if needed
    requireAuth(requiredType = null) {
        if (!this.isLoggedIn()) {
            if (requiredType === 'admin') {
                window.location.href = 'admin-login.html';
            } else {
                window.location.href = 'student-login.html';
            }
            return false;
        }

        if (requiredType && this.getUserType() !== requiredType) {
            alert('Access denied. Insufficient permissions.');
            this.redirectToDashboard();
            return false;
        }

        // Extend session on activity
        this.extendSession();
        return true;
    }
}

// Global auth manager instance
const auth = new AuthManager();