'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DbConnection = function () {
    function DbConnection() {
        _classCallCheck(this, DbConnection);

        this.sequelize = new _sequelize2.default('keafinal', 'root', '', {
            host: 'localhost',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            operatorsAliases: false
        });

        this.sequelize.authenticate().then(function () {
            console.log('Connection has been established successfully.');
        }).catch(function (err) {
            console.error('Unable to connect to the database:', err);
        });
    }

    _createClass(DbConnection, [{
        key: 'getSequalize',
        value: function getSequalize() {
            return this.sequelize;
        }
    }]);

    return DbConnection;
}();

var db = new DbConnection();
exports.default = db;