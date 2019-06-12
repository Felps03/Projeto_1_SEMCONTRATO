const bcrypt = require('bcryptjs');
const User = require('../models/user');
const multer = require('multer');
const uploadConfig = require('../config/upload');

const upload = multer(uploadConfig);

module.exports = app => {
    app.post('/usuarios', upload.single('photo'),(req, res) => {

        const {
            name,
            lastName,
            email,
            password,
            dateOfBirth
        } = req.body;
        
        const {
            filename: photo
        } = req.file;
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