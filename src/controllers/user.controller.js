import userModel from '../modals/user.model'
import bcrypt from 'bcrypt';
class UserController{

    constructor(){
        this.userModel = userModel.getModel();
    }
    getUsers(){
        return this.userModel.all();
    }
    findOne(email){
        return this.userModel.findOne({ where : {'email': email }})
    }
    getUser(user){
        return new Promise((resolve, reject)=>{
          this.findOne(user.email).then((userDb)=>{
                if(userDb){
                    resolve(userDb);
                }else{
                    reject();
                }
            })
        });
    }
    getUserById(user){
        return new Promise((resolve, reject)=>{
            this.userModel.findById(user).then((userDb)=>{
                if(userDb){
                    resolve(userDb);
                }else{
                    reject();
                }
            })
        });
    }
    authenticate(user){
        console.log('we are going to auth', user.password);
        return new Promise((resolve, reject)=>{
            this.findOne(user.email).then((userDb)=>{
                console.log('user was found', userDb);
                if(userDb){
                    this.comparePassword(user.password, userDb.password).then((res, err)=>{
                        console.log(user.password, userDb.password);
                        console.log(err, "<err", res, " <- res");
                        if(res){
                            resolve(userDb);
                        }else {
                            reject(res);
                        }
                    });
                }else{
                    console.log('user was not found');

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
    deleteUser(email){
        return this.findOne(email).then(user => {
            return user.destroy();
        })
    }
    updateUser(email, newUser){
        return this.findOne(email).then(user => {
           return user.update(newUser).then(() => {});
        })
    }
    checkEmail(email){
        return this.findOne(email);
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