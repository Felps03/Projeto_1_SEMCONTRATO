const { validationResult } = require('express-validator/check');
const { Controller } = require('./Controller');

const DailyNoteDao = require('../infra/dailyNoteDao');
const UserDao = require('../infra/userDao');

class DailyNoteController extends Controller {
    static rotas() {
        return {
            cadastro: '/dailys/daily/',
            edicao: '/dailys/daily/:id',
            listDate: '/dailys/daily/date',
            listUser: '/dailys/daily/',
           // listLastDaily: '/dailys/daily/last',
            listAll: '/dailys',
        }
    }

    add() {
        return (req, resp) => {
            
            const error = validationResult(req);
            let errorList = [];
            if (!error.isEmpty()) {
                error.array().forEach((valor, chave) => errorList.push(valor['msg']));
                return resp.status(400).send(errorList);
            }

            let userDao = new UserDao();
            const dailyNoteDao = new DailyNoteDao();

            userDao.validateEmailAvailable(req.body.email, (error, resultByID) => {
                if (!resultByID) {
                    return resp.status(400).send(JSON.stringify({erro:'USUARIO não existente'}));
                }
                const { _id } = resultByID

                dailyNoteDao.findByUserDate(_id, new Date(), (error, resultUserDate) => {
                    if (resultUserDate) return resp.status(400).send(JSON.stringify({ erro: "DAILY já cadastrada hoje!" }));

                    dailyNoteDao.add(req.body, _id, (error, resultADD) => {
                        console.log(resultADD);
                        if (!resultADD) {
                            console.log(error);
                            return resp.status(400).send(JSON.stringify({erro:'Houve Algum problema na hora de cadastrar a daily favor olhar o log'}));   
                        }
                        
                        resp.send(resultADD);
                    });
                });
            });
        };
    }

    update() {
        return (req, resp) => {

            const error = validationResult(req);
            let errorList = [];

            if (!error.isEmpty()) {
                error.array().forEach((valor, chave) => errorList.push(valor['msg']));
                return resp.status(400).send(errorList);
            }

            const dailyNoteDao = new DailyNoteDao();
            dailyNoteDao.update(req.body, req.params.id, (err, result) => {
                if (err) {
                    console.log(err);
                    resp.status(400).send(JSON.stringify({ erro: "Houve Algum problema na hora de atualizar a daily favor olhar o log" }));
                }
                resp.send(result);
            });
        }
    }

    listDate() {
        return (req, resp) => {

            const dailyNoteDao = new DailyNoteDao();
            console.log(req.body);
            dailyNoteDao.listDate(req.body, req.params.page,(err, result) => {
                if (err) {
                    console.log(err);
                    resp.status(400).send(JSON.stringify({ erro: "Houve Algum problema na hora de listar a daily favor olhar o log" }));
                }
                resp.send(result);
            });
        }
    }

    /*listUser() {
        return (req, resp) => {

            const dailyNoteDao = new DailyNoteDao();

            dailyNoteDao.listDate(req.body, (err, result) => {
                if (err) {
                    console.log(err);
                    resp.status(400).send(JSON.stringify({ erro: "Houve Algum problema na hora de atualizar o usuario favor olhar o log" }));
                }
                resp.send(result);
            });
        }
    }*/

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

            const dailyNoteDao = new DailyNoteDao();
            dailyNoteDao.listAll(req.params.page, (error, result) => {
                if (error) {
                    console.log(error);
                    resp.status(400).send(JSON.stringify({ erro: "Houve Algum problema na hora de atualizar a daily favor olhar o log" }));
                }
                resp.send(result);
            });
        }
    }

    remove() {
        throw new Error('O método deletar não existe');
    }
}

module.exports = DailyNoteController;