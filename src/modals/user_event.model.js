import db from '../database/databaseConnection';
import Sequalize from 'sequelize';

class UserEventModel{

    constructor(){
        this.sequalize = db.getSequalize();
        this.defineModel();
        this.userEvent_model.findAll();
    }
    defineModel(){
        //define event model
        this.userEvent_model = this.sequalize.define('users_event', {
            userId: {
                type: Sequalize.DataTypes.INTEGER,
            },
            eventId: {
                type: Sequalize.DataTypes.INTEGER,
            },
            transactionStatus: {
                type: Sequalize.STRING,
            }
        },{
            //don't require timestamp: createdAt and updatedAt FROM events AS event
            timestamps: false
        });
    }
    getModel(){
        return this.userEvent_model;
    }
}
const userEvent_model = new UserEventModel();
export default userEvent_model;