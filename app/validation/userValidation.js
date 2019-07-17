const { check } = require('express-validator/check');

class User {
    static validation() {
        return [
            check('name').trim().isLength({ min: 3 }).withMessage('O NOME precisa ter no mínimo 3 caracteres!'),
            check('lastName').trim().isLength({ min: 3 }).withMessage('O SOBRENOME precisa ter no mínimo 3 caracteres!'),
            check('userName').trim().isLength({ min: 3 }).withMessage('O USERNAME de usuário precisa ter no mínimo 3 caracteres!'),
            check('email').isEmail().withMessage('EMAIL inválido!'),
            //check('photo').custom(this.isPhoto).withMessage('Imagem precisa estar no formato: jpg, png ou jpeg'),
            check('dateOfBirth').custom(this.isValidDate).withMessage('A data é inválida. Deve estar no formato { aaaa-mm-dd }'),
            check('password').trim().custom(this.passwordValidation).withMessage(' O password precisa ter no MÍNIMO 6 caracteres e no MÁXIMO 8!')

            // TODO: com o token vai estar presente no usuario
            //check('photo').custom(this.isPhoto).withMessage('Imagem precisa estar no formato: jpg, png ou jpeg'),
        ]
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
        const dateYear = date.getFullYear();
        let today = new Date().getFullYear();

        if (dateYear > today) return false;
        if (!date.getTime()) return false;

        return date.toISOString().slice(0, 10) === value;
    }

    static passwordValidation(value) {
        if (value) {
            if (value.length < 6 || value.length > 8) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }
}

module.exports = User;