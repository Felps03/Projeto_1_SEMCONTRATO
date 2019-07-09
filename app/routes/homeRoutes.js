const HelpCenterController = require('../controllers/helpCenterController');
const helpCenterController = new HelpCenterController();
const DailyNoteController = require('../controllers/dailyNoteController');
const dailyNoteController = new DailyNoteController();

module.exports = (app) => {
    const routesDailyNote = DailyNoteController.routes();
    const routesHelpCenter = HelpCenterController.routes();

    app.get(routesDailyNote.listDate, dailyNoteController.listDate());

    app.get(routesHelpCenter.listLastHelp, helpCenterController.listLastHelp());

}