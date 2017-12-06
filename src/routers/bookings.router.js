import express from 'express';
import bookingController from "../controllers/booking.controller";
import  {validateToken}  from './middleware';

/**
 * @swagger
 * definitions:
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
 * /bookings/{userId}:
 *  get:
 *      tags:
 *      - booking
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
 *
 */
bookingRouter.get('/:userId/',validateToken, (req,res)=>{
    bookingController.getAllBookingsByEvents(req).then(response => {
        res.send(response);
    }).catch(()=>{
        res.status(404);
        res.send('no event to update');
    });
});


/**
 * @swagger
 * /bookings/{eventId}:
 *  get:
 *      tags:
 *      - booking
 *      summary: get all users by eventId
 *      description: get all users that booked a particular event --> accessible only for user
 *      parameters:
 *      - in: header
 *        name: x-access-token
 *        required: true
 *      - in: path
 *        name: eventId
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Booking_detail#1'
 *      responses:
 *          200:
 *              description: ok
 *
 */
bookingRouter.get('/:eventId/',validateToken, (req,res)=>{
    bookingController.getAllBookingsByEvent(req).then(response => {
        res.send(response);
    }).catch(()=>{
        res.status(404);
        res.send('no event to update');
    });
});


export default bookingRouter;