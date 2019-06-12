const UserSchema = require('../models');
class UserDao {

    add(User){
        try{
            console.log(User);
            UserSchema.create(User);

        } catch(err){
            console.log(err);
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

