const jwt = require('jsonwebtoken');
const secret = require('../config/secretJWT');


class TokenHandler {


    // generateToken(user, secret, isValid = true) {
    generateToken(email, isAdmin, secret, isValid = true) {

        const payload = {
            email: email,
            isAdmin: isAdmin,
            isValid: isValid
        };
        return jwt.sign(payload, secret);
    }

    // translate token to json if its valid
    decodeToken(token, secret) {

        const payload = jwt.verify(token, secret);
        return payload;
    }

}

module.exports = TokenHandler;