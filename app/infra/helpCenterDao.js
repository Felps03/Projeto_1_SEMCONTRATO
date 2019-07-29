const HelperCenterAskDao = require('../infra/helperCenterAskDao');
const mongoose = require('../../database/index');
const HelpCenterSchema = require('../models/helpCenter');
const HelpCenterAskSchema = require('../models/helpCenterAsk');
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
        })

    }

    listQA(id, page, callback) {

        // HelpCenterSchema.findOne({ _id: id }, (err, docs) => {
        //     const allData = {};

        //     if (err) return callback(err, null)

        //     else {
        //         const askdao = new HelpCenterAskDao();

        //         allData.docs = docs

        //         askdao.findByQuestionID(id, 1, (error, result) => {

        //             if (error) {
        //                 callback(error, null)
        //             }

        //             allData.answers = result;

        //             callback(null, allData)
        //         });

        //     }

        // })
        let fullData = {}
        this.aggregrate.match({
            _id: mongoose.Types.ObjectId(id)
        })
        HelpCenterSchema.aggregatePaginate(
            this.aggregrate,
            {
                page: 1,
                limit: PAGELIMIT
            },
            (err, docs) => {
                if (err) return callback(err, null)

                //console.log('docs', docs);
                let questionInfo = {
                    ask: docs.docs[0].title,
                    text: docs.docs[0].desc,
                    date: docs.docs[0].date,
                    id_user: docs.docs[0].id_user,
                    id_helpCenter: docs.docs[0]._id,
                    owner: docs.docs[0].owner[0]['name'] + " " + docs.docs[0].owner[0]['lastName']
                }

                fullData.question = questionInfo

                // console.log(fullData.question.docs[0].title);
                const helpCenterAskDao = new HelperCenterAskDao();

                helpCenterAskDao.aggregrate.match({
                    id_helpCenter: mongoose.Types.ObjectId(id)
                })
                HelpCenterAskSchema.aggregatePaginate(
                    helpCenterAskDao.aggregrate,
                    {
                        page: page,
                        limit: PAGELIMIT
                    },
                    (err, answers) => {
                        //console.log(answers)
                        // console.log("oi")
                        // fullData.answers = answers;
                        // return callback(null, fullData)
                        // console.log(answers);

                        // console.log(answers['totalDocs']);
                        // console.log(answers['limit']);
                        // console.log(answers['page']);
                        // console.log(answers['totalPages']);
                        let pagination = {
                            totalDocs: answers['totalDocs'],
                            limit: answers['limit'],
                            page: answers['page'],
                            totalPages: answers['totalPages']
                        }
                        let allAnswers = [];
                        answers.docs.forEach((doc) => {
                            //console.log(doc);
                            let answer = {
                                text: doc.desc,
                                date: doc.date,
                                id_user: doc.id_user,
                                id_helpCenter: doc.id_helpCenter,
                                id_answer: doc._id,
                                owner: doc.owner[0]['name'] + " " + doc.owner[0]['lastName']
                            }
                            allAnswers.push(answer)
                            fullData.answerData = allAnswers

                        })

                        fullData.pagination = pagination;
                        return callback(null, fullData)
                    }
                )
            }
        )
    }

    add(helpCenter, callback) {
        const { id_user, title, desc } = helpCenter;
        const date = new Date().toLocaleDateString('pt-BR').slice(0, 10); // DateFormat "yyyy-mm-dd"
        HelpCenterSchema.create({ id_user, title, desc, date }, (err, docs) => {
            if (err) {
            }
            callback(null, docs);
            return callback(err, null);
        });
    }

    update(helpCenter, id, callback) {
        const { id_user, title, desc } = helpCenter;
        HelpCenterSchema.findByIdAndUpdate(id, { id_user, title, desc }, {
            new: true
        }, (err, docs) => {
            callback(null, docs);
        });
        if (err) return callback(err, null)
    }

    list(page, callback) {
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

    listLastHelp(callback) {
        HelpCenterSchema.paginate({}, {
            limit: LASTLIMIT,
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