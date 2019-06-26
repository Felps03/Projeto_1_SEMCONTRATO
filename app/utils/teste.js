email = "oleiro87@gmail.com";
isAdmin = true;
isValid = true;

const TokenHandler = require('./TokenHandler');
const secret = require('../config/secretJWT');
const tokenhandler = new TokenHandler();
const ValidateAccess = require('./ValidateAccess');
const jwt = require('jsonwebtoken');
const v = new ValidateAccess();

const token = tokenhandler.generateToken(email, isAdmin, secret);

// console.log(token);
// console.log("");

// const token_usuario = tokenhandler.generateToken(email, false, secret);
const token_errado = "mf9ur32no38rh";
// console.log(token_usuario);
// console.log("");

// const payload = tokenhandler.decodeToken(token, secret);
// const payload = tokenhandler.decodeToken(token_errado, secret);

// if (!payload) {
//     console.log('deu erro');
// }
// else {
//     console.log("deu certo");
// }

// console.log(payload);

const token_off = tokenhandler.generateToken(email, isAdmin, secret, false);

console.log(token_off);
// console.log("");

// const payload_off = tokenhandler.decodeToken(token_off, secret);
// console.log(payload_off);

// console.log(v.checkAdmin(token, secret));
// console.log(v.checkAdmin(token_usuario, secret));
// console.log("ooooooooooooooo");
// console.log(v.checkLogged(token, secret));
// console.log(v.checkLogged(token_off, secret));