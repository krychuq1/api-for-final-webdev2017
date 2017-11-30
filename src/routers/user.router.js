import express from 'express';
import userController from '../controllers/user.controller';
import bcrypt from 'bcrypt'

/**
 * @swagger
 * definitions:
 *  User:
 *      type: object
 *      required:
 *      - name
 *      - lastName
 *      properties:
 *          firstName:
 *              type: string
 *          lastName:
 *              type: string
 *          password:
 *              type: string
 *          email:
 *              type: string
 *
 */

let userRouter = express.Router();
/**
 * @swagger
 * /users/user:
 *  post:
 *      tags:
 *      - user
 *      summary: add user
 *      description: add user
 *      parameters:
 *      - in: body
 *        name: user
 *        schema:
 *           $ref: '#/definitions/User'
 *      responses:
 *          201:
 *              description: ok
 *
 */
userRouter.post('/user', (req, res)=>{
    userController.addUser(req.body).then((response)=>{
        res.status(201);
        res.send(response);
    }).catch((err)=>{
        res.status(409);
        res.send(err);
    });
});


/**
 * @swagger
 * /users/user/{email}/{password}:
 *  get:
 *     tags:
 *      - user
 *     summary: get user
 *     description: get a particular matching users
 *     consumes: application/json
 *     parameters:
 *      - in: body
 *        name: user
 *        schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *          201:
 *              description: ok
 */
userRouter.get('/user/:email/:password', (req, res)=>{
    let obj = {
        email: req.params.email,
        password: req.params.password
    };
    userController.getUser(obj).then((user)=>{
        res.send(user);
    }).catch(()=>{
        res.status(404);
        res.send('not found')
    })



    /* userController.getAll().then((users)=>{
         res.send(users);
         console.log('I reached here!');
     });*/
});

/*
userRouter.get('/user', (req,res)=>{
   /!* let obj = {
        email: req.params.email,
        password: req.params.password
    };*!/
    userController.getUser(obj).then((user)=>{
            res.send(user);
    }).catch(()=>{
        res.status(404);
        res.send('not found')
    })
});
*/

export default userRouter;