// ========================================
// PERSISTENT STORAGE SYSTEM
// Real User Experience with Data Persistence
// ========================================

// IndexedDB Database Name and Version
const DB_NAME = 'JobPortalDB';
const DB_VERSION = 1;
let db = null;

// Initialize IndexedDB
async function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        };
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            // User Profile Store
            if (!db.objectStoreNames.contains('userProfile')) {
                const userStore = db.createObjectStore('userProfile', { keyPath: 'id' });
                userStore.createIndex('email', 'email', { unique: true });
            }
            
            // User Photos Store
            if (!db.objectStoreNames.contains('userPhotos')) {
                db.createObjectStore('userPhotos', { keyPath: 'userId' });
            }
            
            // Applications Store
            if (!db.objectStoreNames.contains('applications')) {
                const appStore = db.createObjectStore('applications', { keyPath: 'id', autoIncrement: true });
                appStore.createIndex('userId', 'userId', { unique: false });
            }
            
            // Saved Jobs Store
            if (!db.objectStoreNames.contains('savedJobs')) {
                const savedStore = db.createObjectStore('savedJobs', { keyPath: 'id', autoIncrement: true });
                savedStore.createIndex('userId', 'userId', { unique: false });
            }
            
            // Resume Store
            if (!db.objectStoreNames.contains('resumes')) {
                db.createObjectStore('resumes', { keyPath: 'userId' });
            }
        };
    });
}

// ========================================
// USER PROFILE MANAGEMENT
// ========================================

async function saveUserProfile(userData) {
    if (!db) await initDB();
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['userProfile'], 'readwrite');
        const store = transaction.objectStore('userProfile');
        
        const userProfile = {
            id: userData.id || userData.email,
            name: userData.name,
            email: userData.email,
            role: userData.role || 'jobseeker',
            joinDate: userData.joinDate || new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            loginProvider: userData.loginProvider || 'email'
        };
        
        const request = store.put(userProfile);
        
        request.onsuccess = () => {
            // Also save to localStorage for quick access
            localStorage.setItem('userId', userProfile.id);
            localStorage.setItem('userName', userProfile.name);
            localStorage.setItem('userEmail', userProfile.email);
            localStorage.setItem('userRole', userProfile.role);
            localStorage.setItem('joinDate', userProfile.joinDate);
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('loginProvider', userProfile.loginProvider);
            
            resolve(userProfile);
        };
        
        request.onerror = () => reject(request.error);
    });
}

async function getUserProfile(userId) {
    if (!db) await initDB();
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['userProfile'], 'readonly');
        const store = transaction.objectStore('userProfile');
        const request = store.get(userId);
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// ========================================
// PROFILE PHOTO MANAGEMENT
// ========================================

async function saveProfilePhoto(userId, photoData) {
    if (!db) await initDB();
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['userPhotos'], 'readwrite');
        const store = transaction.objectStore('userPhotos');
        
        const photoRecord = {
            userId: userId,
            photoData: photoData.data,
            fileName: photoData.fileName,
            fileType: photoData.fileType,
            fileSize: photoData.fileSize,
            uploadDate: new Date().toISOString()
        };
        
        const request = store.put(photoRecord);
        
        request.onsuccess = () => {
            // Also save to localStorage for quick access
            localStorage.setItem('userPhoto', photoData.data);
            localStorage.setItem('userPhotoName', photoData.fileName);
            localStorage.setItem('userPhotoType', photoData.fileType);
            localStorage.setItem('userPhotoSize', photoData.fileSize);
            localStorage.setItem('userPhotoUploadDate', photoRecord.uploadDate);
            
            resolve(photoRecord);
        };
        
        request.onerror = () => reject(request.error);
    });
}

async function getProfilePhoto(userId) {
    if (!db) await initDB();
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['userPhotos'], 'readonly');
        const store = transaction.objectStore('userPhotos');
        const request = store.get(userId);
        
        request.onsuccess = () => {
            const photo = request.result;
            if (photo) {
                // Update localStorage
                localStorage.setItem('userPhoto', photo.photoData);
                localStorage.setItem('userPhotoName', photo.fileName);
            }
            resolve(photo);
        };
        
        request.onerror = () => reject(request.error);
    });
}

