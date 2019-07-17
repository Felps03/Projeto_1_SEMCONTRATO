const { validationResult } = require('express-validator/check');
const { Controller } = require('./Controller');

const HelpCenterAskDao = require('../infra/helperCenterAskDao');
const HelperCenterDao = require('../infra/helpCenterDao');
const UserDao = require('../infra/userDao');

class HelperCenterAskController extends Controller {
    static rotas() {
        return {
            cadastroAsk: '/helps/ask/',
            editarAsk: '/helps/ask/:id',
            listaAsk: '/helps/list/ask/:page',
            deletarAsk: '/helps/ask/:id',
            findById: '/helps/ask/:id',
            // listAnswers: '/helps/list/answers/:idQuestion'
            listAnswers: '/helps/list/answers/:idQuestion/:page'
        }
    }

    listAnswers() {
        return (req, res) => {

            const helperCenterAskDao = new HelpCenterAskDao();
            const idQuestion = req.params.idQuestion;
            const page = req.params.page;

            helperCenterAskDao.findByQuestionID(idQuestion, page, (error, result) => {
                // helperCenterAskDao.findById_HelpCenter(idQuestion, (error, result) => {
                if (error) return res.send(error)
                console.log(result);
                return res.send(result)
            });
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

            const userDao = new UserDao();
            userDao.findById(req.body.id_user, (error, resultByID) => {
                if (!resultByID) {
                    console.log(error)
                    return resp.status(400).send(JSON.stringify({ erro: 'USUARIO não existente' }));
                }

                const helperCenterDao = new HelperCenterDao();
                helperCenterDao.findById(req.body.id_helpCenter, (errorHelper, resultHelper) => {
                    if (!resultHelper) {
                        console.log(errorHelper)
                        return resp.status(400).send(JSON.stringify({ erro: 'HelpCenter não existente' }));
                    }

                    const helperCenterAskDao = new HelpCenterAskDao();
                    helperCenterAskDao.add(req.body, (errorHelperAsk, resultHelperAsk) => {
                        if (!resultHelperAsk) {
                            console.log(errorHelperAsk)
                            return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de cadastrar a daily favor olhar o log' }));
                        }
                        return resp.status(201).send(resultHelperAsk);
                    });
                });
            });
        }
    }

    update() {
        return (req, resp) => {
            const error = validationResult(req);
            let errorList = [];
            if (!error.isEmpty()) {
                error.array().forEach((valor, chave) => errorList.push(valor['msg']));
                return resp.status(400).send(errorList);
            }

            const userDao = new UserDao();
            userDao.findById(req.body.id_user, (error, resultByID) => {
                if (!resultByID) {
                    console.log(error)
                    return resp.status(400).send(JSON.stringify({ erro: 'USUARIO não existente' }));
                }
                const helperCenterAskDao = new HelpCenterAskDao();
                helperCenterAskDao.findById(req.params.id, (err, resultHelperCenterAsk) => {
                    if (err) {
                        return res.status(400).send(JSON.stringify({ erro: "Houve Algum problema na hora de mostrar os dados da daily favor olhar o log" }));
                    }
                        if(resultHelperCenterAsk.id_user == req.body.id_user){
                            const helperCenterDao = new HelperCenterDao();
                                helperCenterDao.findById(req.body.id_helpCenter, (errorHelper, resultHelper) => {
                                    if (!resultHelper) {
                                        console.log(errorHelper)
                                        return resp.status(400).send(JSON.stringify({ erro: 'HelpCenter não existente' }));
                                    }
                                    helperCenterAskDao.update(req.body, req.params.id, (err, resultUp) => {
                                        if (err) {
                                            console.log(err);
                                            return resp.status(400).send(JSON.stringify({ erro: "Houve Algum problema na hora de atualizar a daily favor olhar o log" }));
                                        }
                                        return resp.status(200).send(resultUp);
                                    });
                                });
                        }else{
                            userDao.checkAdmin(resultByID.email, (err, docs) => {
                                // console.log(docs.isAdmin);
                                if (err) {
                                    return resp.status(500).send(JSON.stringify({ error: 'Não é ADMIN' }));
                                } 
                                if (!docs) {
                                    return resp.status(500).send(JSON.stringify({ error: 'Não é ADMIN' }));
                                } 

                                const helperCenterDao = new HelperCenterDao();
                                helperCenterDao.findById(req.body.id_helpCenter, (errorHelper, resultHelper) => {
                                    if (!resultHelper) {
                                        console.log(errorHelper)
                                        return resp.status(400).send(JSON.stringify({ erro: 'HelpCenter não existente' }));
                                    }

                                    const helperCenterAskDao = new HelpCenterAskDao();
                                    helperCenterAskDao.update(req.body, req.params.id, (errorHelperAsk, resultHelperAsk) => {
                                        if (!resultHelperAsk) {
                                            console.log(errorHelperAsk)
                                            return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de cadastrar a daily favor olhar o log' }));
                                        }
                                        return resp.status(201).send(resultHelperAsk);
                                    });
                                });   
                            
                            });
                        }
                    
                    });
                });
            }
        }

