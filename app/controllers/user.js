const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports = app => {
    app.post('/usuarios', (req, res) => {

        const {
            name,
            lastName,
            email,
            password,
            photo,
            dateOfBirth
        } = req.body;

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

        console.log('Salvo usuario', email);

        res.redirect('/');

    });
}