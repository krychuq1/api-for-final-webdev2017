import db from '../database/databaseConnection';
import Sequalize from 'sequelize';

class TicketModel{

    constructor(){
        this.sequalize = db.getSequalize();
        this.defineModel();
        this.ticketModel.findAll();

    }
    defineModel(){
        //define user model
        this.ticketModel = this.sequalize.define('ticket', {
            eventId: {
                type: Sequalize.INTEGER,
            },
            type: {
                type: Sequalize.STRING,
            },
            price: {
                type: Sequalize.DOUBLE
            },
            currency: {
                type: Sequalize.STRING
            },
            createdAt: Sequalize.DATE,
            updatedAt: Sequalize.DATE,
        });
    }
    getModel(){
        return this.ticketModel;
    }
}
const ticketModel = new TicketModel();
export default ticketModel;