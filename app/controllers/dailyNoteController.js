const { validationResult } = require('express-validator/check');
const { Controller } = require('./Controller');

const DailyNoteDao = require('../infra/dailyNoteDao');
const UserDao = require('../infra/userDao');

class DailyNoteController extends Controller {
    static rotas() {
        return {
            cadastro: '/dailys/daily/',
            edicao: '/dailys/daily/:id',
            lista: '/dailys/daily/',
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

            userDao.findById(req.body.id_user, (error, resultByID) => {
                if (!resultByID) {
                    return resp.status(400).send('USUARIO não existente');
                }

                dailyNoteDao.findByUserDate(req.body.id_user, req.body.date, (error, resultUserDate) => {
                    if (resultUserDate) return resp.status(400).send(JSON.stringify({ erro: "DAILY já cadastrada hoje!" }));

                    dailyNoteDao.add(req.body, (error, resultADD) => {
                        if (resultADD) return resp.status(400).send('Houve Algum problema na hora de cadastrar o usuario favor olhar o log');

                        resp.send(result);
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
                    resp.status(400).send('Houve Algum problema na hora de atualizar o usuario favor olhar o log');
                }
                resp.send(result);
            });
        }
    }

    list() {
        return (req, resp) => {

            const dailyNoteDao = new DailyNoteDao();

            dailyNoteDao.list((error, result) => {
                if (error) {
                    console.log(error);
                    resp.status(400).send('Houve Algum problema na hora de listar o usuario favor olhar o log');
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