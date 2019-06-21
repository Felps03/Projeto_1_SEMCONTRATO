const RecoverDataSchema = require('../models/recoverData');

class RecoverDataDao {

    add(email, randomString, expires, callback) {

        RecoverDataSchema.create({ email, randomString, expires },
            (err) => {
                callback(err)
            }
        )
    }

    findExpires(randomString, email, callback) {

        RecoverDataSchema.findOne({
            randomString,
            email
        }, { _id: 0, expires: 1 }, (err, docs) => {
            callback(err, docs);
        });
    }
}
module.exports = RecoverDataDao;