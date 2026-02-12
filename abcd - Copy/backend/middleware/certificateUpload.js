const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDirs = ['uploads/certificates', 'uploads/images', 'uploads/documents'];
uploadDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Configure storage for certificates
const certificateStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        
        // Route to appropriate folder based on file type
        if (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'].includes(ext)) {
            cb(null, 'uploads/images/');
        } else if (['.pdf'].includes(ext)) {
            cb(null, 'uploads/certificates/');
        } else {
            cb(null, 'uploads/documents/');
        }
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'cert-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Accept all file types for certificates
const certificateUpload = multer({
    storage: certificateStorage,
    limits: { 
        fileSize: 10 * 1024 * 1024, // 10MB
        files: 10 // Max 10 files at once
    }
});

module.exports = {
    certificateUpload
};
