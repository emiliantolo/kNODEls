const myUrl=require("url");
const mongo =  require('mongodb');
const MongoClient = mongo.MongoClient;
const url = 'mongodb+srv://johnny:knodels97@knodels-crpnx.mongodb.net/knodels?retryWrites=true';
const dbConnect = MongoClient.connect(url,{useNewUrlParser: true});
const DB_NAME = 'knodels';
const COL_NAME = 'submissions';

function isHex(input){
    regexp = /^[0-9a-fA-F]+$/;
    return regexp.test(input);
}

function isSubmissionWellDefined(data){
    result=true;
    if( !data.Exam || !isHex(data.Exam)) {
		result=false;
	}
	if( !data.Workgroup  || !Array.isArray(data.Workgroup) || data.Workgroup.some(isNaN)){
		result=false;
	}

	if( !data.Answers || !Array.isArray(data.Answers)){
		result=false;
	}
	return result;
}

exports.getSubmissions = function (req,res){
        
        dbConnect
	    .then(
		    client => {
			    return client.db(DB_NAME)
		    }
	    )
		.then(
			db => {
				return db.collection(COL_NAME)
			}
		)
	    .then(
		    submissionCollection => {
			    return submissionCollection.find({})
		    }
	    )
		.then(
			foundData =>{
				return foundData.toArray()	
			}
		)
	    .then(
		    submissionData => {
				res.status=(submissionData.length>0)?200:404;
				res.send(submissionData);
			}
	    )
	    .catch( err => {throw err; //console.log(err);
				 })
    
};

exports.setSubmissions = function (req,res){
    let reqArray= [];
	if( !req.body ) res.status(400).json({err:'Bad Request, no data inserted'});	
	else{
		if(  req.body instanceof Array){ 
			reqArray= req.body;
		}
		else{
			reqArray.push(req.body);
		}
		for (let data of reqArray){
		    if(!isSubmissionWellDefined(data)){
		        res.status(400).json({err:'Bad Request, data are not properly defined'}); 
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
				submissionCollection => {
					return submissionCollection.insertMany(reqArray);
				}
			)
			.then(	
				result =>{ 
					res.status(201).send(result.insertedIds);
					console.log('----->insertion ended');
					return
				}
			)
			.catch((err) => {console.log(err);})

	}
};

exports.getSubmissionById = function (req,res){

    var id=req.params.SubmissionId;
    
    if(!isHex(id) || id.length != 24 ){
        res.status(400).json({ error: "Bad Request, the id is not an hexadecimal number long 24 digits"});
        return;
    }
    dbConnect
		.then(
			client => {
				return client.db(DB_NAME).collection(COL_NAME)
			}
		)
		.then(
			submissionCollection => {
				return submissionCollection.findOne({_id: new mongo.ObjectID(id)}) 
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
};
exports.modifySubmission = function (req,res){

    var id=req.params.SubmissionId;
    
    if(!isHex(id) || id.length != 24 ){
        res.status(400).json({ error: "Bad Request, the id is not an hexadecimal number long 24 digits"});
        return;
    }
    
    let data=req.body;
	if(!isSubmissionWellDefined(data)){
	    res.status(400).json({err:'Bad Request, data are not properly defined'});
	    return;
	}
	
    var ObjectID = require('mongodb').ObjectID;
    
    dbConnect
		.then(
			client => {
				return client.db(DB_NAME).collection(COL_NAME)
			}
		)
		.then(
			submissionCollection => {
			    let query = { "_id": ObjectID(id)};
				return submissionCollection.updateOne(query,{$set : data });
			}
		)
		.then(
			queryResult => {
				if(queryResult.matchedCount == 1){
					res.status(204).send();
				}
				else{
					res.status(404).json({error: "Data not found"});
				}
			}
		)
		.catch( err => { console.log(err); })
}; 

exports.deleteSubmission = function (req,res){

    var id=req.params.SubmissionId;
    
    if(!isHex(id) || id.length != 24 ){
        res.status(400).json({ error: "Bad Request, the id is not an hexadecimal number long 24 digits"});
        return;
    }
    
    var ObjectID = require('mongodb').ObjectID;
    
    dbConnect
		.then(
			client => {
				return client.db(DB_NAME).collection(COL_NAME)
			}
		)
		.then(
			submissionCollection => {
			    let query = { "_id": ObjectID(id)};
				return submissionCollection.deleteOne(query);
			}
		)
		.then(
			queryResult => {
				if(queryResult.deletedCount == 1){
					res.status(204).send();
				}
				else{
					res.status(404).json({error: "Data not found"});
				}
			}
		)
		.catch( err => { console.log(err); })
};





















