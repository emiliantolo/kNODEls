const request = require('supertest');
const app = require('./../app.js')
var TaskModel = require('./../api/models/taskModel.js')

/// root

describe('Test the root path', () => {
    test('It should response the GET method', () => {
	return request(app).get("/").then(response => {
	    expect(response.statusCode).toBe(200)
	})
    });
})


/// GET /v1/tasks empty database

describe('Test the /v1/tasks with GET empty database', () => {

    beforeAll(function(done) {

	TaskModel.remove({}).exec().then(() => {

	    return done()
	})
    })

    test('Normal path', () => {
	return request(app).get("/v1/tasks").then(response => {
	    expect(response.statusCode).toBe(404)
	})
    });

    test('Negative parameters', () => {
	return request(app).get("/v1/tasks?limit=-1&offset=-1").then(response => {
	    expect(response.statusCode).toBe(400)
	})
    });


    test('Wrong offset parameter', () => {
	return request(app).get("/v1/tasks?limit=10&offset=-1").then(response => {
	    expect(response.statusCode).toBe(400)
	})
    });

    test('Wrong limit parameter', () => {
	return request(app).get("/v1/tasks?limit=0&offset=0").then(response => {
	    expect(response.statusCode).toBe(400)
	})
    });
    
    test('Only offset parameter', () => {
	return request(app).get("/v1/tasks?offset=0").then(response => {
	    expect(response.statusCode).toBe(404)
	})
    });


    test('Only limit parameter', () => {
	return request(app).get("/v1/tasks?limit=5").then(response => {
	    expect(response.statusCode).toBe(404)
	})
    });


    test('Out of bounds', () => {
	return request(app).get("/v1/tasks?limit=10&offset=1000").then(response => {
	    expect(response.statusCode).toBe(404)
	})
    });


    test('Right parameters', () => {
	return request(app).get("/v1/tasks?limit=5&offset=0").then(response => {
	    expect(response.statusCode).toBe(404)
	})
    });
})



/// POST /v1/tasks

describe('Test the /v1/tasks path with POST', () => {

    beforeAll(function(done) {

	TaskModel.remove({}).exec().then(() => {

	    return done()
	})
    })
    
    test('It should response the POST method', () => {
	return request(app).post("/v1/tasks")
	    .send({
		"Question": "proident ut ad",
		"TaskType": "dolore sit Lorem",
		"TaskFile": "cillum sed quis"
	    })
	    .then(response => {
		expect(response.statusCode).toBe(201)
		expect(response.body.Question).toBe("proident ut ad")
		expect(response.body.TaskType).toBe("dolore sit Lorem")
		expect(response.body.TaskFile).toBe("cillum sed quis")		
	    })
    });
    
    test('It should response the POST method', () => {
	return request(app).post("/v1/tasks")
	    .send({
		"Question": "proident ut ad",
		"TaskType": "dolore sit Lorem",
		"TaskFile": "cillum sed quis",
		"Answers": "abcde"
	    })
	    .then(response => {
		expect(response.statusCode).toBe(400)
	    })
    });
    
    test('It should response the POST method', () => {
	return request(app).post("/v1/tasks")
	    .send({
		"Question": "",
		"TaskType": "dolore sit Lorem",
		"TaskFile": "cillum sed quis"
	    })
	    .then(response => {
		expect(response.statusCode).toBe(400)
	    })
    });

    test('It should response the POST method', () => {
	return request(app).post("/v1/tasks")
	    .send({
		"Question": "proident ut ad",
		"TaskType": "dolore sit Lorem",
		"TaskFile": "cillum sed quis",
		"Options": ["a", "b", "c"],
		"Answers": ["a"]
	    })
	    .then(response => {
		expect(response.statusCode).toBe(201)
		expect(response.body.Question).toBe("proident ut ad")
		expect(response.body.TaskType).toBe("dolore sit Lorem")
		expect(response.body.TaskFile).toBe("cillum sed quis")	
		expect(response.body.Options).toEqual(["a", "b", "c"])
	    })
    });
    
    test('Invalid Options', () => {
	return request(app).post("/v1/tasks")
	    .send({
		"Question": "proident ut ad",
		"TaskType": "dolore sit Lorem",
		"TaskFile": "cillum sed quis",
		"Options": "abc"
	    })
	    .then(response => {
		expect(response.statusCode).toBe(400)
	    })
    });
    
    test('Invalid Answers', () => {
	return request(app).post("/v1/tasks")
	    .send({
		"Question": "proident ut ad",
		"TaskType": "dolore sit Lorem",
		"TaskFile": "cillum sed quis",
		"Answers": "abc"
	    })
	    .then(response => {
		expect(response.statusCode).toBe(400)
	    })
    });
    
    test('It should response the POST method', () => {
	return request(app).post("/v1/tasks")
	    .send({
		"Question": "proident ut ad",
		"TaskType": "dolore sit Lorem",
		"TaskFile": "cillum sed quis",
		"Options": ["a", "b", "c"]
	    })
	    .then(response => {
		expect(response.statusCode).toBe(201)
		expect(response.body.Question).toBe("proident ut ad")
		expect(response.body.TaskType).toBe("dolore sit Lorem")
		expect(response.body.TaskFile).toBe("cillum sed quis")	
		expect(response.body.Options).toEqual(["a", "b", "c"])
	    })
    });
})

