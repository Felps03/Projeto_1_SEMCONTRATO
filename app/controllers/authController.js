const { validationResult } = require('express-validator/check');
const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const authConfig = require('../../config/auth.json');
const UserDao = require('../infra/userDao');

const UserSchema = require('../models/user');

class AuthController {
    static rotas() {
        return {
            lista: '/users',
            cadastro: '/users/user/',
            edicao: '/users/user/:id',
            deletar: '/users/user/:id',
            authenticate: '/users/authenticate',
            resetPassword: '/users/user/:id'
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
<<<<<<< HEAD
            /*
            if (UserSchema.findOne({ email }))
                return resp.status(400).send({ error: 'Usuário já existe' });
                */
=======
            // if (UserSchema.findOne({ email }))
            //     return resp.status(400).send({ error: 'Usuário já existe' });
>>>>>>> a50978e048eb6d351e48bdedc6f03a1ad66a0fb3

            userDao.add(req.body, req.file, (error, result) => {
                if (error) {
                    console.log(error);
                    resp.status(400).send('Houve Algum problema na hora de cadastrar o usuario favor olhar o log');
                }
                resp.send(result);
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

            const userDao = new UserDao;
            userDao.findOneJoker(email, '+password', (error, result) => {
                if (error) {
                    resp.status(400).send('Houve Algum problema na hora de encontrar o usuario favor olhar o log');
                } else {
                    resp.status(200).send(result);
                }

                //resp.send(result)
            });





        }
    }


    /*
        resetPassword() {
            return (req, resp) => {
                const { email, token, password } = req.body;

                const user = User.findOne({ email }).select('+passwordResetToken');

                if (!user)
                    return email.status(400).send({ error: 'User not found' });

                if (token !== user.passwordResetToken)
                    return email.status(400).send({ error: 'Token invalid' });

                user.password = password;

                user.save();

            }
        }
        */

}


module.exports = AuthController;