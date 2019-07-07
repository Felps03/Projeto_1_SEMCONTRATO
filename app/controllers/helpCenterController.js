const { validationResult } = require('express-validator/check');
const { Controller } = require('./Controller');

const HelperCenterDao = require('../infra/helpCenterDao');
const UserDao = require('../infra/userDao');

class HelperCenterController extends Controller {

    static rotas() {
        return {
            cadastroPost: '/helps/post/',
            editarPost: '/helps/post/:id',
            lista: '/helps/post'
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
                helperCenterDao.add(req.body, (errorHelper, resultHelper) => {
                    if (!resultHelper) {
                        console.log(errorHelper)
                        return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de cadastrar a daily favor olhar o log' }));
                    }
                    return resp.status(201).send(resultHelper);
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

            const userDao = new UserDao();
            userDao.findById(req.body.id_user, (error, resultByID) => {
                if (!resultByID) {
                    console.log(error)
                    return resp.status(400).send(JSON.stringify({ erro: 'USUARIO não existente' }));
                }

                const helperCenterDao = new HelperCenterDao();
                helperCenterDao.update(req.body, req.params.id, (errorHelper, resultHelper) => {
                    if (!resultHelper) {
                        console.log(errorHelper)
                        return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de cadastrar a daily favor olhar o log' }));
                    }
                    return resp.status(201).send(resultHelper);
                });
            });
        }
    }

    list() {
        return (req, resp) => {
            const helpCenterDao = new HelperCenterDao();
            helpCenterDao.list((error, result) => {
                if (error) {
                    // console.log(error);
                    resp.status(400).send(JSON.stringify({ erro: "Houve Algum problema na hora de listar o usuario favor olhar o log" }));
                }
                resp.send(result);
            });
        }
    }
}
module.exports = HelperCenterController;