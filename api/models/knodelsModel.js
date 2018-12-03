'use strict'; 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema= new Schema({
	Name: String ,
	Surname: String ,
	Email: String 
});
module.exports = mongose.model('Users',UserSchema);
