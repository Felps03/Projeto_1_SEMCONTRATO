const { validationResult } = require('express-validator/check')
const { Controller } = require('./Controller')

const DailyNoteDao = require('../infra/dailyNoteDao')
const UserDao = require('../infra/userDao')
const getTokenFromHeader = require('../utils/getTokenFromHeader')

class DailyNoteController extends Controller {
    static rotas() {
        return {
            cadastro: '/dailys/daily/',
            edicao: '/dailys/daily/:id',
            // listDate: '/dailys/daily/:date/:page',
            listDate: '/dailys/list/:date/:page',
            listUser: '/dailys/list/user/:user/:page',
            // listLastDaily: '/dailys/daily/last',
            listAll: '/dailys',
            listDailyById: '/dailys/:id',
            registered: '/dailys/user/:id',
            exportaData: '/admin/export/daylies'
        }
    }


    exportData() {

        return (req, res) => {

            const dailyNoteDao = new DailyNoteDao();

            dailyNoteDao.listAllDaylies((err, result) => {
                if (err) {
                    return res.send(err)
                }
                res.send(result)
            })
        }
    }
    listDailyById() {
        return (req, res) => {
            // res.send('oi')
            // res.send(req.params.id)
            const dailyNoteDao = new DailyNoteDao()
            dailyNoteDao.listById(req.params.id, (err, result) => {
                if (err) {
                    return res.status(400).send(
                        JSON.stringify({
                            erro:
                                'Houve Algum problema na hora de mostrar os dados da daily favor olhar o log'
                        })
                    )
                }
                return res.send(result)
            })
        }
    }

    add() {
        return (req, resp) => {
            const error = validationResult(req)
            let errorList = []
            if (!error.isEmpty()) {
                error
                    .array()
                    .forEach((valor, chave) => errorList.push(valor['msg']))
                return resp.status(400).send(errorList)
            }

            let userDao = new UserDao()
            const dailyNoteDao = new DailyNoteDao()

            userDao.validateEmailAvailable(
                req.body.email,
                (error, resultByID) => {
                    if (!resultByID) {
                        return resp.status(400).send(
                            JSON.stringify({
                                erro: 'USUARIO não existente'
                            })
                        )
                    }
                    const { _id } = resultByID
                    dailyNoteDao.registeredDaily(
                        _id,
                        (erroRegistered, resultRegistered) => {
                            if (resultRegistered)
                                return resp.status(400).send(
                                    JSON.stringify({
                                        erro: 'Você já cadastrou sua daily'
                                    })
                                )
                            dailyNoteDao.findByUserDate(
                                _id,
                                new Date()
                                    .toLocaleDateString('pt-BR')
                                    .slice(0, 10),
                                (error, resultUserDate) => {
                                    if (resultUserDate)
                                        return resp.status(400).send(
                                            JSON.stringify({
                                                erro:
                                                    'DAILY já cadastrada hoje!'
                                            })
                                        )
                                    dailyNoteDao.add(
                                        req.body,
                                        _id,
                                        (error, resultADD) => {
                                            if (!resultADD) {
                                                console.log(error)
                                                return resp.status(400).send(
                                                    JSON.stringify({
                                                        erro:
                                                            'Houve Algum problema na hora de cadastrar a daily favor olhar o log'
                                                    })
                                                )
                                            }

                                            return resp
                                                .status(200)
                                                .send(resultADD)
                                        }
                                    )
                                }
                            )
                        }
                    )
                }
            )
        }
    }

    update() {
        return (req, resp) => {
            const error = validationResult(req)
            let errorList = []

            if (!error.isEmpty()) {
                error
                    .array()
                    .forEach((valor, chave) => errorList.push(valor['msg']))
                return resp.status(400).send(errorList)
            }
            const userDao = new UserDao()
            const dailyNoteDao = new DailyNoteDao()

            const userData = getTokenFromHeader(req)
            // console.log(userData);

            dailyNoteDao.listById(req.params.id, (err, resultDaily) => {
                if (err) {
                    return res.status(400).send(
                        JSON.stringify({
                            erro:
                                'Houve Algum problema na hora de mostrar os dados da daily favor olhar o log'
                        })
                    )
                }
                if (resultDaily.id_user == req.body.id_user) {
                    console.log('chegou aqui')
                    dailyNoteDao.update(
                        req.body,
                        req.params.id,
                        (err, resultUp) => {
                            if (err) {
                                console.log(err)
                                return resp.status(400).send(
                                    JSON.stringify({
                                        erro:
                                            'Houve Algum problema na hora de atualizar a daily favor olhar o log'
                                    })
                                )
                            }
                            return resp.status(200).send(resultUp)
                        }
                    )
                } else {
                    if (!userData.admin) {
                        return resp
                            .status(401)
                            .send(JSON.stringify({ error: 'Não é ADMIN' }))
                    }
                    const dailyNoteDao = new DailyNoteDao()
                    dailyNoteDao.update(
                        req.body,
                        req.params.id,
                        (err, resultUp) => {
                            if (err) {
                                console.log(err)
                                return resp.status(400).send(
                                    JSON.stringify({
                                        erro:
                                            'Houve Algum problema na hora de atualizar a daily favor olhar o log'
                                    })
                                )
                            }
                            return resp.status(200).send(resultUp)
                        }
                    )
                }
            })
        }
    }

