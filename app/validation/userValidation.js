const { check } = require('express-validator/check');

class User {
    static validation() {
        return [
            check('name').isLength({ min: 3 }).withMessage('O NOME precisa ter no mínimo 3 caracteres!'),
            check('lastName').isLength({ min: 3 }).withMessage('O SOBRENOME precisa ter no mínimo 3 caracteres!'),
            check('userName').isLength({ min: 3 }).withMessage('O USERNAME de usuário precisa ter no mínimo 3 caracteres!'),
            check('email').isEmail().withMessage('EMAIL inválido!'),
            //check('photo').custom(this.isPhoto).withMessage('Imagem precisa estar no formato: jpg, png ou jpeg'),
            check('password').isLength({ min: 6, max: 8 }).withMessage(' O password precisa ter no MÍNIMO 6 caracteres e no MÁXIMO 8!'),
            check('dateOfBirth').custom(this.isValidDate).withMessage('A data é inválida. Deve estar no formato { aaaa-mm-dd }')

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

        if (typeof extPermitidas.find(function(ext) { return extArquivo == ext; }) == 'undefined') {
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

}

module.exports = User;