const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: function() {
            return !this.socialProvider; // Password not required for social login
        },
        minlength: 6,
        select: false
    },
    socialProvider: {
        type: String,
        enum: ['google', 'facebook', 'github', null],
        default: null
    },
    socialId: {
        type: String
    },
    profilePhoto: {
        type: String
    },
    role: {
        type: String,
        enum: ['jobseeker', 'employer', 'admin', 'student'],
        default: 'student'
    },
    contact: {
        type: String
    },
    skills: [{
        type: String
    }],
    resume: {
        filename: String,
        path: String,
        uploadedAt: Date
    },
    companyName: {
        type: String
    },
    companyInfo: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving (only if password exists)
userSchema.pre('save', async function(next) {
    if (!this.isModified('password') || !this.password) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
