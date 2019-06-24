const DailyNoteController = require('../controllers/dailyNoteController');
const dailyNoteController = new DailyNoteController();
const DailyNoteValidation = require('../validation/dailyNoteValidation');

module.exports = (app) => {
    const rotasDailyNote = DailyNoteController.rotas();

    app.post(rotasDailyNote.cadastro, DailyNoteValidation.validation(), dailyNoteController.add());

    app.put(rotasDailyNote.edicao, DailyNoteValidation.validation(), dailyNoteController.update());

}