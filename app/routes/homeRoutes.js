const HelpCenterController = require('../controllers/helpCenterController');
const helpCenterController = new HelpCenterController();
const DailyNoteController = require('../controllers/dailyNoteController');
const dailyNoteController = new DailyNoteController();

module.exports = (app) => {
    const rotasDailyNote = DailyNoteController.rotas();
    const rotasHelpCenter = HelpCenterController.rotas();

    app.get(rotasDailyNote.listDate, dailyNoteController.listDate());

    app.get(rotasHelpCenter.listLastHelp, helpCenterController.listLastHelp());

}