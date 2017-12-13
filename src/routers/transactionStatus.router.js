import express from "express";
import transactionStatusController from "../controllers/transactionStatus.controller";
/**
 * @swagger
 * definitions:
 *
 *  TransactionStatus:
 *      type: object
 *      required:
 *      - status
 *      - description
 *      properties:
 *          status:
 *              type: string
 *          description:
 *              type: string
 *
 */
let transactionStatusRouter = express.Router();

/**
 * @swagger
 * /transaction/:
 *  get:
 *      tags:
 *      - transaction
 *      summary: get all of transactions
 *      description: get all of transactions
 *      responses:
 *          201:
 *              description: ok
 */
transactionStatusRouter.get('', (req, res) => {
   transactionStatusController.getAllTransactions().then( transactions => {
      res.send(transactions);
   }).catch(() => {
       res.status(404);
       res.send('not found')
   });
});

/**
 * @swagger
 * /transaction/:
 *  post:
 *      tags:
 *      - transaction
 *      summary: add transactions
 *      description: add transaction
 *      parameters:
 *      - in: body
 *        name: transaction
 *        schema:
 *          $ref: '#/definitions/TransactionStatus'
 *      responses:
 *          201:
 *              description: ok
 */
transactionStatusRouter.post('', (req, res) => {
    transactionStatusController.addTransation(req.body).then( status => {
        res.send(status);
    })
});
export default  transactionStatusRouter;