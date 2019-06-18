const UserSchema = require('../models/user');

const fs = require('fs');
class UserDao {

    list(callback) {
        UserSchema.find({}).exec((err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    add(user, image, callback) {
        const { originalname: file_photo} = image; 

        const { name, lastName, userName, email, password, dateOfBirth } = user;

        UserSchema.create({ name, lastName, userName, email, password, file_photo, dateOfBirth }, (err, docs) => {
            if (err) {
                fs.unlink(`./tmp/uploads/${file_photo}`);
                return callback(err, null);
            }
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

    remove(id, callback) {
        UserSchema.findByIdAndRemove(id, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    findEmail(email, callback) {
        UserSchema.findOne({ email }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }


}

module.exports = UserDao;