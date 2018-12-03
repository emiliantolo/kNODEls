var TaskModel = require('./../models/taskModel.js')

module.exports.getTasks = function (req,res){

    if(Object.keys(req.query).length !== 0){
	var offset=req.query.offset;
	var limit=req.query.limit;
    }
    else{
	var offset=0;
	var limit=10;
    }
    
    if(limit>=0 && offset>=0){

	TaskModel
	    .find({})
	    .skip(offset)
	    .limit(limit)
	    .exec()
	    .then(doc => {
		console.log(doc)

		if(doc.length==0 && limit>0){
		    //not found
		    res.status(404).send({error: "404"})
		}
		else{
		    //ok
		    //da mandare [offset...offset+limit]
		    res.contentType('application/json')	    
		    res.status(200)
		    res.json(doc)
		}

	    })
	    .catch(err => {
		console.error(err)
	    })
		
		}
    else{
	//bad request
	res.status(400).send({error: "400"})
    }
    
};

module.exports.getTask = function (req,res){
    
    let taskid=req.params.TaskId;
    console.log(taskid)
    
    TaskModel
	.findOne({_id: taskid})
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
	})
	    
	    };

module.exports.createTask= function (req,res){

    let question=req.body.Question;
    let taskType=req.body.TaskType;
    let taskFile=req.body.TaskFile;

    if(question!==undefined && taskType!==undefined && taskFile!==undefined){	
	//data accepted
	console.log("okokok");
	let options=req.body.Options;
	let answers=req.body.Answers;

	let task = new TaskModel({	    
	    Question: question,
	    TaskType: taskType,
	    TaskFile: taskFile,
	    Options: options===undefined ? [] : options,
	    Answers: answers===undefined ? [] : answers
	})
	
	task.save()
	    .then(doc => {
		console.log(doc)
	    })
	    .catch(err => {
		console.error(err)
	    })
		
		res.status(201).send({error: "201"})
    }
    else{
	//data invalid
	res.status(400).send({error: "400"})
    }
};

module.exports.updateTask= function (req,res){

    let taskid=req.params.TaskId;
    console.log(taskid)
    
    TaskModel
	.findOne({_id: taskid})
	.then(doc => {
	    console.log(doc)

	    if(doc===null){
		//not found
		res.status(404).send({error: "404"})
	    }
	    else{
		//ok

		let question=req.body.Question;
		let taskType=req.body.TaskType;
		let taskFile=req.body.TaskFile;
		let options=req.body.Options;
		let answers=req.body.Answers;
		
		let update={};

		if(question!==undefined){update.Question=question}
		if(taskType!==undefined){update.TaskType=taskType}
		if(taskFile!==undefined){update.TaskFile=taskFile}
		if(options!==undefined){update.Options=options}
		if(answers!==undefined){update.Answers=answers}
		
		
		TaskModel
		    .findOneAndUpdate({_id: taskid},
				      update,
				      {new: true})
		    .then(doc => {
			console.log(doc)
			res.contentType('application/json')
			res.status(200)
			res.json(doc)
		    })
		    .catch(err => {
			console.error(err)
		    })
			}

	})
	.catch(err => {
	    console.error(err)
	    //bad request
	    res.status(400).send({error: "400"})
	})

	    };

module.exports.deleteTask= function (req,res){

    let taskid=req.params.TaskId;
    console.log(taskid)

    TaskModel
	.findOne({_id: taskid})
	.then(doc => {
	    console.log(doc)

	    if(doc===null){
		//not found
		res.status(404).send({error: "404"})
	    }
	    else{
		//ok

		TaskModel
		    .findOneAndRemove({_id: taskid})
		    .then(doc => {
			console.log(doc)
			res.contentType('application/json')
			res.status(200)
			res.json(doc)
		    })
		    .catch(err => {
			console.error(err)
		    })
			}
	})
	.catch(err => {
	    console.error(err)
	    //bad request
	    res.status(400).send({error: "400"})
	})
	    
	    };
