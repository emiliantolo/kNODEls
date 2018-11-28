const express=require('express');
const bodyparser=require('body-parser');
const app= express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World'));

/////////////TASKS
var tasksdata=
[
  {
    "TaskId": 54522845,
    "AbsoluteDateDeadline": -64152782,
    "RelativeDeadline": 41922126,
    "TaskType": "Ut",
    "TaskFile": "magna dolore adipisicing non sit"
  },
  {
    "TaskId": 74681262,
    "AbsoluteDateDeadline": -50886124,
    "RelativeDeadline": 25830589,
    "TaskType": "ut eiusmod Ut dolor",
    "TaskFile": "sit ipsum"
  }
]
;

app.get('/v1/tasks', (req, res) => {

    if(Object.keys(req.query).length !== 0){
	var offset=req.query.offset;
	var limit=req.query.limit;
    }
    else{
	var offset=0;
	var limit=10;
    }
     
    try{
	if(limit>=0 && offset>=0){
	    //ok
	    res.contentType('application/json')	    
	    res.status(200)
	    //da mandare [offset...offset+limit]
	    res.json(tasksdata)
	}
	else{
	    //bad request
	    res.sendstatus(400)
	}
    }catch(error){
	//data not found
	res.sendstatus(404)
    }
});


app.post('/v1/tasks', (req, res) => {

    var AbsoluteDateDeadline=req.body.AbsoluteDateDeadline;
    var RelativeDeadline=req.body.RelativeDeadline;
    var TaskType=req.body.TaskType;
    var TaskFile=req.body.TaskFile;
    
    if(true){	
	//data accepted
	res.sendstatus(201)
    }
    else{
	//data invalid
	res.sendstatus(400)
    }

});


/////////



app.listen(PORT);
