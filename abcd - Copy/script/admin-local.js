// Local Admin System (without backend)
const ADMIN_CREDENTIALS = {
    email: 'admin@certificate.com',
    password: 'admin123'
};

// Simple Excel parsing simulation
function parseExcelData(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                // Simulate Excel parsing - in real scenario, you'd use a library like SheetJS
                // For demo, we'll create sample data
                const sampleData = [
                    {
                        certificateId: 'CERT004',
                        studentName: 'Alice Brown',
                        internshipDomain: 'UI/UX Design',
                        startDate: '2024-03-01',
                        endDate: '2024-05-01',
                        issuedDate: new Date().toISOString().split('T')[0]
                    },
                    {
                        certificateId: 'CERT005',
                        studentName: 'Bob Wilson',
                        internshipDomain: 'Digital Marketing',
                        startDate: '2024-02-15',
                        endDate: '2024-04-15',
                        issuedDate: new Date().toISOString().split('T')[0]
                    }
                ];
                resolve(sampleData);
            } catch (error) {
                reject(error);
            }
        };
        reader.readAsArrayBuffer(file);
    });
}

// Admin login check
function checkAdminLogin(email, password) {
    return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
}

// Get admin token
function getAdminToken() {
    return localStorage.getItem('adminToken');
}

// Set admin token
function setAdminToken(token) {
    localStorage.setItem('adminToken', token);
}

// Remove admin token
function removeAdminToken() {
    localStorage.removeItem('adminToken');
}

// Generate simple token
function generateToken() {
    return 'admin_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}