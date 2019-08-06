const sha256 = require('js-sha256').sha256;
const fetch = require('node-fetch');

const secretJWT = require('../config/secretJWT');
const salt = require('../config/salt');
const recaptchaConfig = require('../../config/recaptcha');

const GenerateEmail = require('../utils/generateEmail');
const TokenHandler = require('../utils/TokenHandler');
const getTokenFromHeader = require('../utils/getTokenFromHeader');

const UserDao = require('../infra/userDao');
const RecoverDataDao = require('../infra/RecoverDataDao');
const ConfigurationDAO = require('../infra/configurationDAO');

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

            const configDao = new ConfigurationDAO();
            configDao.findOne((errorConfig, resultConfig) => {

                const { email, password } = req.body;
                const hash = sha256(password + salt);
                const userDao = new UserDao();

                if (resultConfig.recaptcha) {
                    if (!req.body['g-recaptcha-response']) return resp.status(406).send({ error: "Teste reCAPTCHA não realizado" })

                    const reqParams = `?secret=${encodeURI(recaptchaConfig.secret)}&response=${encodeURI(req.body['g-recaptcha-response'])}`;
                    let recaptchaError = false;
                    fetch(recaptchaConfig.url + reqParams, {
                        method: 'POST',
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (!res.success) {
                                recaptchaError = true;
                                return resp.status(406).send(res['error-codes']);
                            }
                            return;
                        });

                    if (recaptchaError) {
                        return resp.status(409).send({ erro: "Teste reCAPTCHA falhou" });
                    }

                    userDao.authenticate(email, hash, (error, result) => {
                        if (error) {
                            return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de encontrar o usuario favor olhar o log' }));
                        }

                        if (result.length == 0) {
                            return resp.status(400).send(JSON.stringify({ erro: 'Email ou senha inválidos' }));
                        } else {
                            const tokenHandler = new TokenHandler();
                            userDao.checkAdmin(email, (err, docs) => {
                                if (err) {
                                    return resp.status(500).send('erro no servidor');
                                } else {
                                    return resp.status(200).set("Token", tokenHandler.generateToken(email, docs.isAdmin, secretJWT)).set('Access-Control-Expose-Headers', 'Token').send(result);
                                }
                            });
                        }
                    });
                } else {
                    userDao.authenticate(email, hash, (error, result) => {
                        if (error) return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de encontrar o usuario favor olhar o log' }));
                        if (result.length == 0) return resp.status(400).send(JSON.stringify({ erro: 'Email ou senha inválidos' }));
                        else {
                            const tokenHandler = new TokenHandler();
                            userDao.checkAdmin(email, (err, docs) => {
                                if (err) return resp.status(500).send('erro no servidor');
                                else return resp.status(200).set("Token", tokenHandler.generateToken(email, docs.isAdmin, secretJWT)).set('Access-Control-Expose-Headers', 'Token').send(result);
                            });
                        }
                    });
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
            //console.log(req.body);
            const userEmail = req.body.email;
            const userDao = new UserDao();
            //console.log(userEmail);

            userDao.validateEmailAvailable(userEmail, (error, answer) => {

                if (error) {
                    return res.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de encontrar o usuario favor olhar o log' }));
                }
                if (answer == null) { // if answer its null, userEmail doenst exist on DB
                    return res.status(400).send(JSON.stringify({ erro: 'Email não cadastrado' }));
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
                                    return res.status(500).send(err);
                                }
                                return res.status(200).send(JSON.stringify({ msg: 'Email enviado' }));
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
                if (err == null) {
                    return res.status(400).send(JSON.stringify({ erro: "link expirou" }));
                } else {

                    console.log(`Retorno: ${docs.expires}`);

                    const exp = docs.expires;
                    const now = new Date();

                    if (exp > now) {
                        return res.status(200).send(JSON.stringify({ erro: "código válido" }));
                    } else {
                        return res.status(400).send(JSON.stringify({ erro: "código inválido" }));
                    }

                }


            });
        }
    }
}

module.exports = AuthController