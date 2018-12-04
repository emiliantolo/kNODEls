'use strict'

//var ExamModel = require('./../models/examModel.js')

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
module.exports.createExam= function (req,res){
	
	var name=req.body.Name;
	var description=req.body.Description;
	var deadline=req.body.Deadline;
	var workGroups=req.body.WorkGroups;
	var tasks=req.body.Tasks;
	
	if(name!==undefined && description!==undefined && deadline!==undefined && tasks!==undefined){
		
		/*let exam = new ExamModel({	    
		    Name: name,
		    Description: description,
		    Deadline: deadline,
		    WorkGroups: workGroups===undefined ? [] : workGroups,
		    Tasks: tasks
		})
		
		exam.save()
	    	.then(doc => {
			console.log(doc);
	    	})
	    	.catch(err => {
			console.error(err)
		})*/
		
		
		var examsdata = require('./../objects/exams.json')
		
		var newExam = {
			"ExamId": examsdata.length,
			"Name": name,
			"Description": description,
			"Deadline": deadline,
			"WorkGroups": workGroups===undefined ? [] : workGroups,
			"Tasks": tasks
		};
		
		examsdata.push(newExam);
		
		res.status(201).send({error: "201"})
		
	}
	else{
		res.status(400).send({error: "400"})
	}
};



// GET /v1/exams/:ExamId
module.exports.getExamByExamId= function (req,res){

	let examId = req.params.ExamId;
	
	/*ExamModel
	.findOne({_id: examId})
	.then(doc => {
	    console.log(doc)

	    if(doc===null){
		//not found
		res.status(404).send({error: "404"})
	    }
	    else{
		//ok
		res.contentType('application/json')	    
		res.status(200)
		res.json(doc)
	    }
	})
	.catch(err => {
	    console.error(err)
	    //bad request
	    res.status(400).send({error: "400"})
	})*/
	
	
	if(examId === undefined || Number(examId) != examId){
		res.status(400).send({error: "400"})
	}
	else{
		var examsdata = require('./../objects/exams.json')
	
		res.set('Content-Type', 'application/json');
	
		if(examsdata[examId]==null){
			res.status(404).send({error: "404"})
		}
		else{
			res.set('Content-Type', 'application/json');
			res.status(200).send(examsdata[examId])
		}
	}
	
	
};


// PUT /v1/exams/:ExamId
module.exports.updateExamByExamId= function (req,res){
	let examId = req.params.ExamId;
	
	if(examId === undefined || Number(examId) != examId){
		res.status(400).send({error: "400"})
	}
	else{
		var examsdata = require('./../objects/exams.json')
	
	
		if(examsdata[examId]==null){
			res.status(404).send({error: "404"})
		}
		else{
			
			let name=req.body.Name;
			
			let description=req.body.Description;
			let deadline=req.body.Deadline;
			let workGroups=req.body.WorkGroups;
			let tasks=req.body.Tasks;
			
			if(name !== undefined){
				examsdata[examId].Name = name;
			}
			if(description !== undefined){
				examsdata[examId].Description = description;
			}
			if(deadline !== undefined){
				examsdata[examId].Deadline = deadline;
			}
			if(workGroups !== undefined){
				examsdata[examId].WorkGroups = workGroups;
			}
			if(tasks !== undefined){
				examsdata[examId].Tasks = tasks;
			}
			
			res.set('Content-Type', 'application/json');
			res.status(200).send(examsdata[examId]);
			
		}
	}
};


// DELETE /v1/exams/:ExamId
module.exports.deleteExamByExamId= function (req,res){
	let examId = req.params.ExamId;
	
	if(examId === undefined || Number(examId) != examId){
		res.status(400).send({error: "400"})
	}
	else{
		var examsdata = require('./../objects/exams.json')
	
	
		if(examsdata[examId]==null){
			res.status(404).send({error: "404"})
		}
		else{
			
			var examsdata = require('./../objects/exams.json')
			
			examsdata[examId] = null;
			
			res.set('Content-Type', 'application/json');
			res.status(200).send({error: "200"})
			
		}
	}
};





















