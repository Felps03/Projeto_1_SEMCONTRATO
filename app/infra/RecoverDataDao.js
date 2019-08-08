const RecoverDataSchema = require('../models/recoverData');

class RecoverDataDao {
    add(email, randomString, expires, callback) {
        RecoverDataSchema.create({ email, randomString, expires },
            (err) => {
                callback(err)
            })
    }

    findExpires(randomString, email, callback) {
        // console.log(randomString);
        // console.log(email);
        RecoverDataSchema.findOne({
            randomString,
            email
        }, { _id: 0, expires: 1 }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }
}

module.exports = RecoverDataDao;