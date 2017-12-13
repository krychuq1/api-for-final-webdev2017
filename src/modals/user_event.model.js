import db from '../database/databaseConnection';
import Sequalize from 'sequelize';
import userModel from "./user.model";

class UserEventModel{

    constructor(){
        this.userModel = userModel.getModel();

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
            transactionStatusId: {
                type: Sequalize.DataTypes.INTEGER,
            }
        },{
            //don't require timestamp: createdAt and updatedAt FROM events AS event
            timestamps: false
        });
        this.userEvent_model.belongsTo(this.userModel, {foreignKey: 'userId'})
    }
    getModel(){
        return this.userEvent_model;
    }
}
const userEvent_model = new UserEventModel();
export default userEvent_model;