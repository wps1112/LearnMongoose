/**
 * Created by He on 2015/11/13.
 */
var mongoose=require('mongoose');

var _userSchema=new mongoose.Schema({
    email: String,
    password: String
});


exports.User=mongoose.model('User',_userSchema);