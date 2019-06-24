const sha256 = require('js-sha256').sha256;
const salt = require('../config/salt');

const UserDao = require('../infra/userDao');
const GenerateEmail = require('../utils/generateEmail');
const RecoverDataDao = require('../infra/RecoverDataDao');

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
            const { email, password } = req.body;

            const hash = sha256(password + salt);

            console.log("Email: ", email, "Senha: ", hash);

            const userDao = new UserDao();
            userDao.authenticate(email, hash, (error, result) => {
                if (error) {
                    resp.status(400).send('Houve Algum problema na hora de encontrar o usuario favor olhar o log');
                }
                console.log(result);
                if (result.length == 0) {
                    resp.status(400).send('Email ou senha inválidos');
                } else {
                    resp.status(200).send(result);
                }
            });
        }
    }

    resetPassword() {
        return (req, res) => {
            // email
            const userEmail = req.body.email;
            console.log(req.body);
            const userDao = new UserDao();

            userDao.findEmail(userEmail, (error, answer) => {

                if (error) {
                    res.status(400).send('Houve Algum problema na hora de encontrar o usuario favor olhar o log');
                }
                if (answer == null) { // if answer its null, userEmail doenst exist on DB
                    res.status(400).send('Email não cadastrado');
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
            // TODO: Alterar, ver onde a senha irá ficar: 
            // const { emailCode, email } = req.body;
            const { emailCode, email, password } = req.body;

            const recoverDataDao = new RecoverDataDao();
            const userDao = new UserDao();

            recoverDataDao.findExpires(emailCode, email, (err, docs) => {

                console.log(`Retorno: ${docs.expires}`);

                const exp = docs.expires;
                const now = new Date();

                if (exp > now) {

                    userDao.findEmail(email, (error, answer) => {
                        if (error) {
                            res.status(400).send('Houve Algum problema na hora de encontrar o usuario favor olhar o log');
                        }
                        const { _id } = answer;

                        const hash = sha256(password + salt);
                        console.log(hash);
                        userDao.updatePassword(hash, _id, (errorUpd, answerUpd) => {
                            if (error) {
                                console.log('Error Banco : ', errorUpd);
                                //res.status(400).send('Houve Algum problema na hora de encontrar o usuario favor olhar o log');
                            }
                            console.log(answerUpd);
                            //res.status(200).send("senha trocada com sucesso");
                        });

                    });
                    // res.status(200).send("código válido");
                    res.status(200).send("senha trocada com sucesso");

                } else {
                    res.status(400).send("código inválido");
                }
            });
        }
    }
}

module.exports = AuthController