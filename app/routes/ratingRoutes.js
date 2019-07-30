const RatingController = require('../controllers/ratingController');
const ratingController = new RatingController();

module.exports = app => {
    const rotasRating = RatingController.rotas()

    app.post(
        rotasRating.cadastro,
        ratingController.add()
    );

    app.put(
        rotasRating.edicao,
        ratingController.update()
    );

    app.get(
        rotasRating.exportaData,
        ratingController.exportData()
    );

    app.get(
        rotasRating.listByUseChatBot,
        ratingController.listByUseChatBot()
    );
    
    app.delete(
        rotasRating.remove,
        ratingController.remove()
    );

}