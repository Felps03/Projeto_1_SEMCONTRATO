const { validationResult } = require('express-validator/check');
const express = require('express');
const jwt = require('jsonwebtoken');

const sha256 = require('js-sha256').sha256;
const salt = require('../config/salt');

const User = require('../models/user');
const authConfig = require('../../config/auth.json');
const UserDao = require('../infra/userDao');

const JSON = require('circular-json');

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
            //if (UserSchema.findOne({ email }))
            //  return resp.status(400).send({ error: 'Usuário já existe' });

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
}

module.exports = AuthController