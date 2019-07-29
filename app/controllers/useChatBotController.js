const UseChatBotDao = require('../infra/UseChatBotDao')
const getTokenFromHeader = require('../utils/getTokenFromHeader')

class UseChatBotController {
    static rotas() {
        return {
            cadastro: '/score/usechatbot/',
            edicao: '/score/usechatbot/:id',
            remove: '/score/usechatbot/:id',
            exportaData: '/admin/export/usechatbot',
            listByAccess: '/admin/export/usechatbot/:id_access'
        }
    }


    exportData() {

        return (req, res) => {

            const useChatBotDao = new UseChatBotDao();

            useChatBotDao.listAll((err, result) => {
                if (err) {
                    return res.send(err)
                }
                res.send(result)
            })
        }
    }

    listByAccess() {

        return (req, res) => {

            const useChatBotDao = new UseChatBotDao();

            useChatBotDao.listByAccess(req.params.id_access, (err, result) => {
                if (err) {
                    return res.send(err)
                }
                res.send(result)
            })
        }
    }

    add() {
        return (req, res) => {
            const useChatBotDao = new UseChatBotDao();

            useChatBotDao.add(req.body.id_access,
                (err, result) => {
                    if (err) {
                        return res.status(400).send(
                            JSON.stringify(
                                { erro: 'Erro na contagem de uso do CHATBOT.' }
                            )
                        );
                    }
                    return res.status(201).send(result);
                }
            );
        }
    }

    update() {
        return (req, res) => {
            const useChatBotDao = new UseChatBotDao();

            useChatBotDao.update(req.body, req.params.id,
                (err, result) => {
                    if (err) {
                        return res.status(400).send(
                            JSON.stringify(
                                { erro: 'Erro no upload de registro de acesso á página.' }
                            )
                        );
                    }
                    return res.status(200).send(result);
                }
            );
        }
    }


    remove() {
        return (req, res) => {
            const useChatBotDao = new UseChatBotDao();

            useChatBotDao.remove(req.params.id,
                (err, result) => {
                    if (err) {
                        return res.status(400).send(
                            JSON.stringify(
                                { erro: 'Erro ao remover redistro de acesso á página.' }
                            )
                        )
                    }
                    return res.status(200).send(result);
                }
            );
        }
    }

}

module.exports = UseChatBotController
