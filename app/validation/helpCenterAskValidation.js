const { check } = require('express-validator/check');

class HelpCenterAsk {
    static validation() {
        return [
            check('desc').trim().isLength({ min: 3 }).withMessage('O DESCRICAO precisa ter no mínimo 3 caracteres!')
        ]
    }
}

module.exports = HelpCenterAsk;
