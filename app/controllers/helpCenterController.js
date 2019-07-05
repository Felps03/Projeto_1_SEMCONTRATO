const { validationResult } = require('express-validator/check');
const { Controller } = require('./Controller');

const HelperCenterDao = require('../infra/helpCenterDao');
const UserDao = require('../infra/userDao');

class HelperCenterController extends Controller {

    static rotas() {
        return {
            cadastroPost: '/helps/post/'
        }
    }

    add() {
        return (req, resp) => {
            
            const error = validationResult(req);
            let errorList = [];
            if (!error.isEmpty()) {
                error.array().forEach((valor, chave) => errorList.push(valor['msg']));
                return resp.status(400).send(errorList);
            }

            let userDao = new UserDao();
            const helperCenterDao = new HelperCenterDao();

            userDao.findById(req.body.id_user, (error, resultByID) => {
                if (!resultByID) {
                    return resp.status(400).send(JSON.stringify({erro:'USUARIO não existente'}));
                }
                const { _id } = resultByID

                helperCenterDao.add(req.body, _id, (error, resultADD) => {
                    console.log(resultADD);
                    if (!resultADD) {
                        console.log(error);
                        return resp.status(400).send(JSON.stringify({erro:'Houve Algum problema na hora de cadastrar a daily favor olhar o log'}));   
                    }
                        
                    resp.send(resultADD);
                    });
            });
        };
    }
}
module.exports = HelperCenterController;