module.exports.getTasks = function (req,res){

    if(Object.keys(req.query).length !== 0){
	    var offset=req.query.offset;
	    var limit=req.query.limit;
	}
	else{
	    var offset=0;
	    var limit=10;
	}
		var tasksdata = require('./../objects/tasks.json')
	
	try{
	    if(limit>=0 && offset>=0){
		//ok
		res.contentType('application/json')	    
		res.status(200)
		//da mandare [offset...offset+limit]
		var tasksdata = require('./../objects/tasks.json')
		res.json(tasksdata)
	    }
	    else{
		//bad request
		res.status(400).send({error: "400"})
	    }
	}catch(error){
	    //data not found
	    res.status(404).send({error: "404"})
	}
    };

module.exports.createTask= function (req,res){
	var AbsoluteDateDeadline=req.body.AbsoluteDateDeadline;
	var RelativeDeadline=req.body.RelativeDeadline;
	var TaskType=req.body.TaskType;
	var TaskFile=req.body.TaskFile;
	
	if(true){	
	    //data accepted
	    res.status(201).send({error: "201"})
	}
	else{
	    //data invalid
	    res.status(400).send({error: "400"})
	}
    };
