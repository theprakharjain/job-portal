const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    companyName: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true})



const User = mongoose.model('User', userSchema);

module.exports = User;