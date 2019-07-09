const DailyNoteController = require('../controllers/dailyNoteController');
const dailyNoteController = new DailyNoteController();
const DailyNoteValidation = require('../validation/dailyNoteValidation');

module.exports = (app) => {
    const rotasDailyNote = DailyNoteController.routes();

    app.post(rotasDailyNote.register, DailyNoteValidation.validation(), dailyNoteController.add());

    app.put(rotasDailyNote.edit, DailyNoteValidation.validation(), dailyNoteController.update());

    app.get(rotasDailyNote.listDate, dailyNoteController.listDate());

    app.get(rotasDailyNote.listAll, dailyNoteController.listAll());

    //app.get(rotasDailyNote.listLastDaily, dailyNoteController.listLastDaily());

    /*
    app.get(rotasDailyNote.listUser, dailyNoteController.listUser());
    
    
    
    
    */
}