const UseChatBotController = require('../controllers/useChatBotController');
const useChatBotController = new UseChatBotController();

module.exports = app => {
    const rotasUseChatBot = UseChatBotController.rotas()

    app.post(
        rotasUseChatBot.cadastro,
        useChatBotController.add()
    );

    app.put(
        rotasUseChatBot.edicao,
        useChatBotController.update()
    );

    app.get(
        rotasUseChatBot.exportaData,
        useChatBotController.exportData()
    );

    app.get(
        rotasUseChatBot.listByAccess,
        useChatBotController.listByAccess()
    );
    
    app.delete(
        rotasUseChatBot.remove,
        useChatBotController.remove()
    );

}