    list() {
        return (req, resp) => {
            const helperCenterAskDao = new HelpCenterAskDao();
            helperCenterAskDao.list(req.params.page, (error, result) => {
                if (error) {
                    console.log(error);
                    resp.status(400).send(JSON.stringify({ erro: "Houve Algum problema na hora de listar o usuario favor olhar o log" }));
                }

                let response = new Array();
                console.log(result);
                let docs = result.docs;

                docs.forEach(doc => {
                    response.push({
                        "_id": doc._id,
                        "desc": doc.desc,
                        "date": doc.date,
                        "id_user": doc.id_user,
                        "id_helpCenter": doc.id_helpCenter,
                        "help": doc.help[0]['title'],
                        "owner": doc.owner[0]['name'] + " " + doc.owner[0]['lastName']
                    })
                });

                response.push({
                    totalDocs: result.totalDocs,
                    limit: result.limit,
                    page: result.page,
                    totalPages: result.totalPages,
                });

                resp.send(response);
            });
        }
    }

    remove() {
        return (req, resp) => {
            const helperCenterAskDao = new HelpCenterAskDao();
            helperCenterAskDao.findById(req.params.id, (error, result) => {
                if (error) {
                    console.log(error);
                    return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de remover o usuario favor olhar o log' }));
                }
                if (result === null) {
                    return resp.status(400).send(JSON.stringify({ erro: 'HelpCenter nao cadastrada' }));
                }
                const userDao = new UserDao();
                userDao.findById(req.headers.id_user, (error, resultByID) => {
                    if (!resultByID) {
                        console.log(error)
                        return resp.status(400).send(JSON.stringify({ erro: 'USUARIO não existente' }));
                    }
                    helperCenterAskDao.findById(req.params.id, (err, resultHelperCenterAsk) => {
                        if (err) {
                            return res.status(400).send(JSON.stringify({ erro: "Houve Algum problema na hora de mostrar os dados da daily favor olhar o log" }));
                        }
                        if(resultHelperCenterAsk.id_user == req.headers.id_user){
                            helperCenterAskDao.remove(req.params.id, (error, result) => {
                                if (error) {
                                    console.log(error);
                                    return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de remover o usuario favor olhar o log' }));
                                }
                                return resp.status(200).end(JSON.stringify({ msg: 'HelpCenter removido' }));
                            });
                        }else{
                            userDao.checkAdmin(resultByID.email, (err, docs) => {
                                // console.log(docs.isAdmin);
                                if (err) {
                                    return resp.status(500).send(JSON.stringify({ error: 'Não é ADMIN' }));
                                } 
                                if (!docs) {
                                    return resp.status(500).send(JSON.stringify({ error: 'Não é ADMIN' }));
                                }
                                helperCenterAskDao.remove(req.params.id, (error, result) => {
                                    if (error) {
                                        console.log(error);
                                        return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de remover o usuario favor olhar o log' }));
                                    }
                                    return resp.status(200).end(JSON.stringify({ msg: 'HelpCenter removido' }));
                                });
                            });
                        }
                    });
                });
            });
        }
    }

    findById() {
        return (req, resp) => {
            const helperCenterAskDao = new HelpCenterAskDao();
            helperCenterAskDao.findById(req.params.id, (error, result) => {
                if (error) {
                    console.log(error);
                    return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de remover o usuario favor olhar o log' }));
                }
                return resp.status(200).end(JSON.stringify(result));
            });
        }
    }


}

module.exports = HelperCenterAskController;