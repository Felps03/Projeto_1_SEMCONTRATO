const UserSchema = require('../models/user');
const crypto = require("crypto");
let fs = require('fs');

class UserDao {

    list(callback) {
        UserSchema.find({}).exec((err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    // add(user, image, callback) {

    //     console.log(image);

    //     const { filename: file_photo } = image;
    //     //file_photo = `${hash.toString("hex")}-${file_photo}`

    //     const { name, lastName, userName, email, password, dateOfBirth } = user;

    //     UserSchema.create({ name, lastName, userName, email, password, file_photo, dateOfBirth }, (err, docs) => {
    //         if (err) {
    //             fs.unlink(`./tmp/uploads/${file_photo}`);
    //             return callback(err, null);
    //         }
    //         callback(null, docs);
    //     });
    // }

    // taking off photo from users register
    add(user, callback) {

        const { name, lastName, userName, email, dateOfBirth, password } = user;

        UserSchema.create({ name, lastName, userName, email, dateOfBirth, password }, (err, docs) => {
            if (err) {
                //fs.unlinkSync(`./tmp/uploads/${file_photo}`);
                return callback(err, null);
            }
            callback(null, docs);
        });
    }

    // update(user, id, image, callback) {

    //     const { filename: file_photo } = image;

    //     this.findById(id, (error, result) => {
    //         if (error) {
    //             console.log(error);
    //             resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de encontrar o usuario favor olhar o log' }));
    //         }
    //         const { name, lastName, userName, email, password, dateOfBirth } = user;
    //         UserSchema.findByIdAndUpdate(id, { name, lastName, userName, email, password, file_photo, dateOfBirth }, { new: true }, (err, docs) => {
    //             if (err) {
    //                 fs.unlinkSync(`./tmp/uploads/${file_photo}`);
    //                 return callback(err, null)
    //             }
    //             fs.unlinkSync(`./tmp/uploads/${result.file_photo}`);
    //             callback(null, docs);
    //         });
    //     });
    // }

    // taking off photo
    update(user, hash, id, callback) {
        this.findById(id, (error, result) => {
            if (error) {
                console.log(error);
                resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de encontrar o usuario favor olhar o log' }));
            }
            const password = hash;
            const { name, lastName, userName, email, dateOfBirth } = user;
            UserSchema.findByIdAndUpdate(id, { name, lastName, userName, email, password, dateOfBirth }, { new: true }, (err, docs) => {
                if (err) {
                    // fs.unlinkSync(`./tmp/uploads/${file_photo}`);
                    return callback(err, null)
                }
                // fs.unlinkSync(`./tmp/uploads/${result.file_photo}`);
                callback(null, docs);
            });
        });
    }

    updateWithoutPassword(user, id, callback) {
        this.findById(id, (error, result) => {
            if (error) {
                console.log(error);
                resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de encontrar o usuario favor olhar o log' }));
            }
            const { name, lastName, userName, email, dateOfBirth } = user;
            UserSchema.findByIdAndUpdate(id, { name, lastName, userName, email, dateOfBirth }, { new: true }, (err, docs) => {
                if (err) {
                    // fs.unlinkSync(`./tmp/uploads/${file_photo}`);
                    return callback(err, null)
                }
                // fs.unlinkSync(`./tmp/uploads/${result.file_photo}`);
                callback(null, docs);
            });
        });
    }

    updatePassword(password, id, callback) {
        UserSchema.findByIdAndUpdate(id, { password }, { new: true }, (err, docs) => {
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

    validateEmailAvailable(email, callback) {
        UserSchema.findOne({ email }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    findById(_id, callback) {
        UserSchema.findOne({ _id }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    findOneJoker(email, joker, callback) {
        UserSchema.find({ email }).select(joker).exec((err, docs) => {
            if (err) return callback(err, null);
            callback(null, docs);
        });
    }

    authenticate(email, password, callback) {
        UserSchema.find({ email, password }).select('+password').exec((err, docs) => {
            if (err) return callback(err, null);
            callback(null, docs);
        });
    }

    checkAdmin(email, callback) {
        UserSchema.findOne({ email }, { _id: 0, isAdmin: 1 }, (err, docs) => {
            if (err) return callback(err, docs);
            return callback(null, docs);
        });
    }

}

module.exports = UserDao;