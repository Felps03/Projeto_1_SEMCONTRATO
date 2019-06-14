const UserSchema = require('../models/user');
class UserDao {

    list(callback) {
        UserSchema.find({}).exec((err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    add(user, callback) {
        const { name, lastName, email, password, dateOfBirth } = user;

        UserSchema.create({ name, lastName, email, password, dateOfBirth }, (err, docs) => {
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

    remove(id, callback) {
        UserSchema.findByIdAndRemove(id, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

}

module.exports = UserDao;
