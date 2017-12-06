import userEvent_model from '../modals/user_event.model';

class BookEvent_Controller{

    constructor(){
        this.userEvent_model = userEvent_model.getModel();
    }

    //create a booking -> book an event
    bookEvent(req){
        let booking = new this.userEvent_model(req);
        return booking.save();
    }

    //see all booked events by user
    getAllBookingsByUserId(req){
        return this.userEvent_model.all({where:{'userId': req.params.userId}});
    }
    //see all users that booked a particular event
    getAllBookingsByEventId(req){
        return this.userEvent_model.all({where:{'eventId': req}});
    }

    //update the status of in user_event table by bookingid
    updateBookingStatus(req){
        return this.userEvent_model.findById(req.params.bookingId).then(booking => {
            return booking.update({
                transactionStatus:req.body.transactionStatus
            }).then(() => {});
        });
    }

    //delete a booking for a user

    //delete all bookings of a user

    //delete all bookings of an event
    deleteAllBookingsOfAnEvent(req){
        return this.userEvent_model.destroy({where:{'eventId':req}});
    }


}
const bookingcontroller = new BookEvent_Controller();
export default bookingcontroller;