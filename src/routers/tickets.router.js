import express from "express";
import ticketController from "../controllers/ticket.controller";
import {validateToken} from "./middleware";

/**
 * @swagger
 * definitions:
 *
 *  Ticket:
 *      type: object
 *      required:
 *      - eventId
 *      - userId
 *      - type
 *      - price
 *      - currency
 *      properties:
 *          price:
 *              type: number
 *          eventId:
 *              type: number
 *          type:
 *              type: string
 *          currency:
 *              type: string
 *          userId:
 *              type: number
 *
 */

let ticketRouter = express.Router();

/**
 * @swagger
 * /tickets/:
 *  get:
 *      tags:
 *      - tickets
 *      summary: get all tickets
 *      description: get all tickets
 *      parameters:
 *      - in: header
 *        name: x-access-token
 *        required: true
 *      responses:
 *          201:
 *              description: ok
 */
ticketRouter.get('', validateToken, (req,res)=>{
    ticketController.getAllTicket().then((tickets)=>{
        res.send(tickets);
    }).catch(()=>{
        res.status(404);
        res.send('not found')
    })
});

/**
 * @swagger
 * /tickets/{eventId}:
 *  get:
 *      tags:
 *      - tickets
 *      summary: get ticket for specific event
 *      description: get ticket for specific event
 *      parameters:
 *      - in: header
 *        name: x-access-token
 *        required: true
 *      - in: path
 *        name: eventId
 *        required: true
 *      responses:
 *          201:
 *              description: ok
 */
ticketRouter.get('/:eventId', validateToken, (req,res)=>{
    ticketController.getTicketForEvent(req.params.eventId).then((tickets)=>{
        res.send(tickets);
    }).catch(()=>{
        res.status(404);
        res.send('not found')
    })
});

/**
 * @swagger
 * /tickets/:
 *  post:
 *      tags:
 *      - tickets
 *      summary: add ticket
 *      description: add ticket
 *      parameters:
 *      - in: header
 *        name: x-access-token
 *        required: true
 *      - in: body
 *        name: ticket
 *        schema:
 *           $ref: '#/definitions/Ticket'
 *      responses:
 *          201:
 *              description: ok
 */
ticketRouter.post('', validateToken, (req,res) => {
    console.log('we are here');
    ticketController.addTicket(req.body).then(status => {
            res.send(status);
        }
    )
});
export default ticketRouter;