const ConfigurationController = require('../controllers/configurationController');
const configurationController = new ConfigurationController();

module.exports = (app) => {
    const rotasConfiguration = ConfigurationController.rotas();

    app.get(rotasConfiguration.findById, configurationController.findById());
}