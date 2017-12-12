import db from '../database/databaseConnection';
import Sequalize from 'sequelize';

class TransactionStatusModel{

    constructor(){
        this.sequalize = db.getSequalize();
        this.defineModel();
        this.transactionStatusModel.findAll();

    }
    defineModel(){
        //define user model
        this.transactionStatusModel = this.sequalize.define('transactionStatus', {
            status: {
                type: Sequalize.STRING,
            },
            description: {
                type: Sequalize.STRING
            }
        }, {
            timestamps: false

        });
    }
    getModel(){
        return this.transactionStatusModel;
    }
}
const transactionStatusModel = new TransactionStatusModel();
export default transactionStatusModel;