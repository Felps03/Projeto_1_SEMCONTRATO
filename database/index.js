const mongoose = require('mongoose');

const MONGO_DEV = 'mongodb+srv://deploy:semcontrato@cluster0-xmagn.mongodb.net/test?retryWrites=true&w=majority';
const MONGO_LOCAL = 'mongodb://localhost/noderest';

mongoose.connect(MONGO_DEV, {
    useNewUrlParser: true
})
    .then(() => console.log('mongoose ok...'))
    .catch(err => console.log(err));

mongoose.Promise = global.Promise;

// mongoose.set('useFindAndModify', false);

module.exports = mongoose;