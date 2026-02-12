const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    certificateId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    studentName: {
        type: String,
        required: true,
        trim: true
    },
    internshipDomain: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    issuedDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
    // Company/Organization Details
    companyName: {
        type: String,
        default: 'TechCorp Solutions'
    },
    companyAddress: {
        type: String,
        default: 'Lucknow, Uttar Pradesh, India'
    },
    founderName: {
        type: String,
        default: 'Mr. Amit Sharma'
    },
    authorizedSignatory: {
        type: String,
        default: 'Dr. Rajesh Kumar'
    },
    signatoryDesignation: {
        type: String,
        default: 'Director - Training & Development'
    },
    certificateType: {
        type: String,
        default: 'Internship Completion'
    },
    grade: {
        type: String,
        default: 'Excellent'
    },
    uploadedFile: {
        filename: String,
        path: String,
        uploadedAt: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Certificate', certificateSchema);