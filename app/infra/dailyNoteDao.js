const DailyNoteSchema = require('../models/dailyNote');

class DailyNoteDao {

    add(dailyNote, callback) {

        const { id_user, yesterday, today, impediment, date } = dailyNote;

        DailyNoteSchema.create({ id_user, yesterday, today, impediment, date }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

}

module.exports = DailyNoteDao;