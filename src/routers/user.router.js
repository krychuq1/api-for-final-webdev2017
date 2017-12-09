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
    userController.authenticate(user).then(user => {

        const payload = {
            admin: user.isAdmin,
            email: user.email
        };
        let token = jwt.sign(payload, 'superDuperSecretKey',  { expiresIn: '1h' });
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
 * /users/checkEmail/{email}/:
 *  get:
 *      tags:
 *      - user
 *      summary: check if user is register
 *      parameters:
 *      - in: path
 *        name: email
 *        schema:
 *          type: string
 *      responses:
 *          201:
 *              description: ok
 *
 */
userRouter.get('/checkEmail/:email', (req, res) => {
   userController.checkEmail(req.params.email).then(response => {
       if(response){
           res.status(200);
           res.json({status: 'success'});
       }else{
           res.status(404);
           res.send({status: 'fail'})
       }
   })
});

/**
 * @swagger
 * /users/getById/{userId}:
 *  get:
 *      tags:
 *      - user admin
 *      summary: get one user by id
 *      description: as admin, get one user from db based on userId
 *      parameters:
 *      - in: header
 *        name: x-access-token
 *        required: true
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: number
 *      responses:
 *          200:
 *              description: ok
 *
 */

userRouter.get('/getById/:userId',validateToken, (req, res)=>{
    userController.getUserById(req.params.userId).then((user)=>{
        res.send(user);
    }).catch(()=>{
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
    const userObject = {
        email: req.body.email,
        password: req.body.password
    };
    userController.addUser(req.body).then((response)=>{
        userController.authenticate(userObject).then(user => {
            console.log('this is user after auth');
            const payload = {
                admin: user.isAdmin,
                email: user.email
            };
            let token = jwt.sign(payload, 'superDuperSecretKey',  { expiresIn: '1h' });
            res.json({
                token : token
            });
        }).catch((err)=>{
            console.log(err, ' HERE HERE');
            res.status(404);
            res.send('not found')
        });

    }).catch((err)=>{
        res.status(409);
        res.send(err);
    });
});


/**
 * @swagger
 * /users/user/{email}/:
 *  get:
 *     tags:
 *      - user
 *     summary: get user
 *     description: get a particular matching users
 *     consumes: application/json
 *     parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *      - in: path
 *        name: email
 *        schema:
 *          type: string
 *     responses:
 *          201:
 *              description: ok
 */
userRouter.get('/user/:email/',validateToken, (req, res)=>{
    let obj = {
        email: req.params.email,
    };
    userController.getUser(obj).then((user)=>{
        if(req.decoded.email === obj.email || req.decoded.admin){
            res.send(user);
        }else{
            res.status(401);
            res.send('You are not authorized')
        }
    }).catch(()=>{
        res.status(404);
        res.send('not found')
    })
});

/**
 * @swagger
 * /users/user/{email}/:
 *  delete:
 *      tags:
 *      - user
 *      summary: delete user
 *      description: delete user
 *      parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *      - in: path
 *        name: email
 *        schema:
 *      responses:
 *          201:
 *              description: ok
 */
userRouter.delete('/user/:email/', validateToken, (req, res)=>{
    let email =  req.params.email;
    if(req.decoded.admin || req.decoded.email === email){
        userController.deleteUser(email).then(response => {
            res.send(response)
        })
    }else{
        res.status(401);
        res.send('You are not authorized');
    }
});

/**
 * @swagger
 * /users/user/{email}/:
 *  put:
 *      tags:
 *      - user
 *      summary: update user
 *      description: update user
 *      parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *      - in: path
 *        name: email
 *        schema:
 *      - in: body
 *        name: user
 *        schema:
 *           $ref: '#/definitions/User'
 *      responses:
 *          201:
 *              description: ok
 */
userRouter.put('/user/:email/', validateToken, (req, res)=>{
    let email =  req.params.email;
    if(req.decoded.admin || req.decoded.email === email){
        userController.updateUser(email, req.body).then(response => {
            res.send(response)
        })
    }else{
        res.status(401);
        res.send('You are not authorized');
    }
});

export default userRouter;