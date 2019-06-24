class dailyNoteController {
    static rotas() {
        return {
            cadastro: '/dailys/daily/', 
        }
    }
    add() {
        return (req, resp) => {
            console.log(req.body);
            const error = validationResult(req);
            let errorList = [];

            if (!error.isEmpty()) {
                error.array().forEach((valor, chave) => errorList.push(valor['msg']));
                return resp.status(400).send(errorList);
            }

            const { id_user } = req.body;

            const DailyNoteDao = new DailyNoteDao();

            dailyNoteDao.add(req.body, (error, result) => {
                if (error) {
                    console.log(error);
                    resp.status(400).send('Houve Algum problema na hora de cadastrar o usuario favor olhar o log');
                }

                let response = {
                    result
                }

                resp.send(response);
            })

        };
    }
}