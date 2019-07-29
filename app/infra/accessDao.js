const AccessSchema = require('../models/access');

class AccessDao {

    listAll(callback) {
        AccessSchema.find({}, (err, result) => {
            if (err) return callback(err, null)
            callback(null, result);
        })
    }

    add(access, callback) {
        const { date } = access;
        AccessSchema.create({ date },
            (err, docs) => {
                if (err) return callback(err, null)
                callback(null, docs)
            });
    };

    update(access, id, callback) {
        const { date } = access
        AccessSchema.findByIdAndUpdate(
            id,
            { date },
            (err, docs) => {
                if (err) return callback(err, null)
                callback(null, docs)
            }
        )
    }

    remove(id, callback) {
        AccessSchema.findByIdAndRemove(id, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }
}

module.exports = AccessDao;