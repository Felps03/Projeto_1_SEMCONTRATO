const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://semcontrato:C0nnect123@semcontrato-wslsh.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

mongoose.Promise = global.Promise;

module.exports = mongoose;