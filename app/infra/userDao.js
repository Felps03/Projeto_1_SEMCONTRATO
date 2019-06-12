const UserSchema = require('../models');
class UserDao {

    add(User){
        try{
            console.log(User);
            UserSchema.create(User);

        } catch(err){
            res.status(400).send({err: 'Registro falhou'});
        }
    }
    updatePassword(id, password){
        UserSchema.findByIdAndUpdate(id, password)
        ,{ new: true };

    }
    login(email, password){
        const user = UserSchema.find(email, password);
        return user;
    }


}
module.exports = UserDao;