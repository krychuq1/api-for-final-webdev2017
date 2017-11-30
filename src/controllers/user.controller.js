import userModel from '../modals/user.model'
import bcrypt from 'bcrypt';
class UserController{

    constructor(){
        this.userModel = userModel.getModel();
    }

    getUsers(){
        return this.userModel.all();
    }

    getUser(user){
        return new Promise((resolve, reject)=>{
            this.userModel.findOne({ where : {'email': user.email }}).then((userDb)=>{
                if(userDb){
                    this.comparePassword(user.password, userDb.password).then((res)=>{
                        if(res){
                            resolve(userDb);
                        }else {
                            reject(res);
                        }
                    });
                }else{
                    reject();
                }

            })
        });
    }

    addUser(user){
       return this.hashPassword(user.password).then((hashed)=>{
           user.password = hashed;
            let userObj = new this.userModel(user);
            return userObj.save();
        });
    }


    hashPassword(password){
        return bcrypt.hash(password, 5);
    }
    comparePassword(plainPassword, hash){
        return bcrypt.compare(plainPassword, hash);
    }


}
const userController = new UserController();
export default userController;