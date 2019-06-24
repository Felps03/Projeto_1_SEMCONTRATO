const UserController = require('../controllers/userController');
const userController = new UserController();
const UserValidation = require('../validation/userValidation');
const multer = require("multer");
const multerConfig = require("../config/multer");

module.exports = (app) => {
    const rotasUser = UserController.rotas();

    app.get(rotasUser.lista, userController.list());

    app.post(rotasUser.cadastro, multer(multerConfig).single("file_photo"), UserValidation.validation(), userController.add());

    app.put(rotasUser.edicao, multer(multerConfig).single("file_photo"), UserValidation.validation(), userController.update());

    app.delete(rotasUser.deletar, userController.remove());

    app.post(rotasUser.changePassword, userController.changePassword());
}