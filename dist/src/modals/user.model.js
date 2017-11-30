'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _databaseConnection = require('../database/databaseConnection');

var _databaseConnection2 = _interopRequireDefault(_databaseConnection);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserModel = function () {
    function UserModel() {
        _classCallCheck(this, UserModel);

        this.sequalize = _databaseConnection2.default.getSequalize();
        this.defineModel();
        this.user.findAll().then(function (users) {
            console.log(users[0].dataValues);
        });
    }

    _createClass(UserModel, [{
        key: 'defineModel',
        value: function defineModel() {

            this.user = this.sequalize.define('user', {
                firstName: {
                    type: _sequelize2.default.STRING
                },
                lastName: {
                    type: _sequelize2.default.STRING
                }
            });

            // force: true will drop the table if it already exists
            // this.user.sync({force: true}).then(() => {
            //     // Table created
            //     return  this.user.create({
            //         firstName: 'John',
            //         lastName: 'Hancockadsf'
            //     });
            // });
        }
        // defineSchema(){
        //     this.userSchema = new this.Schema({
        //             name: String,
        //             lastName: String,
        //             email: { type: String, unique: true},
        //             password: String
        //         }
        //     )
        // }
        // getModel(){
        //     return this.userModel;
        // }

    }]);

    return UserModel;
}();

var userModel = new UserModel();
exports.default = userModel;