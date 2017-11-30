'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _swagger = require('./services/swagger.service');

var _swagger2 = _interopRequireDefault(_swagger);

var _index = require('./routers/index.routing');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 7777;
var swagger = new _swagger2.default();

app.use(_bodyParser2.default.json()); // to support JSON-encoded bodies
app.use(_bodyParser2.default.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use('/user', _index.userRouter);
// Swagger
app.use('/api-docs', swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.swaggerSpec));
app.use('/swagger', _index.SwaggerRoute);

app.listen(port);
console.log('todo list RESTful API server started on: ' + port);