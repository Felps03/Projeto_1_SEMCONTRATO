const { validationResult } = require('express-validator/check');
const { Controller } = require('./Controller');

const HelpCenterAskDao = require('../infra/helperCenterAskDao');
const HelperCenterDao = require('../infra/helpCenterDao');
const UserDao = require('../infra/userDao');

class HelperCenterAskController extends Controller {
    static rotas() {
        return {
            cadastroAsk: '/helps/ask/',
            editarAsk: '/helps/ask/:id',
            listaAsk: '/helps/ask',
            deletarAsk: '/helps/ask/:id',
            findById: '/helps/ask/:id'
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

            const userDao = new UserDao();
            userDao.findById(req.body.id_user, (error, resultByID) => {
                if (!resultByID) {
                    console.log(error)
                    return resp.status(400).send(JSON.stringify({ erro: 'USUARIO não existente' }));
                }

                const helperCenterDao = new HelperCenterDao();
                helperCenterDao.findById(req.body.id_helpCenter, (errorHelper, resultHelper) => {
                    if (!resultHelper) {
                        console.log(errorHelper)
                        return resp.status(400).send(JSON.stringify({ erro: 'HelpCenter não existente' }));
                    }

                    const helperCenterAskDao = new HelpCenterAskDao();
                    helperCenterAskDao.add(req.body, (errorHelperAsk, resultHelperAsk) => {
                        if (!resultHelperAsk) {
                            console.log(errorHelperAsk)
                            return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de cadastrar a daily favor olhar o log' }));
                        }
                        return resp.status(201).send(resultHelperAsk);
                    });
                });
            });
        }
    }

    update() {
        return (req, resp) => {
            const error = validationResult(req);
            let errorList = [];
            if (!error.isEmpty()) {
                error.array().forEach((valor, chave) => errorList.push(valor['msg']));
                return resp.status(400).send(errorList);
            }

            const userDao = new UserDao();
            userDao.findById(req.body.id_user, (error, resultByID) => {
                if (!resultByID) {
                    console.log(error)
                    return resp.status(400).send(JSON.stringify({ erro: 'USUARIO não existente' }));
                }

                const helperCenterDao = new HelperCenterDao();
                helperCenterDao.findById(req.body.id_helpCenter, (errorHelper, resultHelper) => {
                    if (!resultHelper) {
                        console.log(errorHelper)
                        return resp.status(400).send(JSON.stringify({ erro: 'HelpCenter não existente' }));
                    }

                    const helperCenterAskDao = new HelpCenterAskDao();
                    helperCenterAskDao.update(req.body, req.params.id, (errorHelperAsk, resultHelperAsk) => {
                        if (!resultHelperAsk) {
                            console.log(errorHelperAsk)
                            return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de cadastrar a daily favor olhar o log' }));
                        }
                        return resp.status(201).send(resultHelperAsk);
                    });
                });
            });
        }
    }

    list() {
        return (req, resp) => {
            const helperCenterAskDao = new HelpCenterAskDao();
            helperCenterAskDao.list((error, result) => {
                if (error) {
                    console.log(error);
                    resp.status(400).send(JSON.stringify({ erro: "Houve Algum problema na hora de listar o usuario favor olhar o log" }));
                }
                resp.send(result);
            });
        }
    }

    remove() {
        return (req, resp) => {
            const helperCenterAskDao = new HelpCenterAskDao();
            helperCenterAskDao.remove(req.params.id, (error, result) => {
                if (error) {
                    console.log(error);
                    return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de remover o usuario favor olhar o log' }));
                }
                return resp.status(200).end(JSON.stringify({ msg: 'HelpCenter removido' }));
            });
        }
    }

    findById() {
        return (req, resp) => {
            const helperCenterAskDao = new HelpCenterAskDao();
            helperCenterAskDao.findById(req.params.id, (error, result) => {
                if (error) {
                    console.log(error);
                    return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de remover o usuario favor olhar o log' }));
                }
                return resp.status(200).end(JSON.stringify(result));
            });
        }
    }


}

module.exports = HelperCenterAskController;