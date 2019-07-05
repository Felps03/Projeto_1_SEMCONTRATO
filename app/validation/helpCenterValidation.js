const { check } = require('express-validator/check');

class HelpCenter {
    static validation() {
        return [
            check('title').trim().isLength({ min: 3 }).withMessage('O TiTULO precisa ter no mínimo 3 caracteres!'),
            check('desc').trim().isLength({ min: 3 }).withMessage('O DESCRICAO precisa ter no mínimo 3 caracteres!'),
        ]
    }
}

module.exports = HelpCenter;