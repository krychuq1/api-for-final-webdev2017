'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../controllers/user.controller');

var _user2 = _interopRequireDefault(_user);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 *
 */

var userRouter = _express2.default.Router();

userRouter.post('/', function (req, res) {
    _user2.default.addUser(req.body).then(function (response) {
        res.status(201);
        res.send(response);
    }).catch(function (err) {
        res.status(409);
        res.send(err);
    });
});

userRouter.get('/:email/:password', function (req, res) {
    var obj = {
        email: req.params.email,
        password: req.params.password
    };
    _user2.default.getUser(obj).then(function (user) {
        res.send(user);
    }).catch(function () {
        res.status(404);
        res.send('not found');
    });
});

userRouter.get('/all', function (req, res) {
    _user2.default.getAll().then(function (users) {
        res.send(users);
    });
    console.log("it should return user");
});

exports.default = userRouter;