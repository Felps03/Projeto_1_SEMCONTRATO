const HelpCenterSchema = require('../models/helpCenter');
const pageLimit = 10;
const lastLimit = 3;

class HelpCenterDao {
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
        const aggregrate = HelpCenterSchema.aggregate();
        aggregrate.lookup({
            from: "users",
            localField: "id_user",
            foreignField: "_id",
            as: "owner"
        })
        HelpCenterSchema.aggregatePaginate(
            aggregrate, {
                page: page,
                limit: pageLimit
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
        console.log(joker);
        const aggregrate = HelpCenterSchema.aggregate();
        aggregrate.lookup({
            from: "users",
            localField: "id_user",
            foreignField: "_id",
            as: "owner"
        })
        aggregrate.match({
            $or: [{ title: new RegExp(joker, 'i') }, { desc: new RegExp(joker, 'i') }]
        })
        HelpCenterSchema.aggregatePaginate(
            aggregrate, {
                page: page,
                limit: pageLimit
            },
            (err, docs) => {
                if (err) return callback(err, null)
                callback(null, docs);
            }
        )
    }

    findByDesc(helpCenter, page, callback) {
        const { desc } = helpCenter;

        // console.log(desc, page);

        const aggregrate = HelpCenterSchema.aggregate();
        aggregrate.lookup({
            from: "users",
            localField: "id_user",
            foreignField: "_id",
            as: "owner"
        })
        aggregrate.match({
            desc: new RegExp(desc, 'i')
        })
        HelpCenterSchema.aggregatePaginate(
            aggregrate, {
                page: page,
                limit: pageLimit
            },
            (err, docs) => {
                if (err) return callback(err, null)
                callback(null, docs);
            }
        )
    }
    listLastHelp(callback) {
        HelpCenterSchema.paginate({}, {
            limit: lastLimit,
            page: 1,
            sort: {
                date: -1
            }
        }, (err, docs) => {
            if (err) return callback(err, null)

            callback(null, docs);
        });
    }

}
module.exports = HelpCenterDao;