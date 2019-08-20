const RatingSchema = require('../models/rating');

class RatingDao {

    constructor() {
        this.aggregrate = RatingSchema.aggregate();
        this.aggregrate.lookup({
            from: "usechatbots",
            localField: "id_useChatBot",
            foreignField: "_id",
            as: "useChatBot"
        })
    }

    listAll(callback) {
        RatingSchema.find({}, (err, result) => {
            if (err) return callback(err, null)
            callback(null, result);
        })
    }

    listByUseChatBot(id_useChatBot, callback) {
        RatingSchema.find({ id_useChatBot }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    add(rating, callback) {
        const { id_useChatBot, evaluation, action } = rating;
        RatingSchema.create({ id_useChatBot, evaluation, action },
            (err, docs) => {
                if (err) return callback(err, null)
                callback(null, docs)
            });
    };

    update(rating, id, callback) {
        const { id_useChatBot, evaluation } = rating;
        RatingSchema.findByIdAndUpdate(
            id,
            { id_useChatBot, evaluation },
            (err, docs) => {
                if (err) return callback(err, null)
                callback(null, docs)
            }
        )
    }

    remove(id, callback) {
        RatingSchema.findByIdAndRemove(id, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }
}

module.exports = RatingDao;