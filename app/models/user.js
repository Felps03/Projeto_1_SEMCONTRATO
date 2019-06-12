const mongoose = require('../../database');

const UserSchema = new mongoose.Schema({
    // schema
});

const User = mongoose.model('User', UserSchema);

module.exports = User;