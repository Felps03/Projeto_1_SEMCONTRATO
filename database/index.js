const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://deploy:semcontrato@cluster0-xmagn.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true
})
.then(() => console.log('mongoose ok...'))
.catch(err =>console.log(err));



mongoose.Promise = global.Promise;

module.exports = mongoose;