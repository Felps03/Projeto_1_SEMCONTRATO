const sha256 = require('js-sha256').sha256;
const salt = require('../config/salt');

const mongoose = require('../../database/index');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: true
    },
    // file_photo: {
    //     type: String
    // },
    dateOfBirth: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false,
        select: true
    }
});

UserSchema.pre('save', function (next) {
    const hash = sha256(this.password + salt);
    this.password = hash;

    next();
});


const User = mongoose.model('User', UserSchema);

module.exports = User;