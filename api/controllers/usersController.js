'use strict'; 
const mongo =  require('mongodb');
const MongoClient = mongo.MongoClient;
const url = 'mongodb+srv://simone:knodels97@knodels-crpnx.mongodb.net/knodels?retryWrites=true'; 
const dbConnect = MongoClient.connect(url); // the connection happens only on dbConnect use
const DB_NAME = 'knodels';
const COL_NAME = 'users';
exports.deleteUserByUserId = function (req,res){
	// no need to check if UserId is inserted because otherwise this call can not be executed
	let idReq = req.params.UserId;
	if(	idReq == '0' || idReq.length != 24 ) {
		res.status(400).json({error: 'Bad Request, invalid id'}); 
		return
	}
	dbConnect
		.then(
			client => {
				return client.db(DB_NAME).collection(COL_NAME)
			}
		)
		.then(
			userCollection => {
				return userCollection.deleteOne({_id: new mongo.ObjectID(idReq)})
			}
		)
		.then( 
			result => {
				if(result.result.n == 0) res.status(404).send({err:'Data not found'});
				else res.status(200).send('Ok');
			}	
		) 
		.catch( err => { console.log(err); })
}
exports.updateUserByUserId = function (req,res){
	let data = req.body;
	let idReq = req.params.UserId;
	// no need to check if UserId is inserted because otherwise this call can not be executed
	if(	idReq == '0' || idReq.length != 24 ) {
		res.status(400).json({error: 'Bad Request, invalid id'}); 
		return
	}
	if( !(data.name != undefined || data.surname != undefined || data.email != undefined)){ // at least one of the update info must be present
		res.status(400).json({error:'Bad Request, at least one data (name,surname,email) must be inserted'}); 
		return
	}
	if( (data.name != undefined) && (typeof data.name != 'string' || data.name.trim() == 0) ) { // if name exists and its not a strind
		res.status(400).json({error:'Bad Request, name must be a non void string'}); 
		return
	}
	if( (data.surname != undefined)  && (typeof data.surname != 'string' || data.surname.trim() == 0) ){ // if surname exists it must be a string
		res.status(400).json({error:'Bad Request, surname must be a non void string'}); 
		return
	}
	if( (data.email != undefined) && (typeof data.email != 'string' || data.email.indexOf('@')<0 || data.email.trim() == 0) ){ // if email exists it must be a string
		res.status(400).json({error:'Bad Request, email must be a non void string and contain a valid adress'}); 
		return
	}
	dbConnect
		.then(
			client => {
				return client.db(DB_NAME).collection(COL_NAME)
			}
		)
		.then(
			userCollection => {
				let updatedUser = {};
				if(data.name != undefined) updatedUser.name = data.name.trim();
				if(data.surname != undefined) updatedUser.surname = data.surname.trim(); 
				if(data.email != undefined) updatedUser.email= data.email.trim().toLowerCase(); 
				return userCollection.updateOne({_id: new mongo.ObjectID(idReq)}, {$set: updatedUser})
			}
		)
		.then( 
			result => {
				if(result.result.n == 0 && result.result.nModified == 0) res.status(404).json({error: 'Data not found'});
				else if(result.result.n ==1 && result.result.nModified == 0) res.status(400).json({error: 'Bad request, nothing to update'});
				else res.status(200).send('Ok');
			}	
		) 
		.catch( err => { console.log(err); })
};
exports.createUsers = function (req,res){
	let reqArray= [];
	let sentArray= [];
	if( !req.body ) res.status(400).json({error:'Bad Request, no data inserted'});	
	else{
		if(  req.body instanceof Array){ 
			reqArray= req.body;
		}
		else{
			reqArray.push(req.body);
		}
		for ( let data of reqArray){
				if( data.name == undefined || typeof data.name != 'string' || data.name.trim() == 0 ) {
						res.status(400).json({error:'Bad Request, name must be a non void string'}); 
						return
				}
				if( data.surname == undefined || typeof data.surname != 'string' || data.surname.trim() == 0 ){
						res.status(400).json({error:'Bad Request, surname must be a non void string'}); 
						return
				}

				if( data.email == undefined || typeof data.email != 'string' || data.email.indexOf('@')<0 || data.email.trim() == 0 ){
						res.status(400).json({error:'Bad Request, email must be a non void string and contain a valid adress'}); 
						return
				}
		}// if all test do not interrupt then create the array to send to the db 
		for(let data of reqArray) sentArray.push({name:data.name.trim(), surname:data.surname.trim(), email:data.email.trim().toLowerCase()});
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
					return userCollection.insertMany(sentArray);
				}
			)
			.then(	
				result =>{ 
					res.status(201).send(result.insertedIds); // if all goes ok send ids 
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
				"name": item.Name,
				"nurname": item.Surname,
				"email": item.Email
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
					return
				}
				else{
					res.status(200).json(queryData);
					return
				}
			}
		)
		.catch( err => { console.log(err); })
	}
}
