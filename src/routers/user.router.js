import express from 'express';
import userController from '../controllers/user.controller';
import jwt from 'jsonwebtoken';
import  {validateToken}  from './middleware';
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
 *          isAdmin:
 *              type: boolean
 *
 */

let userRouter = express.Router();

// userRouter.use((req, res, next)=>{
//     validateToken(req, res, next);
// });
/**
 * @swagger
 * /users/user:
 *  get:
 *      tags:
 *      - user
 *      summary: get all users
 *      parameters:
 *          - in: header
 *            name: x-access-token
 *            schema:
 *              type: string
 *            required: true
 *      description: get all users
 *      responses:
 *          201:
 *              description: ok
 *
 */
userRouter.get('/user', validateToken, (req, res) =>{
    if(req.decoded.admin){
        userController.getUsers().then(users =>{
            res.send(users);
        })
    }else{
        res.status(401);
        res.send('you are not an admin');
    }

});

/**
 * @swagger
 * /users/authenticate/{email}/{password}:
 *  get:
 *      tags:
 *      - user
 *      summary: get token
 *      parameters:
 *      - in: path
 *        name: email
 *        schema:
 *          type: string
 *      - in: path
 *        name: password
 *        schema:
 *          type: string
 *      responses:
 *          201:
 *              description: ok
 *
 */
userRouter.get('/authenticate/:email/:password', (req, res) => {
    let user = {
        email: req.params.email,
        password: req.params.password
    };
    userController.getUser(user).then(user => {

        const payload = {
            admin: user.isAdmin
        };
        let token = jwt.sign(payload, 'superDuperSecretKey',  { expiresIn: '1h' });
        console.log(token);
        res.json({
            token : token
        });
    }).catch((err)=>{
        console.log(err);
        res.status(404);
        res.send('not found')
    });
});



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
 *      - in: path
 *        name: email
 *        schema:
 *          type: string
 *      - in: path
 *        name: password
 *        schema:
 *          type: string
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

});

/**
 * @swagger
 * /users/user/{email}/{password}:
 *  delete:
 *      tags:
 *      - content
 *      summary: delete specific content
 *      description: delete specific content
 *      parameters:
 *      - in: path
 *        name: email
 *        schema:
 *           type: string
 *      - in: path
 *        name:
 *        schema:
 *          type: string
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *      - in: path
 *        name: language
 *        schema:
 *          type: string
 *      responses:
 *          201:
 *              description: ok
 *
 */



export default userRouter;