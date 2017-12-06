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
    getAllBookingsByEvents(req){
        return this.userEvent_model.all({where:{'userId': req.params.userId}});
    }
    //see all users that booked a particular event
    getAllBookingsByEvent(req){
        return this.userEvent_model.all({where:{'eventId': req.params.eventId}});
    }


    //update a the status of in user_event table

    //update a booking for a user

    //delete a booking for a user

    //delete all bookings of a user

    //delete all bookings of an event

}
const bookingcontroller = new BookEvent_Controller();
export default bookingcontroller;