async function deleteProfilePhoto(userId) {
    if (!db) await initDB();
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['userPhotos'], 'readwrite');
        const store = transaction.objectStore('userPhotos');
        const request = store.delete(userId);
        
        request.onsuccess = () => {
            // Clear localStorage
            localStorage.removeItem('userPhoto');
            localStorage.removeItem('userPhotoName');
            localStorage.removeItem('userPhotoType');
            localStorage.removeItem('userPhotoSize');
            localStorage.removeItem('userPhotoUploadDate');
            
            resolve(true);
        };
        
        request.onerror = () => reject(request.error);
    });
}

// ========================================
// RESUME MANAGEMENT
// ========================================

async function saveResume(userId, resumeData) {
    if (!db) await initDB();
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['resumes'], 'readwrite');
        const store = transaction.objectStore('resumes');
        
        const resumeRecord = {
            userId: userId,
            resumeData: resumeData.data,
            fileName: resumeData.fileName,
            fileType: resumeData.fileType,
            fileSize: resumeData.fileSize,
            uploadDate: new Date().toISOString()
        };
        
        const request = store.put(resumeRecord);
        
        request.onsuccess = () => {
            // Also save to localStorage
            localStorage.setItem('userResume', resumeData.data);
            localStorage.setItem('userResumeName', resumeData.fileName);
            localStorage.setItem('userResumeType', resumeData.fileType);
            localStorage.setItem('userResumeSize', resumeData.fileSize);
            localStorage.setItem('userResumeUploadDate', resumeRecord.uploadDate);
            
            resolve(resumeRecord);
        };
        
        request.onerror = () => reject(request.error);
    });
}

async function getResume(userId) {
    if (!db) await initDB();
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['resumes'], 'readonly');
        const store = transaction.objectStore('resumes');
        const request = store.get(userId);
        
        request.onsuccess = () => {
            const resume = request.result;
            if (resume) {
                localStorage.setItem('userResume', resume.resumeData);
                localStorage.setItem('userResumeName', resume.fileName);
            }
            resolve(resume);
        };
        
        request.onerror = () => reject(request.error);
    });
}

// ========================================
// APPLICATIONS MANAGEMENT
// ========================================

async function saveApplication(userId, applicationData) {
    if (!db) await initDB();
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['applications'], 'readwrite');
        const store = transaction.objectStore('applications');
        
        const appRecord = {
            userId: userId,
            jobId: applicationData.jobId,
            jobTitle: applicationData.jobTitle,
            company: applicationData.company,
            appliedAt: new Date().toISOString(),
            status: 'pending',
            ...applicationData
        };
        
        const request = store.add(appRecord);
        
        request.onsuccess = () => {
            // Update localStorage
            const apps = JSON.parse(localStorage.getItem('userApplications') || '[]');
            apps.push(appRecord);
            localStorage.setItem('userApplications', JSON.stringify(apps));
            localStorage.setItem('applicationCount', apps.length.toString());
            
            resolve(appRecord);
        };
        
        request.onerror = () => reject(request.error);
    });
}

async function getUserApplications(userId) {
    if (!db) await initDB();
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['applications'], 'readonly');
        const store = transaction.objectStore('applications');
        const index = store.index('userId');
        const request = index.getAll(userId);
        
        request.onsuccess = () => {
            const apps = request.result;
            // Update localStorage
            localStorage.setItem('userApplications', JSON.stringify(apps));
            localStorage.setItem('applicationCount', apps.length.toString());
            resolve(apps);
        };
        
        request.onerror = () => reject(request.error);
    });
}

// ========================================
// SAVED JOBS MANAGEMENT
// ========================================

async function saveJob(userId, jobId) {
    if (!db) await initDB();
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['savedJobs'], 'readwrite');
        const store = transaction.objectStore('savedJobs');
        
        const savedRecord = {
            userId: userId,
            jobId: jobId,
            savedAt: new Date().toISOString()
        };
        
        const request = store.add(savedRecord);
        
        request.onsuccess = () => {
            // Update localStorage
            const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
            if (!saved.includes(jobId)) {
                saved.push(jobId);
                localStorage.setItem('savedJobs', JSON.stringify(saved));
            }
            resolve(savedRecord);
        };
        
        request.onerror = () => reject(request.error);
    });
}

