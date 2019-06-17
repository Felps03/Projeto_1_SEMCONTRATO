const jwt = require('jsonwebtoken');

class TokenHandler {


    generateToken(user, secret) {

        return jwt.sign({ email: `${user.email}` }, secret);
    }

    decodeToken(token, secret) {

        return jwt.decode(token, secret);
    }
}

module.exports = TokenHandler;