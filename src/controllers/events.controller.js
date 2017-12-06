import eventModel from '../modals/event.model';

class EventController{

    constructor(){
        this.eventModel = eventModel.getModel();
    }


    add(event){
        //return this.hashPassword(user.password).then((hashed)=>{
        // user.password = hashed;
        let obj = new this.eventModel(event);
        return obj.save();
        //});
    }

    getEvent(event){
        return this.eventModel.findById(event.params.eventId);
    }

    getAll(){
        return this.eventModel.all();
    }

    updateEvent(obj){
        return this.eventModel.findById(obj.params.eventId).then(event => {
            return event.update({
                title:obj.body.title,
                address:obj.body.address,
                city:obj.body.city,
                online_event:obj.body.online_event,
                start_date:obj.body.start_date,
                end_date:obj.body.end_date,
                image:obj.body.image,
                description:obj.body.description,
                organizer_name:obj.body.organizer_name,
                number_of_places:obj.body.number_of_places
            }).then(() => {});
        })
    }

    deleteEvent(obj){
        return this.eventModel.findById(obj.params.eventId).then(event => {
            return event.destroy();
        })
    }

}
const eventController = new EventController();
export default eventController;