async function getSavedJobs(userId) {
    if (!db) await initDB();
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['savedJobs'], 'readonly');
        const store = transaction.objectStore('savedJobs');
        const index = store.index('userId');
        const request = index.getAll(userId);
        
        request.onsuccess = () => {
            const saved = request.result.map(item => item.jobId);
            localStorage.setItem('savedJobs', JSON.stringify(saved));
            resolve(saved);
        };
        
        request.onerror = () => reject(request.error);
    });
}

// ========================================
// AUTO-LOAD USER DATA ON PAGE LOAD
// ========================================

async function loadUserDataOnStartup() {
    try {
        await initDB();
        
        const userId = localStorage.getItem('userId');
        if (!userId) return;
        
        // Load profile
        const profile = await getUserProfile(userId);
        if (profile) {
            localStorage.setItem('userName', profile.name);
            localStorage.setItem('userEmail', profile.email);
            localStorage.setItem('userRole', profile.role);
            localStorage.setItem('isAuthenticated', 'true');
        }
        
        // Load profile photo
        await getProfilePhoto(userId);
        
        // Load resume
        await getResume(userId);
        
        // Load applications
        await getUserApplications(userId);
        
        // Load saved jobs
        await getSavedJobs(userId);
        
        console.log('✅ User data loaded from IndexedDB');
        
        // Update header photo if exists
        if (typeof updateHeaderPhoto === 'function') {
            updateHeaderPhoto();
        }
        
    } catch (error) {
        console.log('Using localStorage fallback:', error);
    }
}

// ========================================
// ENHANCED LOGOUT - KEEPS DATA
// ========================================

function enhancedLogout() {
    // Only clear session data, keep user data in IndexedDB
    localStorage.setItem('isAuthenticated', 'false');
    
    // Don't delete these - they stay in IndexedDB:
    // - userPhoto
    // - userProfile
    // - applications
    // - savedJobs
    // - resume
    
    console.log('✅ Logged out - Data preserved in IndexedDB');
}

// ========================================
// CLEAR ALL DATA (For account deletion)
// ========================================

async function clearAllUserData(userId) {
    if (!db) await initDB();
    
    try {
        // Delete from IndexedDB
        const transaction = db.transaction(['userProfile', 'userPhotos', 'applications', 'savedJobs', 'resumes'], 'readwrite');
        
        transaction.objectStore('userProfile').delete(userId);
        transaction.objectStore('userPhotos').delete(userId);
        transaction.objectStore('resumes').delete(userId);
        
        // Delete all applications
        const appStore = transaction.objectStore('applications');
        const appIndex = appStore.index('userId');
        const appRequest = appIndex.openCursor(IDBKeyRange.only(userId));
        
        appRequest.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                cursor.delete();
                cursor.continue();
            }
        };
        
        // Delete all saved jobs
        const savedStore = transaction.objectStore('savedJobs');
        const savedIndex = savedStore.index('userId');
        const savedRequest = savedIndex.openCursor(IDBKeyRange.only(userId));
        
        savedRequest.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                cursor.delete();
                cursor.continue();
            }
        };
        
        // Clear localStorage
        localStorage.clear();
        
        console.log('✅ All user data cleared');
        return true;
        
    } catch (error) {
        console.error('Error clearing data:', error);
        return false;
    }
}

// ========================================
// INITIALIZE ON PAGE LOAD
// ========================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadUserDataOnStartup);
} else {
    loadUserDataOnStartup();
}

// Export functions for global use
window.persistentStorage = {
    initDB,
    saveUserProfile,
    getUserProfile,
    saveProfilePhoto,
    getProfilePhoto,
    deleteProfilePhoto,
    saveResume,
    getResume,
    saveApplication,
    getUserApplications,
    saveJob,
    getSavedJobs,
    loadUserDataOnStartup,
    enhancedLogout,
    clearAllUserData
};
