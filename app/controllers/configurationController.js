const ConfigurationDAO = require('../infra/configurationDAO');

class ConfigurationController {
    static rotas() {
        return {
            find: '/configuration',
            update: '/configuration/:id'
        }
    }

    find() {
        return async(req, resp) => {
            const configurationDAO = new ConfigurationDAO();
            let recaptchaActive = await configurationDAO.findOne();
            return resp.status(200).end(JSON.stringify(recaptchaActive));
        }
    }


    update() {
        return async(req, resp) => {
            const configurationDAO = new ConfigurationDAO();
            let recaptchaActive = await configurationDAO.update(req.body, req.params.id);
            return resp.status(200).end(JSON.stringify(recaptchaActive));
        }
    }
}

module.exports = ConfigurationController