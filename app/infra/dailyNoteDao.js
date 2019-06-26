const DailyNoteSchema = require('../models/dailyNote');

class DailyNoteDao {

    add(dailyNote, callback) {
        const { id_user, yesterday, today, impediment, date } = dailyNote;
        
        DailyNoteSchema.create({ id_user, yesterday, today, impediment, date }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    update(dailyNote, id, callback){
        const { id_user, yesterday, today, impediment, date } = dailyNote;

        DailyNoteSchema.findByIdAndUpdate(id, { id_user, yesterday, today, impediment, date }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    findByUserDate(id_user, date, callback){
        DailyNoteSchema.findOne({id_user, date}, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    listDate(dailyNote, callback) {
        const { date } = dailyNote;

        DailyNoteSchema.find({date}, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    /*listUser(dailyNote, callback) {
        const { id_user } = dailyNote;

        DailyNoteSchema.find({id_user}, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }
   
    listDateUser(dailyNote, callback) {
        const { id_user, date} = dailyNote;

        DailyNoteSchema.find({id_user, date}, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    listAll(callback) {
        DailyNoteSchema.find({}).exec((err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }*/

}

module.exports = DailyNoteDao;