'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _swagger = require('../services/swagger.service');

var _swagger2 = _interopRequireDefault(_swagger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var swagger = new _swagger2.default();

router.get('/json', function (req, res) {
    res.send(swagger.swaggerSpec);
});

exports.default = router;