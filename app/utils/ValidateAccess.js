const TokenHandler = require('./TokenHandler');
const tokenhandler = new TokenHandler();
const secret = require('../config/secretJWT');

class ValidateAccess {

    checkAdmin(payload) {
        return payload.isAdmin;
    }

    checkLogged(token) {
        return payload.isValid;
    }
}
module.exports = ValidateAccess;