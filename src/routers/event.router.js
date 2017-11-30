import express from 'express';
import eventController from "../controllers/events.controller";

/**
 * @swagger
 * definitions:
 *  Event:
 *      type: object
 *      required:
 *      - name
 *      - description
 *      - address
 *      - number of places
 *      properties:
 *          name:
 *              type: string
 *          description:
 *              type: string
 *          address:
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
 *      summary: add event
 *      description: add a new event
 *      parameters:
 *      - in: body
 *        name: event
 *        schema:
 *           $ref: '#/definitions/Event'
 *      responses:
 *          201:
 *              description: ok
 *
 */
eventRouter.post('/event', (req, res)=>{
    eventController.add(req.body).then((response)=>{
        res.status(201);
        res.send(response);
    }).catch((err)=>{
        res.status(409);
        res.send(err);
    });
});


/**
 * @swagger
 * /events/event:
 *  get:
 *      tags:
 *      - event
 *      summary: get events
 *      description: get all events
 *      responses:
 *          200:
 *              description: ok
 */

eventRouter.get('/event', (req,res)=>{
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
 *      summary: get event
 *      description: get one event based on its id
 *      responses:
 *          200:
 *              description: ok
 */
eventRouter.get('/event/:eventId', (req, res)=>{
    eventController.getEvent(req).then((event)=>{
        res.send(event);
    }).catch(()=>{
        res.status(404);
        res.send('not found')
    });
});

/**
 * Don't know how to make the swagger for update event!? :(
 */
eventRouter.put('/event/:eventId', (req,res)=>{
    eventController.updateEvent(req);
});

export default eventRouter;