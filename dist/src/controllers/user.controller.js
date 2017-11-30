'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('../modals/user.model');

var _user2 = _interopRequireDefault(_user);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function UserController() {
    _classCallCheck(this, UserController);
}
// this.userModel = userModel.getModel();


// getAll(){
//     return this.userModel.find();
// }
//
// addUser(user){
//     return this.hashPassword(user.password).then((hashed)=>{
//         user.password = hashed;
//         let userObj = new this.userModel(user);
//         return userObj.save();
//     });
// }
// getUser(user){
//     return new Promise((resolve, reject)=>{
//         this.userModel.findOne({ 'email': user.email }).then((userDb)=>{
//             if(userDb){
//                 this.comparePassword(user.password, userDb.password).then((res)=>{
//                     if(res){
//                         resolve(userDb);
//                     }else {
//                         reject(res);
//                     }
//                 });
//             }else{
//                 reject();
//             }
//
//         })
//     });
//
// }
//
//  hashPassword(password){
//      return bcrypt.hash(password, 5);
//  }
//  comparePassword(plainPassword, hash){
//      return bcrypt.compare(plainPassword, hash);
//  }


;

var userController = new UserController();
exports.default = userController;