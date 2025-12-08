const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
exports.updateProfile = async (req, res) => {
    try {
        const fieldsToUpdate = {
            name: req.body.name,
            contact: req.body.contact
        };

        // Job seeker specific fields
        if (req.user.role === 'jobseeker') {
            fieldsToUpdate.skills = req.body.skills;
        }

        // Employer specific fields
        if (req.user.role === 'employer') {
            fieldsToUpdate.companyName = req.body.companyName;
            fieldsToUpdate.companyInfo = req.body.companyInfo;
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            fieldsToUpdate,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Upload resume
// @route   POST /api/profile/upload-resume
// @access  Private (Job Seeker only)
exports.uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a file'
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                resume: {
                    filename: req.file.filename,
                    path: req.file.path,
                    uploadedAt: Date.now()
                }
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Resume uploaded successfully',
            resume: user.resume
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete resume
// @route   DELETE /api/profile/resume
// @access  Private (Job Seeker only)
exports.deleteResume = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $unset: { resume: 1 } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Resume deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
