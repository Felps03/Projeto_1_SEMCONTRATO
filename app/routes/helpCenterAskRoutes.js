const HelperCenterAskController = require('../controllers/helpCenterAskController');
const helperCenterAskController = new HelperCenterAskController();
const HelpCenterAskValidation = require('../validation/helpCenterAskValidation');

module.exports = (app) => {
    const rotasHelpCenterAsk = HelperCenterAskController.rotas();

    app.post(rotasHelpCenterAsk.cadastroAsk, HelpCenterAskValidation.validation(), helperCenterAskController.add());

    app.put(rotasHelpCenterAsk.editarAsk, HelpCenterAskValidation.validation(), helperCenterAskController.update());

    app.get(rotasHelpCenterAsk.listaAsk, helperCenterAskController.list());

    app.delete(rotasHelpCenterAsk.deletarAsk, helperCenterAskController.remove());

    app.get(rotasHelpCenterAsk.findById, helperCenterAskController.findById());

}