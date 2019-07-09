const HelpCenterController = require('../controllers/helpCenterController');
const helpCenterController = new HelpCenterController();
const HelpCenterValidation = require('../validation/helpCenterValidation');

module.exports = (app) => {
    const routesHelpCenter = HelpCenterController.routes();

    app.post(routesHelpCenter.registerPost, HelpCenterValidation.validation(), helpCenterController.add());

    app.put(routesHelpCenter.editPost, HelpCenterValidation.validation(), helpCenterController.update());

    app.get(routesHelpCenter.listPost, helpCenterController.list());

    app.delete(routesHelpCenter.deletePost, helpCenterController.remove());

    app.get(routesHelpCenter.findById, helpCenterController.findById());

    app.post(routesHelpCenter.findByTitle, helpCenterController.findByTitle());

    app.post(routesHelpCenter.findByDesc, helpCenterController.findByDesc());

}