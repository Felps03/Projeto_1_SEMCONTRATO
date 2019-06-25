const TokenHandler = require('./TokenHandler');
const tokenhandler = new TokenHandler();
const secret = require('../config/secretJWT');

class ValidateAccess {

    checkAdmin(token, secret) {
        const payload = tokenhandler.decodeToken(token, secret);
        return payload.isAdmin;
    }

    checkLogged(token, secret) {
        const payload = tokenhandler.decodeToken(token, secret);
        return payload.isValid;
    }
}
module.exports = ValidateAccess;