/// GET /v1/tasks/:TaskId

describe('Test the /v1/tasks/:TaskId path with GET', () => {

    beforeAll(function(done) {

	TaskModel.remove({}).exec().then(() => {

	    return done()
	})
    })
    
    test('Wrong id format', () => {
	return request(app).get("/v1/tasks/abc")
	    .then(response => {
		expect(response.statusCode).toBe(400)
	    })
    });

    test('Right id format', () => {
	return request(app).get("/v1/tasks/5c057843d7e81322eb975b55")
	    .then(response => {
		expect(response.statusCode).toBe(404)
	    })
    });
    
})
/// PUT /v1/tasks/:TaskId

describe('Test the /v1/tasks/:TaskId path get wrong id format', () => {

    beforeAll(function(done) {

	TaskModel.remove({}).exec().then(() => {

	    return done()
	})
    })
    
    test('Wrong id format', () => {
	return request(app).put("/v1/tasks/abc")
	    .then(response => {
		expect(response.statusCode).toBe(400)
	    })
    });

    test('Right id format', () => {
	return request(app).put("/v1/tasks/5c057843d7e81322eb975b55")
	    .then(response => {
		expect(response.statusCode).toBe(404)
	    })
    });
    
})
/// DELETE /v1/tasks/:TaskId

describe('Test the /v1/tasks/:TaskId path get wrong id format', () => {

    beforeAll(function(done) {

	TaskModel.remove({}).exec().then(() => {

	    return done()
	})
    })
    
    test('Wrong id format', () => {
	return request(app).delete("/v1/tasks/abc")
	    .then(response => {
		expect(response.statusCode).toBe(400)
	    })
    });

    test('Right id format', () => {
	return request(app).delete("/v1/tasks/5c057843d7e81322eb975b55")
	    .then(response => {
		expect(response.statusCode).toBe(404)
	    })
    });
    
})

/// GET /v1/tasks/:TaskId with insertion

