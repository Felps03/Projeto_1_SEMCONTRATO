const RatingDao = require('../infra/ratingDao')
const getTokenFromHeader = require('../utils/getTokenFromHeader')

class RatingController {
    static rotas() {
        return {
            cadastro: '/score/rating/',
            edicao: '/score/rating/:id',
            remove: '/score/rating/:id',
            exportaData: '/admin/export/rating',
            listByUseChatBot: '/admin/export/rating/:id_useChatBot'
        }
    }


    exportData() {

        return (req, res) => {

            const ratingDao = new RatingDao();

            ratingDao.listAll((err, result) => {
                if (err) {
                    return res.send(err)
                }
                res.send(result)
            })
        }
    }

    listByUseChatBot() {

        return (req, res) => {

            const ratingDao = new RatingDao();

            ratingDao.listByUseChatBot(req.params.id_useChatBot ,(err, result) => {
                if (err) {
                    return res.send(err)
                }
                res.send(result)
            })
        }
    }

    add() {
        return (req, res) => {
            const ratingDao = new RatingDao();

            ratingDao.add(req.body,
                (err, result) => {
                    if(err){
                        return res.status(400).send(
                            JSON.stringify(
                                {erro: 'Erro na contagem de uso do CHATBOT.'}
                            )
                        );
                    }
                    return res.status(200).send(result);
                }
            );
        }
    }

    update() {
        return (req, res) => {
            const ratingDao = new RatingDao();

            ratingDao.update(req.body, req.params.id,
                (err, result) =>{
                    if(err){
                        return res.status(400).send(
                            JSON.stringify(
                                {erro: 'Erro no upload de registro de acesso á página.'}
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
            const ratingDao = new RatingDao();

            ratingDao.remove(req.params.id,
                (err, result) => {
                    if(err){
                        return res.status(400).send(
                            JSON.stringify(
                                {erro: 'Erro ao remover redistro de acesso á página.'}
                            )
                        )
                    }
                    return res.status(200).send(result);
                }
            );
        }
    }

}

module.exports = RatingController