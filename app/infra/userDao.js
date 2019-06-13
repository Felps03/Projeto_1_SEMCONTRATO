import { rejects } from 'assert';

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
    findById(id){
        const user = UserSchema.findById(id).select(password);
        return user;
    }

    updatePassword(id, password){
        UserSchema.findByIdAndUpdate(id, password)
        ,{ new: true };

    }
    login(email, password){
        const user = UserSchema.find(email, password);
        return user;
    }
    validPassword(userPassword, password){

        if(userPassword == password){
             return true;
        } else{
            return false;
        }
    }
            
 }
module.exports = UserDao;