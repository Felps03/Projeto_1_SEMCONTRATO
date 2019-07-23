const moment = require('moment')
const DailyNoteSchema = require('../models/dailyNote')
const PAGELIMIT = 10
const LASTLIMIT = 3

class DailyNoteDao {
    constructor() {
        this.aggregrate = DailyNoteSchema.aggregate()
        this.aggregrate.lookup({
            from: 'users',
            localField: 'id_user',
            foreignField: '_id',
            as: 'owner'
        })
    }

    add(dailyNote, id_user, callback) {
        const { yesterday, today, impediment } = dailyNote
        let date = new Date().toLocaleDateString('pt-BR').slice(0, 10)
        DailyNoteSchema.create(
            { id_user, yesterday, today, impediment, date },
            (err, docs) => {
                if (err) return callback(err, null)
                callback(null, docs)
            }
        )
    }

    // update(dailyNote, id, callback) {
    //     const { id_user, yesterday, today, impediment, date } = dailyNote;
    //     DailyNoteSchema.findByIdAndUpdate(id, { id_user, yesterday, today, impediment, date }, (err, docs) => {
    //         if (err) return callback(err, null);
    //         callback(null, docs);
    //     });
    // }

    update(dailyNote, id, callback) {
        const { id_user, yesterday, today, impediment, date } = dailyNote
        DailyNoteSchema.findByIdAndUpdate(
            id,
            { yesterday, today, impediment },
            (err, docs) => {
                if (err) return callback(err, null)
                callback(null, docs)
            }
        )
    }

    findByUserDate(id_user, date, callback) {
        DailyNoteSchema.findOne({ id_user, date }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs)
        })
    }

    listDate(date, page, callback) {
        const dateBegin = new Date(
            Number(date.split('-')[0]),
            Number(date.split('-')[1]) - 1,
            Number(date.split('-')[2])
        )
        const dateEnd = new Date(
            Number(date.split('-')[0]),
            Number(date.split('-')[1]) - 1,
            Number(date.split('-')[2]) + 1
        )
        this.aggregrate.match({
            date: {
                $gte: dateBegin,
                $lt: dateEnd
            }
        })
        DailyNoteSchema.aggregatePaginate(
            this.aggregrate,
            {
                page: page,
                limit: PAGELIMIT
            },
            (err, docs) => {
                if (err) return callback(err, null)
                callback(null, docs)
            }
        )
    }

    listUser(username, page, callback) {
        this.aggregrate.match({
            'owner.userName': username
        })
        DailyNoteSchema.aggregatePaginate(
            this.aggregrate,
            {
                page: page,
                limit: PAGELIMIT
            },
            (err, docs) => {
                if (err) return callback(err, null)
                callback(null, docs)
            }
        )
    }

    listById(id, callback) {
        DailyNoteSchema.findById(id, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs)
        })
    }

    listAll(page, callback) {
        DailyNoteSchema.paginate(
            {},
            {
                limit: PAGELIMIT,
                skyp: (page - 1) * PAGELIMIT,
                page: page,
                sort: {
                    date: -1
                }
            },
            (err, docs) => {
                if (err) return callback(err, null)
                callback(null, docs)
            }
        )
    }

    registeredDaily(id_user, callback) {
        const today = moment().startOf('day')

        DailyNoteSchema.findOne(
            {
                id_user,
                date: {
                    $gte: today.toDate(),
                    $lte: today.clone().endOf('day')
                }
            },
            (err, docs) => {
                if (err) return callback(err, null)
                callback(null, docs)
            }
        )
    }

    /*
    listUser(dailyNote, callback) {
        const { id_user } = dailyNote;

        DailyNoteSchema.find({id_user}, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }
    */
}

module.exports = DailyNoteDao
