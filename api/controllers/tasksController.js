var TaskModel = require('./../models/taskModel.js')

module.exports.getTasks = function (req,res){

    var offset=req.query.offset
    var limit=req.query.limit
    
    let ok=true
    
    if(offset===undefined){
	offset=0
    }
    
    if(limit===undefined){
	limit=10
    }    

    offset=parseInt(offset)
    limit=parseInt(limit)
    
    ok=ok &&
	typeof(offset)==='number' &&
	typeof(limit)==='number'

    if(ok){
	ok=ok && offset>=0 && limit>0
    }
    
    console.log(offset+" "+limit)
    
    if(ok){
	TaskModel
	    .find({})
	    .skip(offset)
	    .limit(limit)
	    .exec()
	    .then(doc => {
		console.log(doc)

		if(doc.length==0){
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
    let options=req.body.Options;
    let answers=req.body.Answers;


    
    let ok=question && taskType && taskFile
    ok=ok &&
	typeof(question)==='string' &&
	typeof(taskType)==='string' &&
	typeof(taskFile)==='string'
    
    ok=ok &&
	(!options || Array.isArray(options)) &&
	(!answers || Array.isArray(answers))
    
    if(ok){	
	//data accepted
	console.log("okokok");

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
		res.contentType('application/json')
		res.status(201)
		res.send(doc)

	    })
	    .catch(err => {
		console.error(err)
	    })

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

		let ok=true;

		ok= ok && (question===undefined || typeof(question)==='string')
		ok= ok && (taskType===undefined || typeof(taskType)==='string')
		ok= ok && (taskFile===undefined || typeof(taskFile)==='string')
		ok= ok && (options===undefined || Array.isArray(options))
		ok= ok && (answers===undefined || Array.isArray(answers))

		if(ok){
		    
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
		else{
		    console.error(err)
		    //bad request
		    res.status(400).send({error: "400"})		    
		}
		
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
