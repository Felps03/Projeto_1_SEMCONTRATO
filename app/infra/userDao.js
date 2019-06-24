<<<<<<< HEAD
const UserSchema = require('../models');
=======
const UserSchema = require('../models/user');
const crypto = require("crypto");

>>>>>>> test_dev
class UserDao {

    list(callback) {
        UserSchema.find({}).exec((err, docs) => {
<<<<<<< HEAD
            if(err) return callback(err, null)
=======
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    add(user, image, callback) {

        console.log(image);

        const { filename : file_photo } = image;

        //file_photo = `${hash.toString("hex")}-${file_photo}`

        const { name, lastName, userName, email, password, dateOfBirth } = user;

        UserSchema.create({ name, lastName, userName, email, password, file_photo, dateOfBirth }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    update(user, id, callback) {
        const { name, lastName, email, password, dateOfBirth } = user;
        UserSchema.findByIdAndUpdate(id, { name, lastName, email, password, dateOfBirth }, { new: true }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    updatePassword(password, id, callback) {
        UserSchema.findByIdAndUpdate(id,  {password} , { new: true }, (err, docs) => {
            if (err) return callback(err, null)
>>>>>>> test_dev
            callback(null, docs);
        });
    }

<<<<<<< HEAD
    add(user, callback) {
        const { name, lastName, email, password, dateOfBirth } = user;
     
        UserSchema.create({ name, lastName, email, password, dateOfBirth }, (err, docs) => {
            if(err) return callback(err, null)
=======
    remove(id, callback) {
        UserSchema.findByIdAndRemove(id, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    findEmail(email, callback) {
        UserSchema.findOne({ email }, (err, docs) => {
            if (err) return callback(err, null)
>>>>>>> test_dev
            callback(null, docs);
        });
    }

<<<<<<< HEAD
    update(user, id, callback) {
        const { name, lastName, email, password, dateOfBirth } = user;
        UserSchema.findByIdAndUpdate(id, { name, lastName, email, password, dateOfBirth }, { new: true }, (err, docs) => {
            if(err) return callback(err, null)
            callback(null, docs);
        });
    }

    remove(id, callback) {
        UserSchema.findByIdAndRemove(id, (err, docs) => {
            if(err) return callback(err, null)
            callback(null, docs);
        });
    }
    
} 
=======
    findOneJoker(email, joker, callback) {
        UserSchema.find({ email }).select(joker).exec((err, docs) => {
            if (err) return callback(err, null);
            callback(null, docs);
            console.log(docs);
        });
    }

    authenticate(email, password, callback) {
        UserSchema.find({ email, password }).select('+password').exec((err, docs) => {
            if (err) return callback(err, null);
            callback(null, docs);
        });
    }
}
>>>>>>> test_dev

module.exports = UserDao;