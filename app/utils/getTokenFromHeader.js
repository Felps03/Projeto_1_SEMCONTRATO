const TokenHandler = require('./TokenHandler');
const secret = require('../config/secretJWT');

function getTokenFromHeader(req) {

    // console.log(req.get("Authorization"));
    let tokenHeader = '';
    let payload;
    if (!req.get("Authorization")) {
        // console.log("header vazio")
        payload = false;
    }
    else {

        tokenHeader = req.get("Authorization").split(" ")[1];

        const tokenHandler = new TokenHandler();

        payload = tokenHandler.decodeToken(tokenHeader, secret);
    }

    let userData = '';

    if (!payload) {
        userData = payload;
    }
    else { // token ok
        userData = {
            "email": payload.email,
            "admin": payload.isAdmin,
            "logged": payload.isValid,
        }
    }
    return userData;
}
module.exports = getTokenFromHeader;