const HelperCenterAskController = require('../controllers/helpCenterAskController');
const helperCenterAskController = new HelperCenterAskController();
const HelpCenterAskValidation = require('../validation/helpCenterAskValidation');

module.exports = (app) => {
    const routesHelpCenterAsk = HelperCenterAskController.routes();

    app.post(routesHelpCenterAsk.registerAsk, HelpCenterAskValidation.validation(), helperCenterAskController.add());

    app.put(routesHelpCenterAsk.editAsk, HelpCenterAskValidation.validation(), helperCenterAskController.update());

    app.get(routesHelpCenterAsk.listAsk, helperCenterAskController.list());

    app.delete(routesHelpCenterAsk.deleteAsk, helperCenterAskController.remove());

    app.get(routesHelpCenterAsk.findById, helperCenterAskController.findById());

}