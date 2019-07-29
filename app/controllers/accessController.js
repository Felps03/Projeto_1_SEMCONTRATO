const AccessDao = require('../infra/accessDao')
const getTokenFromHeader = require('../utils/getTokenFromHeader')

class AccessController {
    static rotas() {
        return {
            cadastro: '/score/access/',
            edicao: '/score/access/:id',
            remove: '/score/access/:id',
            exportaData: '/admin/export/access'
        }
    }


    exportData() {

        return (req, res) => {

            const accessDao = new AccessDao();

            accessDao.listAll((err, result) => {
                if (err) {
                    return res.send(err)
                }
                res.send(result)
            })
        }
    }

    add() {
        return (req, res) => {
            const accessDao = new AccessDao();

            accessDao.add(req.body,
                (err, result) => {
                    if (err) {
                        return res.status(400).send(
                            JSON.stringify(
                                { erro: 'Erro na contagem de acesso á página.' }
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
            const accessDao = new AccessDao();

            accessDao.update(req.body, req.params.id,
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
            const accessDao = new AccessDao();

            accessDao.remove(req.params.id,
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

module.exports = AccessController
