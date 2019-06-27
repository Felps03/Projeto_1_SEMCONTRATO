const { check } = require('express-validator/check');
const UserDao = require("../infra/userDao");

class DailyNote {
    static validation() {
        return [
            check('id_user').custom(this.isNull).withMessage('O id do USUARIO não pode ser vazio'),
            check('yesterday').trim().isLength({ min: 3 }).withMessage('O campo ONTEM precisa ter no mínimo 3 caracteres!'),
            check('today').trim().isLength({ min: 3 }).withMessage('O campo HOJE precisa ter no mínimo 3 caracteres!'),
            check('impediment').trim().isLength({min: 3}).withMessage('O campo IMPEDIMENTO precisa ter no minimo 3 caracteres!'),

            check('yesterday').custom(this.isNumber).withMessage('Não é permitido digitar apenas numeros!'),
            check('today').custom(this.isNumber).withMessage('Não é permitido digitar apenas numeros!'),
            check('impediment').custom(this.isNumber).withMessage('Não é permitido digitar apenas numeros!'),

            check('date').custom(this.isValidDate).withMessage('A DATA é inválida. Deve estar no formato { aaaa-mm-dd }'),
            check('date').custom(this.isToday).withMessage('A DATA é inválida. Só é permitido cadastrar na data de hoje')
        ]
    }

    static isNull(value){
        if(!value) return false;
        return value;
    }
    
    static isNumber(n) {
        return !(!isNaN(parseFloat(n)) && isFinite(n));
    }
    
    static isValidDate(value) {
        if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;

       // console.log("chegou");

        const date = new Date(value);
        const dateYear = date.getFullYear();
        let today = new Date().getFullYear();

        //console.log(dateYear);
        
        if (dateYear > today) return false;
        if (!date.getTime()) return false;
        return date.toISOString().slice(0, 10) === value;
    }

    static isToday(value){
        const dateHoje = new Date();
        const date = new Date(value);
        console.log(date.getDate());
        console.log(dateHoje.getDate());
        if(date.getFullYear() == dateHoje.getFullYear() &&
         date.getDate() == dateHoje.getDate() 
         && date.getMonth() == dateHoje.getMonth()){
            return value;
         } else{
            return false;
         }
        
    }

}
module.exports = DailyNote;