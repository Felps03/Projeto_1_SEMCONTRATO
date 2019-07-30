const ConfigurationController = require('../controllers/configurationController');
const configurationController = new ConfigurationController();

module.exports = (app) => {
    const rotasConfiguration = ConfigurationController.rotas();

    app.get(rotasConfiguration.find, configurationController.find());

    app.put(rotasConfiguration.update, configurationController.update());

    app.post(rotasConfiguration.find, configurationController.create());
}