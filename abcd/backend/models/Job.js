const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide job title']
    },
    company: {
        type: String,
        required: [true, 'Please provide company name']
    },
    location: {
        type: String,
        required: [true, 'Please provide location']
    },
    salary: {
        type: String,
        required: [true, 'Please provide salary range']
    },
    description: {
        type: String,
        required: [true, 'Please provide job description']
    },
    qualifications: {
        type: String
    },
    responsibilities: {
        type: String
    },
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }],
    status: {
        type: String,
        enum: ['active', 'closed'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Job', jobSchema);
