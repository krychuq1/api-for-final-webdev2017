'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _swaggerJsdoc = require('swagger-jsdoc');

var _swaggerJsdoc2 = _interopRequireDefault(_swaggerJsdoc);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Swagger = function () {
    function Swagger() {
        _classCallCheck(this, Swagger);

        // swagger options
        this.options = _config2.default;
        this.swaggerUi = _swaggerUiExpress2.default;
        this.init();
    }
    /**
     * Initialize method
     */


    _createClass(Swagger, [{
        key: 'init',
        value: function init() {
            this.swaggerSpec = (0, _swaggerJsdoc2.default)(this.options);
        }
    }]);

    return Swagger;
}();

exports.default = Swagger;