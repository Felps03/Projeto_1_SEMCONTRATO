const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/semcontrato', { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;