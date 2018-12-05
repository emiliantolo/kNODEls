'use strict';
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://simone:knodels97@knodels-crpnx.mongodb.net/test?retryWrites=true/knodels'; 
const dbConnect = MongoClient.connect(url); // the connection happens only on dbConnect use
exports.getUsers= function (req,res){ 
	dbConnect
	.then( // now the connection is established, NB it's async
		client => {
			return client.db('knodels').collection('Users')
		}
	)
	.then(
		userCollection => {
			return userCollection.find({}).toArray();
		}
	)
	.then(
		userData => {
			userData.forEach( (item,index)  => {
				userData[index]={
				"userId": item._id,
				"Name": item.Name,
				"Surname": item.Surname,
				"Email": item.Email
				}	
			})
			res.status(200).json(userData); // send data
		}
	)
	.catch( err => { throw err; }) // connection not established
};
exports.getUserById = function (req,res){
};
