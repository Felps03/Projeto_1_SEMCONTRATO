const sha256 = require('js-sha256').sha256;
const salt = require('../config/salt');
const fs = require('fs');
const { validationResult } = require('express-validator/check');
const secretJWT = require('jsonwebtoken');

const { Controller } = require('./Controller');
const UserDao = require('../infra/userDao');
const TokenHandler = require('../utils/TokenHandler');

// recaptcha
const recaptchaConfig = require('../../config/recaptcha');
const fetch = require('node-fetch');

class UserController extends Controller {

    constructor() {
        super();
    }

    static rotas() {
        return {
            lista: '/admin/users',
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
                    resp.status(400).send(JSON.stringify({ erro: "Houve Algum problema na hora de listar o usuario favor olhar o log" }));
                }
                resp.send(result);
            });
        }
    }

    add() {
        return (req, resp) => {

            /*
            // recaptcha
            if (!req.body['g-recaptcha-response']) {
                return resp.status(400).send('{"error": "Teste reCAPTCHA não realizado"}')
            }

            const reqParams = `?secret=${encodeURI(recaptchaConfig.secret)}&response=${encodeURI(req.body['g-recaptcha-response'])}`;
            let recaptchaError = false;

            fetch(recaptchaConfig.url + reqParams, {
                method: 'POST',
            })
                .then(res => res.json())
                .then(res => {
                    if (!res.success) {
                        recaptchaError = true;
                        console.log(res['error-codes']);
                    }
                });

            if (recaptchaError) {
                return resp.status(409).send('{"erro": "Teste reCAPTCHA falhou"}');
            }
            //

            */
            const error = validationResult(req);
            let errorList = [];
            //const { filename: file_photo } = req.file;

            if (!error.isEmpty()) {
                error.array().forEach((valor, chave) => errorList.push(valor['msg']));
               // fs.unlinkSync(`./tmp/uploads/${file_photo}`);
                return resp.status(400).send(errorList);
            }

            const { email } = req.body;

            const userDao = new UserDao();
            userDao.validateEmailAvailable(email, (error, resultValidate) => {
                if (resultValidate) {
                    //console.log(file_photo);
                    fs.unlinkSync(`./tmp/uploads/${file_photo}`);
                    return resp.status(400).send(JSON.stringify({ erro: "Email já cadastrado" }));
                }
                userDao.add(req.body, req.file, (error, resultADD) => {
                    if (error) {
                        return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de cadastrar o usuario favor olhar o log' }));
                    }

                    let response = {
                        resultADD,

                    }
                    const tokenHandler = new TokenHandler();
                    userDao.checkAdmin(email, (err, docs) => {
                        // console.log(docs.isAdmin);
                        if (err) {
                            resp.status(500).send(JSON.stringify({ error: 'erro no servidor' }));
                        } else {
                            // resp.status(200).send(docs);
                            resp.set("Token", tokenHandler.generateToken(email, docs.isAdmin, secretJWT)).set('Access-Control-Expose-Headers', 'Token');
                        }
                    });
                    return resp.status(201).send(response);
                });

            });

        };
    }

    update() {
        return (req, resp) => {

            const error = validationResult(req);
            let errorList = [];
            const { filename: file_photo } = req.file;
            if (!error.isEmpty()) {
                error.array().forEach((valor, chave) => errorList.push(valor['msg']));
                fs.unlinkSync(`./tmp/uploads/${file_photo}`);
                return resp.status(400).send(errorList);
            }
            const userDao = new UserDao();

            userDao.update(req.body, req.params.id, req.file, (error, result) => {
                if (error) {
                    console.log(error);
                    fs.unlinkSync(`./tmp/uploads/${file_photo}`);
                    resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de atualizar o usuario favor olhar o log' }));
                }

                return resp.status(201).send(result);
            });
        }

    }

    remove() {
        return (req, resp) => {
            const userDao = new UserDao();
            userDao.remove(req.params.id, (error, result) => {
                if (error) {
                    console.log(error);
                    resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de remover o usuario favor olhar o log' }));
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
                    resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de encontrar o usuario favor olhar o log' }));
                }
                resp.send(result)
            });
        }
    }

    findById() {
        return (req, resp) => {
            const userDao = new UserDao();
            userDao.findById(req.params.id, (error, result) => {
                if (error) {
                    console.log(error);
                    resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de encontrar o usuario favor olhar o log' }));
                }
                resp.send(result)
            });
        }
    }

    changePassword() {
        return (req, resp) => {
            const userDao = new UserDao();
            const { email, password } = req.body;
            userDao.validateEmailAvailable(email, (error, answer) => {
                if (error) resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de encontrar o usuario favor olhar o log' }));

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