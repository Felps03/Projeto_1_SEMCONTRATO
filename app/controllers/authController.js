const { validationResult } = require('express-validator/check');
const express = require('express');
const jwt = require('jsonwebtoken');

const sha256 = require('js-sha256').sha256;
const salt = require('../config/salt');

const User = require('../models/user');
const authConfig = require('../../config/auth.json');
const UserDao = require('../infra/userDao');
const GenerateEmail = require('../utils/GenerateEmail');
const RecoverDataDao = require('../infra/RecoverDataDao');

const JSON = require('circular-json');

const UserSchema = require('../models/user');

const TokenHandler = require('../utils/TokenHandler');

class AuthController {
    static rotas() {
        return {
            lista: '/users',
            cadastro: '/users/user/',
            edicao: '/users/user/:id',
            deletar: '/users/user/:id',
            authenticate: '/users/authenticate',
            resetPassword: '/users/user/recover',
            verifyCode: '/users/code/verify'
        }
    }

    generateToken(params = {}) {
        return jwt.sign(params, authConfig.secret, {
            expiresIn: 86400,
        });
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
            console.log(req.body);
            const error = validationResult(req);
            let errorList = [];

            if (!error.isEmpty()) {
                error.array().forEach((valor, chave) => errorList.push(valor['msg']));
                return resp.status(400).send(errorList);
            }

            const { email } = req.body;

            const userDao = new UserDao();

            //TODO: Refatorar: Tirar o findeOnde e colocar no DAO
            //if (UserSchema.findOne({ email }))
            //  return resp.status(400).send({ error: 'Usuário já existe' });

            const tokenHandler = new TokenHandler();

            userDao.add(req.body, req.file, (error, result) => {
                if (error) {
                    console.log(error);
                    resp.status(400).send('Houve Algum problema na hora de cadastrar o usuario favor olhar o log');
                }

                let token = tokenHandler.generateToken(email, 'semcontrato');

                let response = {
                    result,
                    token
                }

                resp.send(response);
            })

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
            userDao.update(req.body, req.params.id, (error, result) => {
                if (error) {
                    console.log(error);
                    resp.status(400).send('Houve Algum problema na hora de atualizar o usuario favor olhar o log');
                }
                resp.send(result);
            });
        }
    }

    remove() {
        return (req, resp) => {
            const userDao = new UserDao;
            userDao.remove(req.params.id, (error, result) => {
                if (error) {
                    console.log(error);
                    resp.status(400).send('Houve Algum problema na hora de remover o usuario favor olhar o log');
                }
                resp.status(200).end();
            });
        }
    }

    findById() {
        return (req, resp) => {
            const userDao = new UserDao;
            userDao.findById(req.params.id, (error, result) => {
                if (error) {
                    console.log(error);
                    resp.status(400).send('Houve Algum problema na hora de encontrar o usuario favor olhar o log');
                }
                resp.send(result)
            });
        }
    }

    authenticate() {
        return (req, resp) => {
            const { email, password } = req.body;

            const hash = sha256(password + salt);

            console.log(hash);


            const userDao = new UserDao();
            userDao.authenticate(email, hash, (error, result) => {
                if (error) {
                    resp.status(400).send('Houve Algum problema na hora de encontrar o usuario favor olhar o log');
                }
                console.log(result);
                if (result.length == 0) {
                    resp.status(400).send('Email ou senha inválidos');
                } else {
                    resp.status(200).send(result);
                }
            });
        }
    }

    resetPassword() {
        return (req, res) => {
            // email
            const userEmail = req.body.email;
            const userDao = new UserDao();

            userDao.findEmail(userEmail, (error, answer) => {

                if (error) {
                    res.status(400).send('Houve Algum problema na hora de encontrar o usuario favor olhar o log');
                }
                if (answer == null) { // if answer its null, userEmail doenst exist on DB
                    res.status(400).send('Email não cadastrado');
                } else { // userEmail exists on DB
                    const generateEmail = new GenerateEmail();
                    generateEmail.sendEmail(userEmail)
                        .then(randomString => {
                            const now = new Date();
                            const expires = new Date(now);
                            expires.setMinutes(expires.getMinutes() + 10);
                            // console.log("email enviado")
                            const recoverDataDao = new RecoverDataDao();
                            recoverDataDao.add(userEmail, randomString, expires, (err) => {
                                // console.log(err);
                                if (err) {
                                    res.status(500).send(err);
                                }
                                res.status(200).send();
                            });
                        })
                        .catch(e => console.error(e));
                }
            });
        }
    }
    verifyCode() {
        return (req, res) => {
            const { emailCode, email } = req.body;

            const recoverDataDao = new RecoverDataDao();

            recoverDataDao.findExpires(emailCode, email, (err, docs) => {

                console.log(`Retorno: ${docs.expires}`);

                const exp = docs.expires;
                const now = new Date();

                if (exp > now) {
                    res.status(200).send("código válido");
                } else {
                    res.status(400).send("código inválido");
                }
            });
        }
    }
}

module.exports = AuthController