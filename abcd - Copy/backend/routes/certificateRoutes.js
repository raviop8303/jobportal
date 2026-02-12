const express = require('express');
const router = express.Router();
const multer = require('multer');
const certificateController = require('../controllers/certificateController');
const { protect } = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

router.post('/upload', protect, upload.single('excelFile'), certificateController.uploadCertificates);
router.post('/add', protect, certificateController.addCertificate);
router.post('/upload-files', protect, upload.array('files', 20), certificateController.uploadCertificateFiles);
router.get('/all', protect, certificateController.getAllCertificates);
router.get('/stats', protect, certificateController.getCertificateStats);
router.get('/search/:certificateId', certificateController.searchCertificate);
router.get('/student/:studentName', certificateController.searchByStudentName);
router.get('/download/:certificateId', certificateController.downloadCertificate);

module.exports = router;