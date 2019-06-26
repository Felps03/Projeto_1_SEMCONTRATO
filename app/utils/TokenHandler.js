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

        let tokenDecoded = false;

        jwt.verify(token, secret, (err, decode) => {
            if (!err) {
                tokenDecoded = decode;
            }
        });

        return tokenDecoded;
    }

}

module.exports = TokenHandler;