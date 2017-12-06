import express from 'express';
import bookingController from "../controllers/booking.controller";
import  {validateToken}  from './middleware';
/**
 * @swagger
 * definitions:
 *
 *  BookEvent:
 *      type: object
 *      required:
 *      - userId
 *      - eventId
 *      - transactionStatus
 *      properties:
 *          userId:
 *              type: integer
 *          eventId:
 *              type: integer
 *          transactionStatus:
 *              type: string
 *  BookingStatusUpdate:
 *      type: object
 *      required:
 *      - transactionStatus
 *      properties:
 *          transactionStatus:
 *              type: string
 *
 */

let bookingRouter = express.Router();

/**
 * @swagger
 * /bookings/{eventId}/{userId}:
 *  post:
 *      tags:
 *      - booking
 *      summary: Book an existing event
 *      description: 1. First generate token using the user api token generator.
 *                   2. Weather admin or normal user, call on api with event id, user id in url and use generated valid token to book and event.
 *                   3. Add a status in the transactionStatus section as if an actual transaction status would come from  third party application.
 *      parameters:
 *      - in: header
 *        name: x-access-token
 *        required: true
 *      - in: body
 *        name: user
 *        schema:
 *           $ref: '#/definitions/BookEvent'
 *      responses:
 *          201:
 *              description: ok
 *
 */

bookingRouter.post('/:eventId/:userId',validateToken, (req,res)=>{
    bookingController.bookEvent(req.body).then(response => {
        res.send(response);
    }).catch(()=>{
        res.status(404);
        res.send('no event to update');
    });
});

/**
 * @swagger
 * /bookings/events/{userId}:
 *  get:
 *      tags:
 *      - booking admin
 *      summary: get all booked/purchased events by user
 *      description: get all events of a particular user -- accessible to both normal user and admin
 *      parameters:
 *      - in: header
 *        name: x-access-token
 *        required: true
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          $ref: '#/definitions/BookEvent'
 *      responses:
 *          200:
 *              description: ok
 */
bookingRouter.get('/events/:userId/',validateToken, (req,res)=>{
    bookingController.getAllBookingsByUserId(req).then(response => {
        res.send(response);
    }).catch(()=>{
        res.status(404);
        res.send('no event to update');
        //if user doesn't exist or anything else then always return 404
        //instead of no event to update: {status:"no object found"} --> angular
    });
});


/**
 * @swagger
 * /bookings/users/{eventId}:
 *  get:
 *      tags:
 *      - booking
 *      summary: get all users by eventId
 *      description: get all users that booked a particular event --> accessible only for admin
 *      parameters:
 *      - in: header
 *        name: x-access-token
 *        required: true
 *      - in: path
 *        name: eventId
 *        required: true
 *        schema:
 *          $ref: '#/definitions/BookEvent'
 *      responses:
 *          200:
 *              description: ok
 *
 */
bookingRouter.get('/users/:eventId',validateToken, (req,res)=>{
    if(req.decoded.admin) {
        bookingController.getAllBookingsByEventId(req.params.eventId).then(response => {
            res.send(response);
        }).catch(() => {
            res.status(404);
            res.send('no event to update');
        });
    }else{
        res.status(401);
        res.send('You are not authorized as admin');
    }
});

/**
 * @swagger
 * /bookings/{bookingId}:
 *  put:
 *      tags:
 *      - booking
 *      summary: edit a particular booking
 *      description: As admin, edit/update the transaction status of a particular booking
 *      parameters:
 *      - in: header
 *        name: x-access-token
 *        required: true
 *      - in: path
 *        name: bookingId
 *        required: true
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/BookingStatusUpdate'
 *      responses:
 *          200:
 *              description: ok
 *
 */
bookingRouter.put('/:bookingId',validateToken, (req,res)=>{
    if(req.decoded.admin){
        bookingController.updateBookingStatus(req).then(response => {
            res.send(response);
        }).catch(()=>{
            res.status(404);
            res.send('no event to update');
        });
    }else{
        res.status(401);
        res.send('You are not authorized as admin');
    }
});


/**
 * @swagger
 * /bookings/booking/{eventId}:
 *  delete:
 *      tags:
 *      - booking
 *      summary: delete all bookings
 *      description: As admin, delete all bookings based on event id
 *      parameters:
 *      - in: header
 *        name: x-access-token
 *        required: true
 *      - in: path
 *        name: eventId
 *        required: true
 *        schema:
 *          type: number
 *      responses:
 *          200:
 *              description: ok
 */
bookingRouter.delete('/booking/:eventId',validateToken,(req,res)=>{
   if(req.decoded.admin){
       bookingController.deleteAllBookingsOfAnEvent(req.params.eventId).then(response => {
          res.send(response);
       }).catch(()=>{
           res.status(404);
           res.send('no matching event found');
       });
   }else{
        res.status(401);
        res.send('You are not authorised as admin');
   }
});

export default bookingRouter;