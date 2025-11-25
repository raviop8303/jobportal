const express = require('express');
const router = express.Router();
const {
    getProfile,
    updateProfile,
    uploadResume,
    deleteResume
} = require('../controllers/profileController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);
router.post('/upload-resume', protect, authorize('jobseeker'), upload.single('resume'), uploadResume);
router.delete('/resume', protect, authorize('jobseeker'), deleteResume);

module.exports = router;
