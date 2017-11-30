import eventModel from '../modals/event.model'
import bcrypt from 'bcrypt';
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
       let updateStatus = this.eventModel.update({
            name:obj.body.name,
            description:obj.body.description,
            address:obj.body.address,
            number_of_places:obj.body.number_of_places
        },{where:
            {id:obj.params.eventId}
        });

       //need to see how the freaking fuck this return and actual response here instead of the 0 or 1 which is for number of affected rows!
       if (updateStatus!=0){
           console.log('worked');
       }else{
           console.log('fuck! No rows affected!');
       }
    }

}
const eventController = new EventController();
export default eventController;