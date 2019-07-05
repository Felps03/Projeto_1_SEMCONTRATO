const HelpCenterController = require('../controllers/helpCenterController');
const helpCenterController = new HelpCenterController();
const HelpCenterValidation = require('../validation/helpCenterValidation');

module.exports = (app) => {
    const rotasHelpCenter = HelpCenterController.rotas();

    app.post(rotasHelpCenter.cadastroPost, HelpCenterValidation.validation(), helpCenterController.add());

}