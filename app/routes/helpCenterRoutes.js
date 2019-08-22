const HelpCenterController = require('../controllers/helpCenterController');
const helpCenterController = new HelpCenterController();
const HelpCenterValidation = require('../validation/helpCenterValidation');

module.exports = (app) => {
    const rotasHelpCenter = HelpCenterController.rotas();

    app.post(rotasHelpCenter.cadastroPost, HelpCenterValidation.validation(), helpCenterController.add());

    app.put(rotasHelpCenter.editarPost, HelpCenterValidation.validation(), helpCenterController.update());

    app.get(rotasHelpCenter.listaPost, helpCenterController.list());

    app.delete(rotasHelpCenter.deletarPost, helpCenterController.remove());

    app.get(rotasHelpCenter.findById, helpCenterController.findById());

    app.post(rotasHelpCenter.findByJoker, helpCenterController.findByJoker());

    app.get(rotasHelpCenter.exportaData, helpCenterController.exportData());

    app.get(rotasHelpCenter.listLastHelp, helpCenterController.listLastHelp());

    app.get(rotasHelpCenter.listQA, helpCenterController.listQA());

    app.post(rotasHelpCenter.resolved, helpCenterController.resolved());
}