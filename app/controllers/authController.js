const sha256 = require('js-sha256').sha256;
const salt = require('../config/salt');

const UserDao = require('../infra/userDao');
const GenerateEmail = require('../utils/generateEmail');
const RecoverDataDao = require('../infra/RecoverDataDao');

// recaptcha
const recaptchaConfig = require('../../config/recaptcha');
const fetch = require('node-fetch');
class AuthController {
    static rotas() {
        return {
            authenticate: '/users/authenticate',
            resetPassword: '/users/user/recover',
            verifyCode: '/users/code/verify'
        }
    }

    authenticate() {
        return (req, resp) => {

            // recaptcha
            if (!req.body['g-recaptcha-response']) {
                return resp.status(400).send('{"error": "Teste reCAPTCHA não realizado"}')
            }

            const reqParams = `?secret=${encodeURI(recaptchaConfig.secret)}&response=${encodeURI(req.body['g-recaptcha-response'])}`;
            let recaptchaError = false;

            fetch(recaptchaConfig.url + reqParams, {
                method: 'POST',
            })
                .then(res => res.json())
                .then(res => {
                    if (!res.success) {
                        recaptchaError = true;
                        console.log(res['error-codes']);
                    }
                });

            if (recaptchaError) {
                return resp.status(409).send('{"erro": "Teste reCAPTCHA falhou"}');
            }
            //

            const { email, password } = req.body;

            const hash = sha256(password + salt);

            console.log("Email: ", email, "Senha: ", hash);

            const userDao = new UserDao();
            userDao.authenticate(email, hash, (error, result) => {
                if (error) {
                    resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de encontrar o usuario favor olhar o log' }));
                }
                console.log(result);
                if (result.length == 0) {
                    resp.status(400).send(JSON.stringify({ erro: 'Email ou senha inválidos' }));
                } else {
                    resp.status(200).send(result);
                }
            });
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