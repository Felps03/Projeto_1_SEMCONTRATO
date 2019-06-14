const express = require('express');

const User = require('../models/user');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}


class authController {
    static rotas() {
        return {
            lista: '/users',
            cadastro: '/users/user/',
            edicao: '/users/user/:id',
            deletar: '/users/user/:id'
        }
    }

    list() {
        return (req, resp) => {
            const userDao = new UserDao;
            userDao.list((error, result) => {
                resp.send(result);
            });
        }
    }

    add() {
        return (req, resp) => {

            const { name, lastName, email, password, dateOfBirth } = req.body;

            const { filename: photo } = req.file;
            // TODO: validação

            const hash = bcrypt.hashSync(password, 5);
            // string -> Date
            const dateOfBirthDate = new Date(dateOfBirth);

            const newUser = new User({
                name,
                lastName,
                email,
                password: hash,
                photo,
                dateOfBirth: dateOfBirthDate
            });

            newUser.save();

            console.log('Usuário cadastrado.', email);
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