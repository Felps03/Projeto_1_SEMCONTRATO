const ConfigurationController = require('../controllers/configurationController');
const configurationController = new ConfigurationController();

module.exports = (app) => {
    const rotasConfiguration = ConfigurationController.rotas();

    app.get(rotasConfiguration.find, configurationController.find());

    app.post(rotasConfiguration.update, configurationController.update());
}