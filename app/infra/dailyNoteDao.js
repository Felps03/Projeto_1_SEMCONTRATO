const DailyNoteSchema = require('../models/dailyNote');
const pageLimit = 10;
class DailyNoteDao {

    add(dailyNote, id_user, callback) {
        const { yesterday, today, impediment } = dailyNote;
        let date = new Date();
        console.log(id_user, yesterday, today, impediment , date);
        DailyNoteSchema.create({ id_user, yesterday, today, impediment, date }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    update(dailyNote, id, callback){
        const { id_user, yesterday, today, impediment, date } = dailyNote;

        DailyNoteSchema.findByIdAndUpdate(id, { id_user, yesterday, today, impediment, date }, (err, docs) => {
            if (err) return callback(err, null);
            callback(null, docs);
        });
    }

    findByUserDate(id_user, date, callback){
        DailyNoteSchema.findOne({id_user, date}, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    listDate(dailyNote, page, callback) {
        const { date } = dailyNote;

        DailyNoteSchema.paginate({date},
            {
                limit: pageLimit,
                skyp: (page - 1) * pageLimit,
                page: page
            },
            (err, docs) => {
                if (err) return callback(err, null)
                callback(null, docs);
        });
    }

    listAll(page, callback) {
        DailyNoteSchema.paginate({}, {
            limit: pageLimit,
            skyp: (page - 1) * pageLimit,
            page: page
        },
        (err, docs) => {
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
    }*/


}

module.exports = DailyNoteDao;