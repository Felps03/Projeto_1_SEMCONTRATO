const { check } = require('express-validator/check');

class DailyNote {
    static validation() {
        return [
            check('id_user').custom(this.isNull).withMessage('O id do USUARIO deve ser existente'),
            check('yesterday').isLength({ min: 3 }).withMessage('O campo ONTEM precisa ter no mínimo 3 caracteres!'),
            check('today').isLength({ min: 3 }).withMessage('O campo HOJE precisa ter no mínimo 3 caracteres!'),
            check('impediment').isLength({min: 3}).withMessage('O campo IMPEDIMENTO precisa ter no minimo 3 caracteres!'),
            check('date').custom(this.isValidDate).withMessage('A DATA é inválida. Deve estar no formato { aaaa-mm-dd }')
        ]
    }

    static isNull(value){
        if(!value) return false;
        return value;
    }
    static isValidDate(value) {
        if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;

        console.log("chegou");

        const date = new Date(value);
        const dateYear = date.getFullYear();
        let today = new Date().getFullYear();


        console.log(dateYear);
        
        if (dateYear > today) return false;
        if (!date.getTime()) return false;
        return date.toISOString().slice(0, 10) === value;
    }

}
module.exports = DailyNote;