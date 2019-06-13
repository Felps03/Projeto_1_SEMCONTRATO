const { check } = require('express-validator/check');

class User {

    static validation() {
        return [
            check('name').isLenght({ min: 2 }).withMessage('O nome precisa ter no mínimo 2 caracteres!'),
            check('lastName').isLenght({ min: 2 }).withMessage('O sobrenome precisa ter no mínimo 2 caracteres!'),
            check('userName').isLenght({ min: 2 }).withMessage('O nome de usuário precisa ter no mínimo 2 caracteres!'),
            check('email').custom(this.isEmail).withMessage('Email inválido!'),
            check('password').isLenght({ min: 6, max: 8 }).withMessage(' O password precisa ter no mínimo 6 caracteres!'),
            // TODO: com o token vai estar presente no usuario
            check('passwordResetToken').custom(this.isToken).withMessage('Usuário não logado'),
            check('photo').custom(this.isPhoto).withMessage('Imagem precisa estar no formato: jpg, png ou jpeg'),
            check('dateOfBirth').custom(this.isValidDate).withMessage('A data é inválida. Deve estar no formato { aaaa-mm-dd }'),
            check('createdAt').custom(this.isValidDate).withMessage('A data é inválida. Deve estar no formato { aaaa-mm-dd }'),
        ]
    }

    static isEmail(value) {
        return (value.matches("[a-z]+@[a-z]+\\.(com|edu|mil|gov|org)(\\.[a-z]{2})?"))
    }

    static isToken(token) {
        if (!/^Bearer$/i.test(token))
            return false;
    }

    static isPhoto(image) {
        var extPermitidas = ['jpg', 'png', 'jpeg'];
        var extArquivo = image.value.split('.').pop();

        if (typeof extPermitidas.find(function (ext) { return extArquivo == ext; }) == 'undefined') {
            return false;
        } else { return true }
    }

    static isValidDate(value) {
        if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;
        const date = new Date(value);
        if (!date.getTime()) return false;
        return date.toISOString().slice(0, 10) === value;
    }

}