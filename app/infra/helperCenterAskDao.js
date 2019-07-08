const HelpCenterAskSchema = require('../models/helpCenterAsk');

class HelpCenterAskDao {

    add(helpCenterAsk, callback) {
        const { id_user, id_helpCenter, desc } = helpCenterAsk;
        const date = new Date().toLocaleDateString('pt-BR').slice(0, 10); // DateFormat "yyyy-mm-dd"
        HelpCenterAskSchema.create({ id_user, id_helpCenter, desc, date }, (err, docs) => {
            if (err) {
                return callback(err, null);
            }
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

    list(callback) {
        HelpCenterAskSchema.find({}).exec((err, docs) => {
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

}
module.exports = HelpCenterAskDao;