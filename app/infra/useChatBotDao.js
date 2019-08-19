const UseChatBotSchema = require('../models/useChatBot');

class UseChatBotDao {

    constructor() {
        this.aggregrate = UseChatBotSchema.aggregate();
        this.aggregrate.lookup({
            from: "accesses",
            localField: "id_access",
            foreignField: "_id",
            as: "access"
        })
    }

    listAll(callback) {
        UseChatBotSchema.find({}, (err, result) => {
            if (err) return callback(err, null)
            callback(null, result);
        })
    }

    listByAccess(id_access, callback) {
        UseChatBotSchema.find({ id_access }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    getLatestByIp(ip, callback) {
        UseChatBotSchema.find({ id_access: ip }).sort({ _id: -1 }).limit(1).exec(callback);
    }

    add(id_access, callback) {
        UseChatBotSchema.create({ id_access },
            (err, docs) => {
                if (err) return callback(err, null)
                callback(null, docs)
            });
    };

    update(useChatBot, id, callback) {
        const { id_access } = useChatBot;
        UseChatBotSchema.findByIdAndUpdate(
            id,
            { id_access },
            (err, docs) => {
                if (err) return callback(err, null)
                callback(null, docs)
            }
        )
    }

    remove(id, callback) {
        UseChatBotSchema.findByIdAndRemove(id, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }
}

module.exports = UseChatBotDao;