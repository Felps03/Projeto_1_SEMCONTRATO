const AuthController = require('../controllers/authController');
const authController = new AuthController();
const UserValidation = require('../validation/userValidation');
const multer = require("multer");
const multerConfig = require("../config/multer");

module.exports = (app) => {
    const rotasAuth = AuthController.rotas();

    app.get(rotasAuth.lista, authController.list());

    app.post(rotasAuth.cadastro, multer(multerConfig).single("file_photo"), UserValidation.validation(), authController.add());

    app.put(rotasAuth.edicao,UserValidation.validation(), authController.update());

    app.delete(rotasAuth.deletar, authController.remove());

    app.post(rotasAuth.authenticate, authController.authenticate());

    app.post(rotasAuth.resetPassword, authController.resetPassword());

}