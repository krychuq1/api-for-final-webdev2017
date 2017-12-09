import ticketModel from '../modals/ticket.model'
class TicketController {
    constructor(){
        this.ticketModel = ticketModel.getModel();
    }
    getAllTicket(){
        return this.ticketModel.all();
    }
    getTicketForEvent(eventId){
        return this.ticketModel.all({where: {eventId: eventId}});
    }
    addTicket(ticket) {
        let ticketObj = new this.ticketModel(ticket);
        return ticketObj.save();
    }
}
const ticketController = new TicketController();
export default ticketController;