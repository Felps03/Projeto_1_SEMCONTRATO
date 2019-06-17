const AuthController = require('../controllers/authController');
const authController = new AuthController();

module.exports = (app) => {
    const rotasAuth = AuthController.rotas();

    app.get(rotasAuth.lista, authController.list());

    app.post(rotasAuth.cadastro, authController.add());

    app.put(rotasAuth.edicao, authController.update());

    app.delete(rotasAuth.deletar, authController.remove());

}