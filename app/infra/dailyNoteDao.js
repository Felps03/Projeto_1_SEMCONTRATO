const DailyNoteSchema = require('../models/dailyNote');
const pageLimit = 10;
const lastLimit = 3;
class DailyNoteDao {

    add(dailyNote, id_user, callback) {
        const { yesterday, today, impediment } = dailyNote;
        let date = new Date();
        console.log(id_user, yesterday, today, impediment, date);
        DailyNoteSchema.create({ id_user, yesterday, today, impediment, date }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    update(dailyNote, id, callback) {
        const { id_user, yesterday, today, impediment, date } = dailyNote;

        DailyNoteSchema.findByIdAndUpdate(id, { id_user, yesterday, today, impediment, date }, (err, docs) => {
            if (err) return callback(err, null);
            callback(null, docs);
        });
    }

    findByUserDate(id_user, date, callback) {
        DailyNoteSchema.findOne({ id_user, date }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    listDate(date, page, callback) {
        // const { date } = dailyNote;
        const dateBegin = new Date(Number(date.split('-')[0]), Number(date.split('-')[1]) - 1, Number(date.split('-')[2]));
        const dateEnd = new Date(Number(date.split('-')[0]), Number(date.split('-')[1]) - 1, Number(date.split('-')[2]) + 1);

        DailyNoteSchema.paginate({ date }, {
            $gte: dateBegin,
            $lt: dateEnd
        },
            {
                limit: pageLimit,
                skyp: (page - 1) * pageLimit,
                page: page
            },
            (err, docs) => {
                console.log("entrou aqui")
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
    }*/

    // listLastDaily(callback) {

    //     DailyNoteSchema.paginate({}, {
    //         limit: lastLimit,
    //         page: 1,
    //         sort:{
    //             date: -1
    //         }
    //     } ,(err, docs) => {
    //         if (err) return callback(err, null)

    //         callback(null, docs);
    //     });
    // }
}

module.exports = DailyNoteDao;