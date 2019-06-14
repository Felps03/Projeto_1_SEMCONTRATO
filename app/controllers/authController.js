const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const authConfig = require('../../config/auth.json');
const UserDao = require('../infra/userDao');

class authController {
    static rotas() {
        return {
            lista: '/users',
            cadastro: '/users/user/',
            edicao: '/users/user/:id',
            deletar: '/users/user/:id'
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
                resp.send(result);
                // TODO: controle de erros
            });
        }
    }

    add() {
        return (req, resp) => {
            const userDao = new UserDao();
            userDao.add(req.body, (error, result) => {
                resp.send(result);
                // TODO: controle de erros
            });
        }
    }

    updatePassword() {
        return (req, resp) => {
            const { id, password, newPassword, confirmNewPassword } = req.body;

            // TODO: validação

            const hash = bcrypt.hashSync(password, 5);

            var user = userDao.findById(id);

            if (!user.validPassword(user.password, password))
                throw new UserException("Senha incorreta");

            userDao.updatePassword(id, password);
        }
    }

    remove() {
        return (req, resp) => {
            const userDao = new UserDao;
            userDao.remove(req.params.id, (error, result) => {
                resp.status(200).end();
            });
        }
    }

    findById() {
        return (req, resp) => {
            const userDao = new UserDao;
            userDao.findById(req.params.id, (error, result) => {
                resp.send(result)
            });
        }
    }
    
}

module.exports = authController;