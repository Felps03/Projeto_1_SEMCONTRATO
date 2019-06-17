const AuthController = require('../controllers/authController');
const authController = new AuthController();
const UserValidation = require('../validation/userValidation');

module.exports = (app) => {
    const rotasAuth = AuthController.rotas();

    app.get(rotasAuth.lista, authController.list());

    app.post(rotasAuth.cadastro, UserValidation.validation(), authController.add());

    app.put(rotasAuth.edicao, UserValidation.validation(), authController.update());

    app.delete(rotasAuth.deletar, authController.remove());

}