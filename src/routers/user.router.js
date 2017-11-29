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
 *          name:
 *              type: string
 *          lastName:
 *              type: string
 *          password:
 *              type: string
 *          email:
 *              type: email
 *
 */



let userRouter = express.Router();

userRouter.post('/', (req, res)=>{
    userController.addUser(req.body).then((response)=>{
        res.status(201);
        res.send(response);
    }).catch((err)=>{
        res.status(409);
        res.send(err);
    });
});

userRouter.get('/:email/:password', (req,res)=>{
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

userRouter.get('/all', (req, res)=>{
    userController.getAll().then((users)=>{
        res.send(users);
    });
   // console.log("it should return user");
});



export default userRouter;