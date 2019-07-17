const { validationResult } = require('express-validator/check');
const { Controller } = require('./Controller');

const HelperCenterDao = require('../infra/helpCenterDao');
const HelpCenterAskDao = require('../infra/helperCenterAskDao');
const UserDao = require('../infra/userDao');

class HelperCenterController extends Controller {

    static rotas() {
        return {
            cadastroPost: '/helps/post/',
            editarPost: '/helps/post/:id',
            listaPost: '/helps/list/post/:page',
            deletarPost: '/helps/post/:id',
            findById: '/helps/list/:id',
            findByJoker: '/helps/list/joker/:page',
            // findById: '/helps/post/:id',
            // findByJoker: '/helps/post/joker/:page',
            listLastHelp: '/helps/last/'
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
                helperCenterDao.add(req.body, (errorHelper, resultHelper) => {
                    if (!resultHelper) {
                        console.log(errorHelper)
                        return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de cadastrar a daily favor olhar o log' }));
                    }
                    return resp.status(201).send(resultHelper);
                });
            });
        };
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
                const helperCenterDao = new HelperCenterDao();
                helperCenterDao.findById(req.params.id, (err, resultHelperCenter) => {
                    if (err) {
                        return res.status(400).send(JSON.stringify({ erro: "Houve Algum problema na hora de mostrar os dados da daily favor olhar o log" }));
                    }
                    if(resultHelperCenter.id_user == req.body.id_user){
                        const helperCenterDao = new HelperCenterDao();
                            helperCenterDao.update(req.body, req.params.id, (errorHelper, resultHelper) => {
                                if (!resultHelper) {
                                    console.log(errorHelper)
                                    return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de cadastrar a daily favor olhar o log' }));
                                }
                                return resp.status(201).send(resultHelper);
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
                            helperCenterDao.update(req.body, req.params.id, (errorHelper, resultHelper) => {
                                if (!resultHelper) {
                                    console.log(errorHelper)
                                    return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de cadastrar a daily favor olhar o log' }));
                                }
                                return resp.status(201).send(resultHelper);
                            });
                        });
                    }
                });
            });
        }
    }

    list() {
        return (req, resp) => {
            const helpCenterDao = new HelperCenterDao();
            helpCenterDao.list(req.params.page, (error, result) => {
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
                        "title": doc.title,
                        "desc": doc.desc,
                        "date": doc.date,
                        "id_user": doc.id_user,
                        "owner": doc.owner[0]['name'] + " " + doc.owner[0]['lastName'],
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

    listLastHelp() {
        return (req, resp) => {
            const helpCenterDao = new HelperCenterDao();
            helpCenterDao.listLastHelp((error, result) => {
                if (error) {
                    console.log(error);
                    resp.status(400).send(JSON.stringify({ erro: "Houve Algum problema na hora de listar o usuario favor olhar o log" }));
                }
                resp.send(result);
            });
        }
    }

    remove() {
        return (req, resp) => {
            const helperCenterDao = new HelperCenterDao();
            const helperCenterAskDao = new HelpCenterAskDao();
            helperCenterDao.findById(req.params.id, (error, resultByID) => {
                if (resultByID === null) return resp.status(400).send(JSON.stringify({ erro: 'HelpCenter não encontrada' }));

                const userDao = new UserDao();
                helperCenterDao.findById(req.params.id, (err, resultHelperCenter) => {
                    if (err) {
                        return res.status(400).send(JSON.stringify({ erro: "Houve Algum problema na hora de mostrar os dados da daily favor olhar o log" }));
                    }
                    if(resultHelperCenter.id_user == req.headers.id_user){
                        helperCenterAskDao.findById_HelpCenter(req.params.id, (errorByHelp, resultByHelp) => {
                            if (errorByHelp) return resp.status(400).send(JSON.stringify({ erro: 'Ocorreu um erro ao encontrar as ASK' }));
                           
                            if (resultByHelp) {
                                let response = new Array();
                                resultByHelp.forEach(doc => {
                                    response.push({
                                        "_id": doc._id,
                                    })
                                });
                                response.forEach((helpASK) => {
                                    helperCenterAskDao.remove(helpASK._id, (errorByRemove, resultByRemove) => {
                                        if (errorByRemove) return resp.status(400).send(JSON.stringify({ erro: 'Ocorreu um erro no REMOVE ASK' }));

                                    });

                                });
                                helperCenterDao.remove(req.params.id, (error, result) => {
                                    if (error) {
                                        return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de remover o HelpCenter' }));
                                    }
                                    return resp.status(200).end(JSON.stringify({ msg: 'HelpCenter removido' }));
                                });
                            } else {
                                helperCenterDao.remove(req.params.id, (error, result) => {
                                    if (error) {
                                        return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de remover o HelpCenter' }));
                                    }
                                    return resp.status(200).end(JSON.stringify({ msg: 'HelpCenter removido' }));
                                });
                            }
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
                            helperCenterAskDao.findById_HelpCenter(req.params.id, (errorByHelp, resultByHelp) => {
                                if (errorByHelp) return resp.status(400).send(JSON.stringify({ erro: 'Ocorreu um erro ao encontrar as ASK' }));
                                if (resultByHelp) {
                                    let response = new Array();
                                    resultByHelp.forEach(doc => {
                                        response.push({
                                            "_id": doc._id,
                                        })
                                    });
                                    response.forEach((helpASK) => {
                                        helperCenterAskDao.remove(helpASK._id, (errorByRemove, resultByRemove) => {
                                            if (errorByRemove) return resp.status(400).send(JSON.stringify({ erro: 'Ocorreu um erro no REMOVE ASK' }));

                                        });

                                    });
                                    helperCenterDao.remove(req.params.id, (error, result) => {
                                        if (error) {
                                            return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de remover o HelpCenter' }));
                                        }
                                        return resp.status(200).end(JSON.stringify({ msg: 'HelpCenter removido' }));
                                    });
                                } else {
                                    helperCenterDao.remove(req.params.id, (error, result) => {
                                        if (error) {
                                            return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de remover o HelpCenter' }));
                                        }
                                        return resp.status(200).end(JSON.stringify({ msg: 'HelpCenter removido' }));
                                    });
                                }
                            });
                    
                        });  
                    }    
                });
            });
        }
    }

    findById() {
        return (req, resp) => {
            const helpCenterDao = new HelperCenterDao();
            helpCenterDao.findById(req.params.id, (error, result) => {
                if (error) {
                    console.log(error);
                    return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de buscar o usuario favor olhar o log' }));
                }
                return resp.status(200).end(JSON.stringify(result));
            });
        }
    }

    findByJoker() {
        return (req, resp) => {
            const helpCenterDao = new HelperCenterDao();

            helpCenterDao.findByJoker(req.body, req.params.page, (error, result) => {
                if (error) {
                    console.log(error);
                    return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de buscar o usuario favor olhar o log' }));
                }

                let response = new Array();

                let docs = result.docs;

                docs.forEach(doc => {
                    response.push({
                        "_id": doc._id,
                        "title": doc.title,
                        "desc": doc.desc,
                        "date": doc.date,
                        "id_user": doc.id_user,
                        "owner": doc.owner[0]['name'] + " " + doc.owner[0]['lastName'],
                    })
                });

                response.push({
                    totalDocs: result.totalDocs,
                    limit: result.limit,
                    page: result.page,
                    totalPages: result.totalPages,
                });

                return resp.status(200).send(response);
            });
        }
    }
}

module.exports = HelperCenterController;