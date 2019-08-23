const UseChatBotDao = require('../infra/UseChatBotDao')
const getTokenFromHeader = require('../utils/getTokenFromHeader')
const UniqueIPManager = require('../helpers/uniqueIPManager');

class UseChatBotController {

    constructor() {
        // each 20min the last accesses will be forgotten
        // 4min interval * 5 batches
        this.uniqueIPManager = new UniqueIPManager({
            popInterval: 1000 * 60 * 4,
            nbatches: 5
        });
        this.uniqueIPManager.init();
    }

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

            const ip = req.ip.split(':')[0];
            const exists = this.uniqueIPManager.verify(ip);

            // console.log(ip);
            // console.log(exists);
            // console.log(this.uniqueIPManager.ips);

            if (exists) {
                // do nothing
                return res.sendStatus(202);
            } else {
                useChatBotDao.add(ip,
                    (err, result) => {
                        if (err) {
                            return res.status(500).send(
                                JSON.stringify(
                                    { erro: 'Erro na inclusão do feedback' }
                                )
                            );
                        }
                        return res.status(200).send(result);
                    }
                );
            }
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
