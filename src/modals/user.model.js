import db from '../database/databaseConnection';
import Sequalize from 'sequelize';

class UserModel{

    constructor(){
        this.sequalize = db.getSequalize();
        this.defineModel();
        this.userModel.findAll();
    }
    defineModel(){
        //define user model
        this.userModel = this.sequalize.define('user', {
            firstName: {
                type: Sequalize.STRING,
            },
            lastName: {
                type: Sequalize.STRING
            },
            gender: {
                type: Sequalize.STRING
            },
            password: {
                type: Sequalize.STRING
            },
            email: {
                type: Sequalize.STRING,
                unique: true
            },
            isAdmin: {
                type: Sequalize.BOOLEAN
            }
        });
    }
    getModel(){
        return this.userModel;
    }
}
const userModel = new UserModel();
export default userModel;