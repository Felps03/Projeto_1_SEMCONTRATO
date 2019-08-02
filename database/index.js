const mongoose = require('mongoose');

const MONGO_DEV = 'mongodb+srv://deploy:semcontrato@cluster0-xmagn.mongodb.net/test?retryWrites=true&w=majority';
const MONGO_LOCAL = 'mongodb://localhost/noderest';
//const MONGO_LOCAL = 'mongodb://localhost/teste';


<<<<<<< HEAD
// mongoose.connect(MONGO_DEV, {
mongoose.connect(MONGO_LOCAL, {
=======
mongoose.connect(MONGO_DEV, {
//mongoose.connect(MONGO_LOCAL, {
>>>>>>> 920a148a96cbbe09288f2a3d86db223a8b1e65fe
    useNewUrlParser: true
})
    // .then(() => console.log('mongoose ok...'))
    .catch(err => console.log(err));

mongoose.Promise = global.Promise;

// mongoose.set('useFindAndModify', false);

module.exports = mongoose;