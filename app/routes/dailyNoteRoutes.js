const DailyNoteController = require('../controllers/dailyNoteController');
const dailyNoteController = new DailyNoteController();
const DailyNoteValidation = require('../validation/dailyNoteValidation');

module.exports = (app) => {
    const rotasAuth = DailyNoteController.rotas();

    app.post(rotasAuth.cadastro, DailyNoteValidation.validation(), dailyNoteController.add());

}