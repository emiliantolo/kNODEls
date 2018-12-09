'use strict'

var ExamModel = require('./../models/examModel.js')


// GET /v1/exams?offset=*&limit=*
module.exports.getExams = function (req,res){
	var offset;
	var limit;

	if((Object.keys(req.query).length >= 0) && (Object.keys(req.query).length <= 2)){
		
		if(Object.keys(req.query).length !== 0){
			offset=req.query.offset;
		    	limit=req.query.limit;
			
			if(offset == undefined){
		    		offset=0;
		    	}
		    	if(limit == undefined){
		    		limit=10;
		    	}
			
			offset=parseInt(offset);
		    	limit=parseInt(limit);
		    	
		    	
		    	if(offset<0 || (offset != req.query.offset && req.query.offset != undefined) || limit<0 || (limit != req.query.limit && req.query.limit != undefined)){
		    		return res.status(400).send({error: "400 Bad Request, invalid parameter"});
		    	}
		    	
		}
		else{
			offset=0;
		    	limit=10;
		}
		
		
		if(limit === 0){
			res.set('Content-Type', 'application/json');
			res.status(200).send([])
		}else{		
			ExamModel
			    .find()
			    .skip(offset)
			    .limit(limit)
			    .exec()
			    .then(result => {
				//console.log(result)

				res.set('Content-Type', 'application/json');
				res.status(200).send(result);

			    })
			    .catch(err => {
				//console.error(err)
				res.status(400).send({error: "400 Bad Request, wrong parameter"})
			    })
		}
	}
	else{
		//wrong parameters number
		res.status(400).send({error: "400 Bad Request, wrong number of parameters"})
	}

}



// POST /v1/exams
module.exports.createExam= function (req,res){
	
	let name=req.body.Name;
	let description=req.body.Description;
	let deadline=req.body.Deadline;
	let workGroups=req.body.WorkGroups;
	let tasks=req.body.Tasks;
	
	
	if(name!==undefined && description!==undefined && deadline!==undefined && tasks!==undefined && name!=="" && description!=="" && deadline!=="" && tasks.length!==0){
		
		
		if(typeof(name)==="string" && typeof(description)==="string" && typeof(deadline)==="number" && (Array.isArray(workGroups) || workGroups===undefined) && Array.isArray(tasks)){
			let exam = new ExamModel({	    
			    Name: name,
			    Description: description,
			    Deadline: deadline,
			    WorkGroups: workGroups===undefined ? [] : workGroups,
			    Tasks: tasks
			})
		
			exam.save()
		    	.then(result => {
				//console.log(result);
				res.set('Content-Type', 'application/json');
				res.status(201).send({id: result._id})
		    	})
		    	.catch(err => {
				//console.error(err)
				res.status(400).send({error: "400 Bad Request, wrong parameter"})
			})
		}
		else{
			res.status(400).send({error: "400 Bad Request, some body parameters have incorrect type"})
		}
		
	}
	else{
		res.status(400).send({error: "400 Bad Request, some body parameters are incorrect"})
	}
}



// GET /v1/exams/:ExamId
module.exports.getExamByExamId= function (req,res){

	let examId = req.params.ExamId;
	
	ExamModel
	.findOne({_id: examId})
	.then(result => {

	    if(result===null){
		//not found
		res.status(404).send({error: "404 Not Found"})
	    }
	    else{
		//found
		res.set('Content-Type', 'application/json');	    
		res.status(200).json(result)
	    }
	})
	.catch(err => {
	    //console.error(err)
	    //bad request
	    res.status(400).send({error: "400 Bad Request, wrong parameter"})
	})
	
}


// PUT /v1/exams/:ExamId
module.exports.updateExamByExamId= function (req,res){
	let examId = req.params.ExamId;
	
	if(examId === undefined){
		res.status(400).send({error: "400 Bad Request, wrong parameter"})
	}
	else{
		
		ExamModel
		.findOne({_id: examId})
		.then(result => {
		    //console.log(result)

		    if(result===null){
			//not found
			res.status(404).send({error: "404 Not Found"})
		    }
		    else{
			//found
			let controlTypes = true;

			let name=req.body.Name;
			let description=req.body.Description;
			let deadline=req.body.Deadline;
			let workGroups=req.body.WorkGroups;
			let tasks=req.body.Tasks;
			
			if(name!=="" && description!=="" && deadline!=="" && tasks.length!==0){
				let update={};		
		
				if(name !== undefined){
					if(typeof(name)!=="string"){
						controlTypes=false;
					}
					update.Name = name;
				}
				if(description !== undefined){
					if(typeof(description)!=="string"){
						controlTypes=false;
					}
					update.Description = description;
				}
				if(deadline !== undefined){
					if(typeof(deadline)!=="number"){
						controlTypes=false;
					}
					update.Deadline = deadline;
				}
				if(workGroups !== undefined){
					if(!Array.isArray(workGroups)){
						controlTypes=false;
					}
					update.WorkGroups = workGroups;
				}
				if(tasks !== undefined){
					if(!Array.isArray(tasks)){
						controlTypes=false;
					}
					update.Tasks = tasks;
				}
			
				if(controlTypes){
				ExamModel
				    .findOneAndUpdate({_id: examId},
						      update,
						      {new: true})
				    .then(result => {
					//console.log(result)
					res.set('Content-Type', 'application/json');
					res.status(200).json(result)
				    })
				    .catch(err => {
					//console.error(err)
					res.status(400).send({error: "400 Bad Request, wrong parameter"})
				    })
				}
				else{
					res.status(400).send({error: "400 Bad Request, some body parameters have incorrect type"});
				}
			}
			else{
				res.status(400).send({error: "400 Bad Request, some body parameters are incorrect(can not be empty)"});
			}
		    }

		})
		.catch(err => {
		    //console.error(err)
		    //bad request
		    res.status(400).send({error: "400 Bad Request, wrong parameter"})
		})
	}
}


// DELETE /v1/exams/:ExamId
module.exports.deleteExamByExamId= function (req,res){
	let examId = req.params.ExamId;
	
	/*if(examId === undefined){
		res.status(400).send({error: "400 Bad Request"})
	}
	else{*/
		ExamModel
		.findOne({_id: examId})
		.then(result => {
		    //console.log(result)

		    if(result===null){
			//not found
			res.status(404).send({error: "404 Not Found"})
		    }
		    else{
			//found

			ExamModel
			    .findOneAndDelete({_id: examId})
			    .then(result => {
				//console.log(result)
				res.set('Content-Type', 'application/json');
				res.status(200).json(result)
			    })
			    .catch(err => {
				//console.error(err)
				res.status(400).send({error: "400 Bad Request, wrong parameter"})
			    })
				}
		})
		.catch(err => {
		    //console.error(err)
		    //bad request
		    res.status(400).send({error: "400 Bad Request, wrong parameter"})
		})
	//}
}
