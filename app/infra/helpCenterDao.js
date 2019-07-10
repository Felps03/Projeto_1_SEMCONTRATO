const HelpCenterSchema = require('../models/helpCenter');

class HelpCenterDao {
    add(helpCenter, callback) {

        const { id_user, title, desc } = helpCenter;
        const date = new Date().toLocaleDateString('pt-BR').slice(0,10); // DateFormat "yyyy-mm-dd"
        
        HelpCenterSchema.create({ id_user, title, desc, date }, (err, docs) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, docs);
        });
    }

    update(helpCenter, id, callback) {
        const { id_user, title, desc } = helpCenter;

        HelpCenterSchema.findByIdAndUpdate(id, { id_user, title, desc }, { new: true }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    list(callback) {
        HelpCenterSchema.find({}).exec((err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
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

    findByTitle(helpCenter, callback) {
        const { title } = helpCenter;
        HelpCenterSchema.find({ title: new RegExp(title, 'i')  } , (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    findByDesc(helpCenter, callback) {
        const { desc } = helpCenter;
        HelpCenterSchema.find({ desc: new RegExp(desc, 'i')  } , (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

}
module.exports = HelpCenterDao;