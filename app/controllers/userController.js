const sha256 = require('js-sha256').sha256;
const salt = require('../config/salt');

const { validationResult } = require('express-validator/check');
const { Controller } = require('./Controller');
const UserDao = require('../infra/userDao');

const TokenHandler = require('../utils/TokenHandler');

class UserController extends Controller {

    constructor() {
        super();
    }

    static rotas() {
        return {
            lista: '/users',
            cadastro: '/users/user/',
            edicao: '/users/user/:id',
            deletar: '/users/user/:id',
            changePassword: '/users/changePassword',
            findByEmail: '/users/:email',
        }
    }

    list() {
        return (req, resp) => {
            const userDao = new UserDao();
            userDao.list((error, result) => {
                if (error) {
                    console.log(error);
                    resp.status(400).send('Houve Algum problema na hora de listar o usuario favor olhar o log');
                }
                resp.send(result);
            });
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

            const { email } = req.body;

            const userDao = new UserDao();
            const tokenHandler = new TokenHandler();


            userDao.validateEmailAvailable(email, (error, resultValidate) => {
                if (resultValidate) {
                    return resp.status(400).send("Email já cadastrado");
                }
                userDao.add(req.body, req.file, (error, resultADD) => {
                    if (error) {
                        return resp.status(400).send('Houve Algum problema na hora de cadastrar o usuario favor olhar o log');
                    }

                    let token = tokenHandler.generateToken(email, 'semcontrato');

                    let response = {
                        resultADD,
                        token
                    }
                    return resp.send(response);
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
            if (!req.file) {
                userDao.update(req.body, req.params.id, (error, result) => {
                    if (error) {
                        console.log(error);
                        resp.status(400).send('Houve Algum problema na hora de atualizar o usuario favor olhar o log');
                    }
                    resp.send(result);
                })
            } else {
                userDao.update(req.body, req.params.id, req.file, (error, result) => {
                    if (error) {
                        console.log(error);
                        resp.status(400).send('Houve Algum problema na hora de atualizar o usuario favor olhar o log');
                    }
                    resp.send(result);
                });
            }
        }
    }

    remove() {
        return (req, resp) => {
            const userDao = new UserDao();
            userDao.remove(req.params.id, (error, result) => {
                if (error) {
                    console.log(error);
                    resp.status(400).send('Houve Algum problema na hora de remover o usuario favor olhar o log');
                }
                resp.status(200).end();
            });
        }
    }

    findByEmail() {
        return (req, resp) => {
            const userDao = new UserDao();
            userDao.validateEmailAvailable(req.params.email, (error, result) => {
                if (error) {
                    console.log(error);
                    resp.status(400).send('Houve Algum problema na hora de encontrar o usuario favor olhar o log');
                }
                resp.send(result)
            });
        }
    }

    findById() {
        return (req, resp) => {
            const userDao = new UserDao();
            userDao.findById(req.params.email, (error, result) => {
                if (error) {
                    console.log(error);
                    resp.status(400).send('Houve Algum problema na hora de encontrar o usuario favor olhar o log');
                }
                resp.send(result)
            });
        }
    }

    changePassword() {
        return (req, resp) => {
            const userDao = new UserDao();
            const { email, password } = req.body;

            userDao.findEmail(email, (error, answer) => {
                if (error) resp.status(400).send('Houve Algum problema na hora de encontrar o usuario favor olhar o log');

                const { _id } = answer;

                const hash = sha256(password + salt);

                userDao.updatePassword(hash, _id, (errorUpd, answerUpd) => {
                    if (errorUpd) resp.status(400).send(errorUpd);
                    else resp.status(200).send(answerUpd);
                });
            });
        }
    }

}

module.exports = UserController;