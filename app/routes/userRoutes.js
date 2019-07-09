const UserController = require('../controllers/userController');
const userController = new UserController();
const UserValidation = require('../validation/userValidation');
const multer = require("multer");
const multerConfig = require("../config/multer");

module.exports = (app) => {
    const routesUser = UserController.routes();

    app.get(routesUser.list, userController.list());

    // app.post(routesUser.cadastro, multer(multerConfig).single("file_photo"), UserValidation.validation(), userController.add());

    // taking off photo from register
    app.post(routesUser.register, UserValidation.validation(), userController.add());

    app.put(routesUser.edit, multer(multerConfig).single("file_photo"), UserValidation.validation(), userController.update());

    app.delete(routesUser.delete, userController.remove());

    app.post(routesUser.changePassword, userController.changePassword());

    app.get(routesUser.findByEmail, userController.findByEmail());
}