const ConfigurationDAO = require('../infra/configurationDAO');

class ConfigurationController {
    static rotas() {
        return {
            findById: '/configuration'
        }
    }

    findById() {
        return (req, resp) => {
            const configurationDAO = new ConfigurationDAO();
            configurationDAO.findByID((error, result) => {
                if (error) {
                    console.log(error);
                    return resp.status(400).send(JSON.stringify({ erro: 'Houve Algum problema na hora de remover o configuration favor olhar o log' }));
                }
                return resp.status(200).end(JSON.stringify(result));
            });
        }
    }
}

module.exports = ConfigurationController