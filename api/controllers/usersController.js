'use strict';
const mongo =  require('mongodb');
const MongoClient = mongo.MongoClient;
const url = 'mongodb+srv://simone:knodels97@knodels-crpnx.mongodb.net/test?retryWrites=true/knodels'; 
const dbConnect = MongoClient.connect(url); // the connection happens only on dbConnect use
const DB_NAME = 'knodels';
const COL_NAME = 'Users';

exports.createUser = function (req,res){
	let reqArray= [];
	if( !req.body ) res.status(400).json({err:'Bad Request, no data inserted'});	
	else{
		if(  req.body instanceof Array){ 
			reqArray= req.body;
		}
		else{
			reqArray.push(req.body);
		}
		for ( let data of reqArray){
				if( !data.name || typeof data.name != 'string' ) {
						res.status(400).json({err:'Bad Request, name must be a string'}); 
						return
				}
				if( !data.surname  || typeof data.surname != 'string' ){
						res.status(400).json({err:'Bad Request, surname must be a string'}); 
						return
				}

				if( !data.email || typeof data.email != 'string' || data.email.indexOf('@')<0 ){
						res.status(400).json({err:'Bad Request, email must be a string and contain a valid adress'}); 
						return
				}
		} 
		dbConnect
			.then(
				client => {
					return client.db(DB_NAME).collection(COL_NAME)
				}	
			)
			.catch(
				err => {
						console.log(err + 'connection failed');  
						return;
					}
			)
			.then(
				userCollection => {
					return userCollection.insertMany(reqArray);
				}
			)
			.then(	
				result =>{ 
					res.status(201).send(result.insertedIds); // if all goes ok send ids 
					console.log('----->insertion ended');
					return
				}
			)
			.catch((err) => {console.log(err);})

	}
}

exports.getUsers= function (req,res){ 
	dbConnect
	.then( // now the connection is established, NB it's async
		client => {
			return client.db(DB_NAME).collection(COL_NAME)
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
	.catch( err => { console.log(err); }) //error catcher 
};
exports.getUserByUserId = function (req,res){
	let idReq = req.params.UserId;

	if(idReq == '0' || idReq.length != 24 ){
		//console.log('value: ' + idReq + ', length: ' + idReq.length);
		res.status(400).json({ error: "Bad Request"});
	}
	else{	
		dbConnect
		.then(
			client => {
				return client.db(DB_NAME).collection(COL_NAME)
			}
		)
		.then(
			userCollection => {
				return userCollection.findOne({_id: new mongo.ObjectID(idReq)}) 
			}
		)
		.then(
			queryData => {
				if(queryData == null){
					res.status(404).json({error: "Data not found"});
				}
				else{
					res.status(200).json(queryData);
				}
			}
		)
		.catch( err => { console.log(err); })
	}
}
