const sha256 = require('js-sha256').sha256;
const salt = require('../config/salt');

const UserDao = require('../infra/userDao');
const GenerateEmail = require('../utils/generateEmail');
const RecoverDataDao = require('../infra/RecoverDataDao');
const TokenHandler = require('../utils/TokenHandler');
const secretJWT = require('../config/secretJWT');
const getTokenFromHeader = require('../utils/getTokenFromHeader');

// recaptcha
const recaptchaConfig = require('../../config/recaptcha');
const fetch = require('node-fetch');
class AuthController {
    static rotas() {
        return {
            authenticate: '/users/authenticate',
            resetPassword: '/users/user/recover',
            verifyCode: '/users/code/verify',
            logout: '/users/logout'
        }
    }

    authenticate() {
        return (req, resp) => {

            // recaptcha
            const reqParams = `?secret=${encodeURI(recaptchaConfig.secret)}&response=${encodeURI(req.body.recaptchaToken)}`;

            fetch(recaptchaConfig.url + reqParams, {
                method: 'POST',
            })
                .then(res => res.json())
                .then(res => {
                    console.log(JSON.stringify(res));
                    if (!res.success || res.action !== 'user_login') {
                        return resp.status(400).send('invalid reCAPTCHA params');
                    } else if (res.score < recaptchaConfig.tol) {
                        return resp.status(409).send('likely a bot');
                    }
                });


            const { email, password } = req.body;

            const hash = sha256(password + salt);

            // console.log("Email: ", email, "Senha: ", hash);

            const userDao = new UserDao();
            userDao.authenticate(email, hash, (error, result) => {
                if (error) {
                    resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de encontrar o usuario favor olhar o log' }));
                }
                console.log(result);
                if (result.length == 0) {
                    resp.status(400).send(JSON.stringify({ erro: 'Email ou senha inválidos' }));
                } else {
                    //adicionar o token

                    // const email = "oleiro87teste@gmail.com";
                    const tokenHandler = new TokenHandler();
                    // console.log("oi");
                    userDao.checkAdmin(email, (err, docs) => {
                        // console.log(docs.isAdmin);
                        if (err) {
                            resp.status(500).send('erro no servidor');
                        }
                        else {
                            // resp.status(200).send(docs);
                            resp.set("Token", tokenHandler.generateToken(email, docs.isAdmin, secretJWT));
                        }
                    });

                    resp.status(200).send(result);
                }
            });
        }
    }

    logout() {
        return (req, res) => {
            const tokenHandler = new TokenHandler();
            const userData = getTokenFromHeader(req);
            const newToken = tokenHandler.generateToken(userData.email, userData.admin, secretJWT, false);
            res.set("Token", newToken);
            res.status(200).send();
            // res.send(tokenHandler.decodeToken(newToken, secretJWT));
        }
    }

    resetPassword() {
        return (req, res) => {
            const userEmail = req.body.email;
            const userDao = new UserDao();

            userDao.findEmail(userEmail, (error, answer) => {

                if (error) {
                    res.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de encontrar o usuario favor olhar o log' }));
                }
                if (answer == null) { // if answer its null, userEmail doenst exist on DB
                    res.status(400).send(JSON.stringify({ erro: 'Email não cadastrado' }));
                } else { // userEmail exists on DB
                    const generateEmail = new GenerateEmail();
                    generateEmail.sendEmail(userEmail)
                        .then(randomString => {
                            const now = new Date();
                            const expires = new Date(now);
                            expires.setMinutes(expires.getMinutes() + 10);
                            // console.log("email enviado")
                            const recoverDataDao = new RecoverDataDao();
                            recoverDataDao.add(userEmail, randomString, expires, (err) => {
                                // console.log(err);
                                if (err) {
                                    res.status(500).send(err);
                                }
                                res.status(200).send();
                            });
                        })
                        .catch(e => console.error(e));
                }
            });
        }
    }

    verifyCode() {
        return (req, res) => {
            const { emailCode, email } = req.body;

            const recoverDataDao = new RecoverDataDao();

            recoverDataDao.findExpires(emailCode, email, (err, docs) => {

                console.log(`Retorno: ${docs.expires}`);

                const exp = docs.expires;
                const now = new Date();

                if (exp > now) {
                    res.status(200).send(JSON.stringify({ erro: "código válido" }));
                } else {
                    res.status(400).send(JSON.stringify({ erro: "código inválido" }));
                }
            });
        }
    }
}

module.exports = AuthController


