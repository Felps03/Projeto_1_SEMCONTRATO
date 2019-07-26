const AccessController = require('../controllers/accessController')
const accessController = new AccessController()

module.exports = app => {
    const rotasAccess = AccessController.rotas()

    app.post(
        rotasAccess.cadastro,
        accessController.add()
    );

    app.put(
        rotasAccess.edicao,
        accessController.update()
    );

    app.get(
        rotasAccess.exportaData,
        accessController.exportData()
    );
    
    app.delete(
        rotasAccess.remove,
        accessController.remove()
    );

}