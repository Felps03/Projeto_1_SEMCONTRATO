const secret = require('../config/secretJWT');
const TokenHander = require('./TokenHandler');

const tokenhandler = new TokenHander();

const token = tokenhandler.generateToken("oleiro87@gmail.com", true, secret);

console.log(token)
// console.log(secret);

console.log(tokenhandler.decodeToken(token, secret));