'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SwaggerRoute = exports.userRouter = undefined;

var _user = require('./user.router');

var _user2 = _interopRequireDefault(_user);

var _swagger = require('./swagger.routers');

var _swagger2 = _interopRequireDefault(_swagger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.userRouter = _user2.default;
exports.SwaggerRoute = _swagger2.default;