    listDate() {
        return (req, resp) => {
            const dailyNoteDao = new DailyNoteDao()

            dailyNoteDao.listDate(
                req.params.date,
                req.params.page,
                (err, result) => {
                    if (err) {
                        console.log(err)
                        resp.status(400).send(
                            JSON.stringify({
                                erro:
                                    'Houve Algum problema na hora de listar a daily favor olhar o log'
                            })
                        )
                    }

                    const userDao = new UserDao()
                    let docs = result.docs
                    let response = new Array()
                    // resp.send(result);
                    docs.forEach(doc => {
                        response.push({
                            id_daily: doc._id,
                            id_user: doc.id_user,
                            yesterday: doc.yesterday.replace('<', '&lt;').replace('>', '&gt;'),
                            today: doc.today.replace('<', '&lt;').replace('>', '&gt;'),
                            impediment: doc.impediment.replace('<', '&lt;').replace('>', '&gt;'),
                            date: doc.date,
                            owner:
                                doc.owner[0]['name'] +
                                ' ' +
                                doc.owner[0]['lastName']
                        })
                    })
                    response.push({
                        totalDocs: result.totalDocs,
                        totalPages: result.totalPages,
                        limit: result.limit,
                        page: result.page
                    })
                    return resp.send(response)
                }
            )
        }
    }

    listUser() {
        return (req, resp) => {
            const dailyNoteDao = new DailyNoteDao()

            dailyNoteDao.listUser(
                req.params.user,
                req.params.page,
                (err, result) => {
                    if (err) {
                        console.log(err)
                        resp.status(400).send(
                            JSON.stringify({
                                erro:
                                    'Houve Algum problema na hora de atualizar o usuario favor olhar o log'
                            })
                        )
                    } else {
                        const response = []
                        result.docs.forEach(doc => {
                            response.push({
                                id_daily: doc._id,
                                id_user: doc.id_user,
                                yesterday: doc.yesterday.replace('<', '&lt;').replace('>', '&gt;'),
                                today: doc.today.replace('<', '&lt;').replace('>', '&gt;'),
                                impediment: doc.impediment.replace('<', '&lt;').replace('>', '&gt;'),
                                date: doc.date,
                                owner:
                                    doc.owner[0]['name'] +
                                    ' ' +
                                    doc.owner[0]['lastName']
                            })
                        })
                        response.push({
                            totalDocs: result.totalDocs,
                            totalPages: result.totalPages,
                            limit: result.limit,
                            page: result.page
                        })
                        resp.send(response)
                    }
                }
            )
        }
    }

    // listLastDaily() {
    //     return (req, resp) => {

    //         const dailyNoteDao = new DailyNoteDao();

    //         dailyNoteDao.listLastDaily((err, result) => {
    //             if (err) {
    //                 console.log(err);
    //                 resp.status(400).send(JSON.stringify({ erro: "Houve Algum problema na hora de listar ultimas Dailys favor olhar o log" }));
    //             }
    //             resp.send(result);
    //         });
    //     }
    // }

    listAll() {
        return (req, resp) => {
            const dailyNoteDao = new DailyNoteDao()
            dailyNoteDao.listAll(req.params.page, (error, result) => {
                if (error) {
                    console.log(error)
                    return resp.status(400).send(
                        JSON.stringify({
                            erro:
                                'Houve Algum problema na hora de atualizar a daily favor olhar o log'
                        })
                    )
                }
                return resp.send(result)
            })
        }
    }

    remove() {
        throw new Error('O método deletar não existe')
    }

    registered() {
        return (req, resp) => {
            const id = req.params.id
            const dailyNoteDao = new DailyNoteDao()
            dailyNoteDao.registeredDaily(id, (error, resultUserDate) => {
                if (resultUserDate)
                    return resp.status(400).send(
                        JSON.stringify({
                            erro: 'Você já cadastrou sua daily'
                        })
                    )
                return resp.status(200).send(resultUserDate)
            })
        }
    }
}

module.exports = DailyNoteController
