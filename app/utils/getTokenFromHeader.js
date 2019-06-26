const TokenHandler = require('./TokenHandler');
const secret = require('../config/secretJWT');

function getTokenFromHeader(req) {

    const tokenHeader = req.get("Authorization").split(" ")[1];

    const tokenHandler = new TokenHandler();

    const payload = tokenHandler.decodeToken(tokenHeader, secret);

    let userData = '';

    if (!payload) {
        userData = payload;
    }
    else { // token ok
        userData = {
            "admin": payload.isAdmin,
            "logged": payload.isValid,
        }
    }
    return userData;
}
module.exports = getTokenFromHeader;