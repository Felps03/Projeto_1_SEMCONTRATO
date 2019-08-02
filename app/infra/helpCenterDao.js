const HelpCenterSchema = require('../models/helpCenter');
const PAGELIMIT = 10;
const LASTLIMIT = 3;

class HelpCenterDao {

    constructor() {
        this.aggregrate = HelpCenterSchema.aggregate();
        this.aggregrate.lookup({
            from: "users",
            localField: "id_user",
            foreignField: "_id",
            as: "owner"
        });
    }

    add(helpCenter, callback) {
        const { id_user, title, desc } = helpCenter;
        const date = new Date().toLocaleDateString('pt-BR').slice(0, 10); // DateFormat "yyyy-mm-dd"
        HelpCenterSchema.create({ id_user, title, desc, date }, (err, docs) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, docs);
        });
    }

    update(helpCenter, id, callback) {
        const { id_user, title, desc } = helpCenter;
        HelpCenterSchema.findByIdAndUpdate(id, { id_user, title, desc }, {
            new: true
        }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    list(page, callback) {
        HelpCenterSchema.aggregatePaginate(
            this.aggregrate.sort({ date: -1 }), {
                page: page,
                limit: PAGELIMIT
            },
            (err, docs) => {
                if (err) return callback(err, null)
                callback(null, docs);
            }
        )
    }

    listLastHelp(callback) {
        HelpCenterSchema.aggregatePaginate(
            this.aggregrate.sort({ date: -1 }), {
            },
            (err, docs) => {
                if (err) return callback(err, null)
                callback(null, docs);
            }
        )
    }

    remove(id, callback) {
        HelpCenterSchema.findByIdAndRemove(id, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    findById(_id, callback) {
        HelpCenterSchema.findOne({ _id }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    findByJoker(helpCenter, page, callback) {
        const { joker } = helpCenter;
        this.aggregrate.match({
            $or: [{ title: new RegExp(joker, 'i') }, { desc: new RegExp(joker, 'i') }]
        });
        this.aggregrate.sort({
            title: -1,
            desc: 1
        })
        HelpCenterSchema.aggregatePaginate(
            this.aggregrate, {
                page: page,
                limit: PAGELIMIT
            },
            (err, docs) => {
                if (err) return callback(err, null)
                callback(null, docs);
            }
        )
    }


}

module.exports = HelpCenterDao;