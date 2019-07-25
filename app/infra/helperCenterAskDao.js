const HelpCenterAskSchema = require('../models/helpCenterAsk');
const PAGELIMIT = 10;
const LASTLIMIT = 3;

class HelpCenterAskDao {

    constructor() {
        this.aggregrate = HelpCenterAskSchema.aggregate();
        this.aggregrate.lookup({
            from: "users",
            localField: "id_user",
            foreignField: "_id",
            as: "owner"
        })
        this.aggregrate.lookup({
            from: "helpcenters",
            localField: "id_helpCenter",
            foreignField: "_id",
            as: "help"
        })
    }


    listAll(callback) {
        HelpCenterAskSchema.find({}, (err, result) => {
            if (err) return callback(err, null)
            callback(null, result);
        })
    }

    add(helpCenterAsk, callback) {
        const { id_user, id_helpCenter, desc } = helpCenterAsk;
        const date = new Date().toLocaleDateString('pt-BR').slice(0, 10); // DateFormat "yyyy-mm-dd"
        HelpCenterAskSchema.create({ id_user, id_helpCenter, desc, date }, (err, docs) => {
            if (err) return callback(err, null);
            callback(null, docs);
        });
    }

    update(helpCenterAsk, id, callback) {
        const { id_user, id_helpCenter, desc } = helpCenterAsk;
        HelpCenterAskSchema.findByIdAndUpdate(id, { id_user, id_helpCenter, desc }, { new: true }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    list(page, callback) {
        HelpCenterAskSchema.aggregatePaginate(
            this.aggregrate, {
                page: page,
                limit: PAGELIMIT
            }, (err, docs) => {
                if (err) return callback(err, null)
                callback(null, docs);
            });
    }

    remove(id, callback) {
        HelpCenterAskSchema.findByIdAndRemove(id, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    findById(_id, callback) {
        HelpCenterAskSchema.findOne({ _id }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    findById_HelpCenter(id_helpCenter, callback) {
        HelpCenterAskSchema.find({ id_helpCenter }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    findByQuestionID(id_helpCenter, page, callback) {

        HelpCenterAskSchema.paginate(
            {
                id_helpCenter: id_helpCenter
            },
            {
                page: page,
                limit: PAGELIMIT
            },
            (err, docs) => {
                // console.log(docs)
                if (err) return callback(err, null)
                return callback(null, docs);
            }

        )

    }
}
module.exports = HelpCenterAskDao;