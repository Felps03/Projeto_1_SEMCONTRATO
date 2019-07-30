const ConfigurationDAO = require('../infra/configurationDAO');

class ConfigurationController {
    static rotas() {
        return {
            find: '/configuration',
            update: '/configuration/:id'
        }
    }

    find() {
        return (req, resp) => {
            const configurationDAO = new ConfigurationDAO();
            configurationDAO.findOne((error, result) => {
                resp.send(result);
            });
        }
    }

    update() {
        return async (req, resp) => {
            const configurationDAO = new ConfigurationDAO();
            configurationDAO.update(req.body, req.params.id, (error, result) => {
                resp.send(result);
            });
        }
    }


    create() {
        return async (req, resp) => {
            const configurationDAO = new ConfigurationDAO();
            configurationDAO.add((error, result) => {
                resp.send(result);
            });
        }
    }
}

module.exports = ConfigurationController