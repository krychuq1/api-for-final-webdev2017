import express from 'express';
import eventController from "../controllers/events.controller";
import  {validateToken}  from './middleware';

/**
 * @swagger
 * definitions:
 *  Event:
 *      type: object
 *      required:
 *      - title
 *      - address
 *      - city
 *      - online_event
 *      - start_date
 *      - start_time
 *      - end_date
 *      - end_time
 *      - image
 *      - description
 *      - organizer_name
 *      - number_of_places
 *      properties:
 *          title:
 *              type: string
 *          address:
 *              type: string
 *          city:
 *              type: string
 *          online_event:
 *              type: boolean
 *          start_date:
 *              type: date
 *          start_time:
 *              type: string
 *          end_date:
 *              type: date
 *          end_time:
 *              type: string
 *          image:
 *              type: string
 *          description:
 *              type: string
 *          organizer_name:
 *              type: string
 *          number_of_places:
 *              type: integer
 */

let eventRouter = express.Router();
/**
 * @swagger
 * /events/event:
 *  post:
 *      tags:
 *      - event
 *      summary: As admin, add a new event to the database
 *      description: 1. First generate token using the user api token generator.
 *                   2. Admin, use token and json body to add a new event to the database.
 *      parameters:
 *      - in: header
 *        name: x-access-token
 *        required: true
 *      - in: body
 *        name: string
 *        required: true
 *        schema:
 *           $ref: '#/definitions/Event'
 *      responses:
 *          201:
 *              description: ok
 *
 */
eventRouter.post('/event',validateToken, (req, res)=>{
    if(req.decoded.admin) {
        console.log ('re decoded admin returns: '+req.decoded.admin);
        eventController.add(req.body).then((response) => {
            res.status(201);
            res.send(response);
        }).catch((err) => {
            res.status(409);
            res.send(err);
        });
    }else{
        res.status(401);
        res.send('You are not authorized as admin');
    }
});


/**
 * @swagger
 * /events/event:
 *  get:
 *      tags:
 *      - event
 *      summary: get all events
 *      description: get all existing events
 *      parameters:
 *      - in: header
 *        name: x-access-token
 *        required: true
 *      responses:
 *          201:
 *              description: ok
 */

eventRouter.get('/event',validateToken, (req,res)=>{
    eventController.getAll().then((event)=>{
        res.send(event);
    }).catch(()=>{
        res.status(404);
        res.send('not found')
    })
    //res.send('ok');
});

/**
 * @swagger
 * /events/event/{eventId}:
 *  get:
 *      tags:
 *      - event
 *      summary: get one event
 *      description: get one event based on its id
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
 *
 */
eventRouter.get('/event/:eventId',validateToken, (req, res)=>{
    eventController.getEvent(req).then((event)=>{
        res.send(event);
    }).catch(()=>{
        res.status(404);
        res.send('not found')
    });
});

/**
 * @swagger
 * /events/event/{eventId}:
 *  put:
 *      tags:
 *      - event
 *      summary: edit one event
 *      description: edit/update one event based on its id
 *      parameters:
 *      - in: header
 *        name: x-access-token
 *        required: true
 *      - in: path
 *        name: eventId
 *        required: true
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: number
 *      responses:
 *          200:
 *              description: ok
 *
 */
eventRouter.put('/event/:eventId',validateToken, (req,res)=>{
    if(req.decoded.admin){
        eventController.updateEvent(req).then(response => {
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
 * /events/event/{eventId}:
 *  delete:
 *      tags:
 *      - event
 *      summary: delete one event
 *      description: delete event
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
eventRouter.delete('/event/:eventId/', (req, res)=>{
    if(req.decoded.admin){
        eventController.deleteEvent(req).then(response => {
            res.send(response)
        }).catch(()=>{
            res.status(404);
            res.send('cannot delete event');
        });
    }else{
        res.status(401);
        res.send('You are not authorized as admin');
    }

});

export default eventRouter;