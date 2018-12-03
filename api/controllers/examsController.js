'use strict'

// GET /v1/exams?offset=*&limit=*
module.exports.getExams = function (req,res){
	var offset;
	var limit;


	if((Object.keys(req.query).length >= 0) && (Object.keys(req.query).length <= 2)){
		
		if(Object.keys(req.query).length !== 0){
			offset=req.query.offset;
		    	limit=req.query.limit;
		    	
		    	if(offset<0){
		    		return res.status(400).send({error: "400 Bad Request, invalid parameter"});
		    	}
		    	if(limit<0){
		    		return res.status(400).send({error: "400 Bad Request, invalid parameter"});
		    	}
		    	
		    	if(offset == null){
		    		offset=0;
		    	}
		    	if(limit == null){
		    		limit=10;
		    	}
		}
		else{
			offset=0;
		    	limit=10;
		}
				
		var examsdata = require('./../objects/exams.json')
	
		res.set('Content-Type', 'application/json');
		res.status(200)
		
		var resArray = new Array();
		
		for(var i=offset; i<(offset-(-limit)); i++){
			resArray.push(examsdata[i]);
		}
		
		res.send(resArray);
	    	
	}
	else{
		//wrong parameters number
		res.status(400).send({error: "400 Bad Request, wrong number of parameters"})
	}

    };


// POST /v1/exams
/*module.exports.createExam= function (req,res){
	
	var Name=req.body.Name;
	var Description=req.body.Description;
	var Deadline=req.body.Deadline;
	var WorkGroups=req.body.WorkGroups;
	var Tasks=req.body.Tasks;
	
	
	
};*/






























