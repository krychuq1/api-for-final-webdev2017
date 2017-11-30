import db from '../database/databaseConnection';
import Sequalize from 'sequelize';

class UserModel{

    constructor(){
        this.sequalize = db.getSequalize();
        this.defineModel();
        this.user.findAll().then(users => {
            console.log(users[0].dataValues)
        });
    }
    defineModel(){

        this.user = this.sequalize.define('user', {
            firstName: {
                type: Sequalize.STRING,
            },
            lastName: {
                type: Sequalize.STRING
            }
        });

        // force: true will drop the table if it already exists
        // this.user.sync({force: true}).then(() => {
        //     // Table created
        //     return  this.user.create({
        //         firstName: 'John',
        //         lastName: 'Hancockadsf'
        //     });
        // });
    }
    // defineSchema(){
    //     this.userSchema = new this.Schema({
    //             name: String,
    //             lastName: String,
    //             email: { type: String, unique: true},
    //             password: String
    //         }
    //     )
    // }
    // getModel(){
    //     return this.userModel;
    // }
}
const userModel = new UserModel();
export default userModel;