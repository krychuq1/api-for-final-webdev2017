import db from '../database/databaseConnection';
import Sequalize from 'sequelize';

class EventModel{

    constructor(){
        this.sequalize = db.getSequalize();
        this.defineModel();
        this.eventModel.findAll();
    }
    defineModel(){
        //define event model
        this.eventModel = this.sequalize.define('event', {
            name: {
                type: Sequalize.STRING,
            },
            description: {
                type: Sequalize.STRING,
            },
            address: {
                type: Sequalize.STRING,
            },
            number_of_places: {
                type: Sequalize.DataTypes.INTEGER
            }
        },{
            //don't require timestamp: createdAt and updatedAt FROM events AS event
            timestamps: false
        });
    }
    getModel(){
        return this.eventModel;
    }
}
const eventModel = new EventModel();
export default eventModel;