describe('Test the /v1/tasks/:TaskId path with GET with data insert', () => {

    beforeEach(function(done) {

	TaskModel.remove({}).exec().then(() => {

	    return done()
	})
    })
    
    test('Single id', () => {
	return request(app).post("/v1/tasks")
	    .send({
		"Question": "proident ut ad",
		"TaskType": "dolore sit Lorem",
		"TaskFile": "cillum sed quis"
	    })
	    .then(postres => {
		return (request(app).get("/v1/tasks/"+postres.body._id))
		    .then((getres) => {
			expect(getres.statusCode).toBe(200)
			expect(getres.type).toBe("application/json")
			expect(getres.body.Question).toBe("proident ut ad")
			expect(getres.body.TaskType).toBe("dolore sit Lorem")
			expect(getres.body.TaskFile).toBe("cillum sed quis")		
		    })
	    })

    });

    test('Multiple no offset, limit', () => {
	return request(app).post("/v1/tasks")
	    .send({
		"Question": "proident ut ad",
		"TaskType": "dolore sit Lorem",
		"TaskFile": "cillum sed quis"})
	    .then(res => {
		return request(app).post("/v1/tasks")
		    .send({
			"Question": "proident ut ad",
			"TaskType": "dolore sit Lorem",
			"TaskFile": "cillum sed quis"})
	    })
	    .then(res => {
		return request(app).post("/v1/tasks")
		    .send({
			"Question": "proident ut ad",
			"TaskType": "dolore sit Lorem",
			"TaskFile": "cillum sed quis"})
	    })
	    .then(res => {
		return (request(app).get("/v1/tasks"))
		    .then((getres) => {
			expect(getres.statusCode).toBe(200)
			expect(getres.type).toBe("application/json")
			expect(getres.body.length).toBe(3)
		    })
	    })

    });

    test('Multiple with offset and limit', () => {
	return request(app).post("/v1/tasks")
	    .send({
		"Question": "proident ut ad",
		"TaskType": "dolore sit Lorem",
		"TaskFile": "cillum sed quis"})
	    .then(res => {
		return request(app).post("/v1/tasks")
		    .send({
			"Question": "proident ut ad",
			"TaskType": "dolore sit Lorem",
			"TaskFile": "cillum sed quis"})
	    })
	    .then(res => {
		return request(app).post("/v1/tasks")
		    .send({
			"Question": "proident ut ad",
			"TaskType": "dolore sit Lorem",
			"TaskFile": "cillum sed quis"})
	    })
	    .then(res => {
		return (request(app).get("/v1/tasks?offset=0&limit=5"))
		    .then((getres) => {
			expect(getres.statusCode).toBe(200)
			expect(getres.type).toBe("application/json")
			expect(getres.body.length).toBe(3)
		    })
	    })

    });
    
    test('Multiple with offset and limit limit output', () => {
	return request(app).post("/v1/tasks")
	    .send({
		"Question": "proident ut ad",
		"TaskType": "dolore sit Lorem",
		"TaskFile": "cillum sed quis"})
	    .then(res => {
		return request(app).post("/v1/tasks")
		    .send({
			"Question": "proident ut ad",
			"TaskType": "dolore sit Lorem",
			"TaskFile": "cillum sed quis"})
	    })
	    .then(res => {
		return request(app).post("/v1/tasks")
		    .send({
			"Question": "proident ut ad",
			"TaskType": "dolore sit Lorem",
			"TaskFile": "cillum sed quis"})
	    })
	    .then(res => {
		return (request(app).get("/v1/tasks?offset=0&limit=1"))
		    .then((getres) => {
			expect(getres.statusCode).toBe(200)
			expect(getres.type).toBe("application/json")
			expect(getres.body.length).toBe(1)
		    })
	    })

    });
    
    test('Multiple with offset offset output', () => {
	return request(app).post("/v1/tasks")
	    .send({
		"Question": "proident ut ad",
		"TaskType": "dolore sit Lorem",
		"TaskFile": "cillum sed quis"})
	    .then(res => {
		return request(app).post("/v1/tasks")
		    .send({
			"Question": "proident ut ad",
			"TaskType": "dolore sit Lorem",
			"TaskFile": "cillum sed quis"})
	    })
	    .then(res => {
		return request(app).post("/v1/tasks")
		    .send({
			"Question": "proident ut ad",
			"TaskType": "dolore sit Lorem",
			"TaskFile": "cillum sed quis"})
	    })
	    .then(res => {
		return (request(app).get("/v1/tasks?offset=1&limit=5"))
		    .then((getres) => {
			expect(getres.statusCode).toBe(200)
			expect(getres.type).toBe("application/json")
			expect(getres.body.length).toBe(2)
		    })
	    })

    });
    
    test('Multiple with only offset', () => {
	return request(app).post("/v1/tasks")
	    .send({
		"Question": "proident ut ad",
		"TaskType": "dolore sit Lorem",
		"TaskFile": "cillum sed quis"})
	    .then(res => {
		return request(app).post("/v1/tasks")
		    .send({
			"Question": "proident ut ad",
			"TaskType": "dolore sit Lorem",
			"TaskFile": "cillum sed quis"})
	    })
	    .then(res => {
		return request(app).post("/v1/tasks")
		    .send({
			"Question": "proident ut ad",
			"TaskType": "dolore sit Lorem",
			"TaskFile": "cillum sed quis"})
	    })
	    .then(res => {
		return (request(app).get("/v1/tasks?offset=1"))
		    .then((getres) => {
			expect(getres.statusCode).toBe(200)
			expect(getres.type).toBe("application/json")
			expect(getres.body.length).toBe(2)
		    })
	    })

    });
    
    test('Multiple with only limit', () => {
	return request(app).post("/v1/tasks")
	    .send({
		"Question": "proident ut ad",
		"TaskType": "dolore sit Lorem",
		"TaskFile": "cillum sed quis"})
	    .then(res => {
		return request(app).post("/v1/tasks")
		    .send({
			"Question": "proident ut ad",
			"TaskType": "dolore sit Lorem",
			"TaskFile": "cillum sed quis"})
	    })
	    .then(res => {
		return request(app).post("/v1/tasks")
		    .send({
			"Question": "proident ut ad",
			"TaskType": "dolore sit Lorem",
			"TaskFile": "cillum sed quis"})
	    })
	    .then(res => {
		return (request(app).get("/v1/tasks?limit=2"))
		    .then((getres) => {
			expect(getres.statusCode).toBe(200)
			expect(getres.type).toBe("application/json")
			expect(getres.body.length).toBe(2)
		    })
	    })

    });
    
    test('Multiple with high offset', () => {
	return request(app).post("/v1/tasks")
	    .send({
		"Question": "proident ut ad",
		"TaskType": "dolore sit Lorem",
		"TaskFile": "cillum sed quis"})
	    .then(res => {
		return request(app).post("/v1/tasks")
		    .send({
			"Question": "proident ut ad",
			"TaskType": "dolore sit Lorem",
			"TaskFile": "cillum sed quis"})
	    })
	    .then(res => {
		return request(app).post("/v1/tasks")
		    .send({
			"Question": "proident ut ad",
			"TaskType": "dolore sit Lorem",
			"TaskFile": "cillum sed quis"})
	    })
	    .then(res => {
		return (request(app).get("/v1/tasks?offset=3"))
		    .then((getres) => {
			expect(getres.statusCode).toBe(404)
		    })
	    })

    });
})


