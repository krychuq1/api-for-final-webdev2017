import transactionStatusModel from '../modals/transactionStatus'
class TransactionStatusController {
    constructor(){
        this.transactionStatusModel = transactionStatusModel.getModel();
    }
    getAllTransactions(){
        return this.transactionStatusModel.all();
    }
    // getTicketForEvent(eventId){
    //     return this.transactionStatusModel.all({where: {eventId: eventId}});
    // }
    addTransation(transaction) {
        let transactionObj = new this.transactionStatusModel(transaction);
        return transactionObj.save();
    }
}
const transactionStatusController = new TransactionStatusController();
export default transactionStatusController;