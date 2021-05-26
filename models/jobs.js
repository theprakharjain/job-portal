const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    jobRole: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    selected: {
        type: Boolean,
        default: false
    },
    applied: {
        type: Boolean,
        default: false
    },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true})


module.exports = mongoose.model('Jobs', jobSchema)