describe('Test the /v1/tasks/:TaskId path with PUT with data insert', () => {

    beforeEach(function(done) {

	TaskModel.remove({}).exec().then(() => {

	    return done()
	})
    })
    
    test('Update Options and Answers', () => {
	return request(app).post("/v1/tasks")
	    .send({
		"Question": "proident ut ad",
		"TaskType": "dolore sit Lorem",
		"TaskFile": "cillum sed quis"
	    })
	    .then(postres => {
		return (request(app).put("/v1/tasks/"+postres.body._id).send({
		    "Options": ["a", "b", "c"],
		    "Answers": ["a"]
	    }))
		    .then((getres) => {
			expect(getres.statusCode).toBe(200)
			expect(getres.type).toBe("application/json")
			expect(getres.body.Question).toBe("proident ut ad")
			expect(getres.body.TaskType).toBe("dolore sit Lorem")
			expect(getres.body.TaskFile).toBe("cillum sed quis")		
			expect(getres.body.Options).toEqual(["a", "b", "c"])		
			expect(getres.body.Answers).toEqual(["a"])		
		    })
	    })

    });
    
    test('Invalid Options data', () => {
	return request(app).post("/v1/tasks")
	    .send({
		"Question": "proident ut ad",
		"TaskType": "dolore sit Lorem",
		"TaskFile": "cillum sed quis"
	    })
	    .then(postres => {
		return (request(app).put("/v1/tasks/"+postres.body._id).send({
		    "Options": "abc"
	    }))
		    .then((getres) => {
			expect(getres.statusCode).toBe(400)		
		    })
	    })

    });
    
    test('Invalid Answers data', () => {
	return request(app).post("/v1/tasks")
	    .send({
		"Question": "proident ut ad",
		"TaskType": "dolore sit Lorem",
		"TaskFile": "cillum sed quis"
	    })
	    .then(postres => {
		return (request(app).put("/v1/tasks/"+postres.body._id).send({
		    "Answers": "abc"
	    }))
		    .then((getres) => {
			expect(getres.statusCode).toBe(400)		
		    })
	    })

    });

    
    test('Modify Question, TaskType and TaskFile', () => {
	return request(app).post("/v1/tasks")
	    .send({
		"Question": "proident ut ad",
		"TaskType": "dolore sit Lorem",
		"TaskFile": "cillum sed quis"
	    })
	    .then(postres => {
		return (request(app).put("/v1/tasks/"+postres.body._id).send({
		"Question": "q",
		"TaskType": "tt",
		"TaskFile": "tf"
	    }))
		    .then((getres) => {
			expect(getres.statusCode).toBe(200)
			expect(getres.body.Question).toBe("q")
			expect(getres.body.TaskType).toBe("tt")
			expect(getres.body.TaskFile).toBe("tf")
		    })
	    })

    });
})

describe('Test the /v1/tasks/:TaskId path with DELETE with data delete', () => {

    beforeEach(function(done) {

	TaskModel.remove({}).exec().then(() => {

	    return done()
	})
    })
    
    test('Single id', () => {
	return request(app).post("/v1/tasks")
	    .send({
		"Question": "proident ut ad",
		"TaskType": "dolore sit Lorem",
		"TaskFile": "cillum sed quis"
	    })
	    .then(postres => {
		return (request(app).delete("/v1/tasks/"+postres.body._id))
		    .then((getres) => {
			expect(getres.statusCode).toBe(200)
			expect(getres.type).toBe("application/json")
			expect(getres.body.Question).toBe("proident ut ad")
			expect(getres.body.TaskType).toBe("dolore sit Lorem")
			expect(getres.body.TaskFile).toBe("cillum sed quis")	
		    })
	    })

    });

})
/// GET /v1/tasks empty database
/*
  describe('Test the /v1/tasks path no parameters', () => {
  test('It should response the GET method', () => {
  return request(app).get("/v1/tasks").then(response => {
  expect(response.statusCode).toBe(200)
  expect(response.type).toBe("application/json")
  expect(response.body).toEqual([])
  })
  });
  })
*/
