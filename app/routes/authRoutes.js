const AuthController = require('../controllers/authController');
const authController = new AuthController();

module.exports = (app) => {
    const rotasAuth = AuthController.rotas();

    app.post(rotasAuth.authenticate, authController.authenticate());

    app.post(rotasAuth.resetPassword, authController.resetPassword());

    app.post(rotasAuth.verifyCode, authController.verifyCode());

    app.post(rotasAuth.logout, authController.logout());

    app.get(rotasAuth.checkAdmin, authController.checkAdmin());
}