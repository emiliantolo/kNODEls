const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./../../app.js')

let id;
let deleteId = [];


//importing the model of data for mongodb
var ExamModel = require('./../models/examModel.js')


/****************** inizialization of database with some data ******************/
beforeAll( async () => {
	
	let exam = {
		Name: 'NameTest',
		Description: 'DescriptionTest',
		Deadline: 12345678,
		WorkGroups: [11111111, 22222222],
		Tasks: [33333333, 44444444]
	}
	
	const response = await request(app)
	.post('/v1/exams')
	.set('Content-Type', 'application/json')
	.set('Accept','application/json')	
	.send(exam)
	.then(result => {
		id=result.body.id;
	})
	.catch(err => {
		console.error(err)
	})

});


/****************** reset the database from all data inserted by tests ******************/
afterAll( async () => {

	for(let delId of deleteId){
		const response = await request(app)
			.delete('/v1/exams/'+delId)
	}

});


/******************** Test cases for root path ********************/
describe('Test the root path', () => {
    test('It should response Exams API', async () => {
        const response = await request(app).get("/")
        .expect(200)
    });
})

/******************** Test cases for POST /v1/exams ********************/
describe('Test the POST /v1/exams with all body parameters', () => {
    test('It should response with 201 status code', async () => {
        const response = await request(app).post("/v1/exams")
        .send({
		Name: "Formal languages and compilers",
		Description: "The exam consists of 13 question, the first 5 are about formal languages, the 7 laters are open questions about compilers and their algorithms. The last one is the bonus question.",
		Deadline: 1550676600,
		WorkGroups: [45687125, 5367428],
		Tasks: [54522845, 74681262]
	})
	.expect(201)
	
	deleteId.push(response.body.id)
	
    });
})

describe('Test the POST /v1/exams without "WorkGroups" body parameters', () => {
    test('It should response with 201 status code', async () => {
        const response = await request(app).post("/v1/exams")
        .send({
		Name: "Formal languages and compilers",
	  	Description: "The exam consists of 13 question, the first 5 are about formal languages, the 7 laters are open questions about compilers and their algorithms. The last one is the bonus question.",
	  	Deadline: 1550676600,
	  	Tasks: [54522845, 74681262]
	})
	.expect(201)
	
	deleteId.push(response.body.id)
    });
})

describe('Test the POST /v1/exams without body parameters', () => {
    test('It should response with 400 error status code', async () => {
        const response = await request(app).post("/v1/exams")
        .send()
	.expect(400, {error: "400 Bad Request, some body parameters are incorrect"})
    });
    test('It should response with 400 error status code', async () => {
        const response = await request(app).post("/v1/exams")
        .send({})
	.expect(400, {error: "400 Bad Request, some body parameters are incorrect"})
    });
})

describe('Test the POST /v1/exams with "WorkGroups" body parameters empty', () => {
    test('It should response with 201 status code', async () => {
        const response = await request(app).post("/v1/exams")
        .send({
		Name: "Formal languages and compilers",
	  	Description: "The exam consists of 13 question, the first 5 are about formal languages, the 7 laters are open questions about compilers and their algorithms. The last one is the bonus question.",
	  	Deadline: 1550676600,
	  	WorkGroups: [],
	  	Tasks: [54522845, 74681262]
	})
	.expect(201)
	
	deleteId.push(response.body.id)
    });
})

describe('Test the POST /v1/exams with wrong body parameters type', () => {
    test('It should response with 400 error status code', async () => {
        const response = await request(app).post("/v1/exams")
        .send({
		Name: 123456,
	  	Description: "The exam consists of 13 question, the first 5 are about formal languages, the 7 laters are open questions about compilers and their algorithms. The last one is the bonus question.",
	  	Deadline: 1550676600,
	  	WorkGroups: [],
	  	Tasks: [54522845, 74681262]
	})
	.expect(400, {error: "400 Bad Request, some body parameters have incorrect type"})
    });
})

describe('Test the POST /v1/exams without required body parameters', () => {
    test('It should response with 400 error status code', async () => {
        const response = await request(app).post("/v1/exams")
        .send({
		
	  	Description: "The exam consists of 13 question, the first 5 are about formal languages, the 7 laters are open questions about compilers and their algorithms. The last one is the bonus question.",
	  	Deadline: 1550676600,
	  	WorkGroups: [],
	  	Tasks: [54522845, 74681262]
	})
	.expect(400, {error: "400 Bad Request, some body parameters are incorrect"})
    });
})

describe('Test the POST /v1/exams with "Tasks" body parameters empty', () => {
    test('It should response with 400 status code', async () => {
        const response = await request(app).post("/v1/exams")
        .send({
		Name: "Formal languages and compilers",
	  	Description: "The exam consists of 13 question, the first 5 are about formal languages, the 7 laters are open questions about compilers and their algorithms. The last one is the bonus question.",
	  	Deadline: 1550676600,
	  	WorkGroups: [],
	  	Tasks: []
	})
	.expect(400, {error: "400 Bad Request, some body parameters are incorrect"})
    });
})

describe('Test the POST /v1/exams with empty body parameter', () => {
    test('It should response with 400 status code', async () => {
        const response = await request(app).post("/v1/exams")
        .send({
		Name: "",
		Description: "The exam consists of 13 question, the first 5 are about formal languages, the 7 laters are open questions about compilers and their algorithms. The last one is the bonus question.",
		Deadline: 1550676600,
		WorkGroups: [45687125, 5367428],
		Tasks: [54522845, 74681262]
	})
	.expect(400, {error: "400 Bad Request, some body parameters are incorrect"})
    });
})

describe('Test the POST /v1/exams with more non-existent body parameter', () => {
    test('It should response with 201 status code', async () => {
        const response = await request(app).post("/v1/exams")
        .send({
        	UnexistingParam: "notExist",
		Name: "Formal languages and compilers",
		Description: "The exam consists of 13 question, the first 5 are about formal languages, the 7 laters are open questions about compilers and their algorithms. The last one is the bonus question.",
		Deadline: 1550676600,
		WorkGroups: [45687125, 5367428],
		Tasks: [54522845, 74681262]
	})
	
	expect(201)
	
	deleteId.push(response.body.id)
    });
})


/******************** Test cases for GET /v1/exams ********************/
describe('Test the GET /v1/exams path without parameters', () => {
    test('It should response with 200 status code', async () => {
        const response = await request(app).get("/v1/exams")
        .expect('Content-Type', /json/)
        .expect(200)
    });
})


describe('Test the GET /v1/exams path with all negative parameters', () => {
    test('It should response 400 error status', async () => {
        const response = await request(app).get("/v1/exams?offset=-1&limit=-1")
        .expect(400, {error: "400 Bad Request, invalid parameter"})
    });
})

describe('Test the GET /v1/exams path with negative offset parameter', () => {
    test('It should response 400 error status', async () => {
        const response = await request(app).get("/v1/exams?offset=-1&limit=1")
        .expect(400, {error: "400 Bad Request, invalid parameter"})
    });
})

describe('Test the GET /v1/exams path with negative limit parameter', () => {
    test('It should response 400 error status', async () => {
        const response = await request(app).get("/v1/exams?offset=1&limit=-1")
        .expect(400, {error: "400 Bad Request, invalid parameter"})
    });
})

describe('Test the GET /v1/exams path with only limit parameter', () => {
    test('It should response with 200 status code', async () => {
        const response = await request(app).get("/v1/exams?limit=1")
        .expect(200)
    });
})

describe('Test the GET /v1/exams path with only offset parameter', () => {
    test('It should response with 200 status code', async () => {
        const response = await request(app).get("/v1/exams?offset=1")
        .expect(200)
    });
})

describe('Test the GET /v1/exams path with too much parameters', () => {
    test('It should response with 400 error status', async () => {
	const response = await request(app).get("/v1/exams?offset=0&limit=1&param3=5")
	.expect(400, {error: "400 Bad Request, wrong number of parameters"})
    });
})




/******************** Test cases for GET /v1/exams/:ExamId ********************/
describe('Test the GET /v1/exams/:ExamId with correct parameter', () => {
    test('It should response with 200 status code', async () => {
        const response = await request(app).get("/v1/exams/"+id)
	.expect(200, {
		WorkGroups: [11111111, 22222222],
		Tasks: [33333333, 44444444],
		_id: id,
		Name: 'NameTest',
		Description: 'DescriptionTest',
		Deadline: 12345678,
		__v: 0 } )
    });
})

describe('Test the GET /v1/exams/:ExamId with not-existing id', () => {
    test('It should response with 404 error status code', async () => {
        const response = await request(app).get("/v1/exams/5c0bc1ce78e4d91ef3fb05f1")
	.expect(404, {error: "404 Not Found"})
    });
})

describe('Test the GET /v1/exams/:ExamId with not a correct parameter type', () => {
    test('It should response with 400 error status code', async () => {
        const response = await request(app).get("/v1/exams/notCorrectType")
	.expect(400, {error: "400 Bad Request, wrong parameter"})
    });
})

/******************** Test cases for PUT /v1/exams/:ExamId ********************/
describe('Test the PUT /v1/exams/:ExamId with all correct parameters', () => {
    test('It should response with 200 status code', async () => {
        const response = await request(app).put("/v1/exams/"+id)
        .send({
		Name: "Lorem ipsum",
	  	Description: "dolor sit amet",
	  	Deadline: 12345678,
	  	WorkGroups: [55555555, 66666666],
	  	Tasks: [77777777, 88888888]
	})
	.expect(200, {
		WorkGroups: [55555555, 66666666],
		Tasks: [77777777, 88888888],
		_id: id,
		Name: "Lorem ipsum",
	  	Description: "dolor sit amet",
	  	Deadline: 12345678,
	  	__v: 0
	})
    });
})

describe('Test the PUT /v1/exams/:ExamId with not-existing id', () => {
    test('It should response with 404 error status code', async () => {
        const response = await request(app).put("/v1/exams/5c0bc1ce78e4d91ef3fb05f1")
        .send({
		Name: "Lorem ipsum",
	  	Description: "dolor sit amet",
	  	Deadline: 12345678,
	  	WorkGroups: [55555555, 66666666],
	  	Tasks: [77777777, 88888888]
	})
	.expect(404, {error: "404 Not Found"})
    });
})

describe('Test the PUT /v1/exams/:ExamId with not a number (NaN) query parameter', () => {
    test('It should response with 400 error status code', async () => {
        const response = await request(app).put("/v1/exams/notANumber")
        .send({
		Name: "Lorem ipsum",
	  	Description: "dolor sit amet",
	  	Deadline: 12345678,
	  	WorkGroups: [55555555, 66666666],
	  	Tasks: [77777777, 88888888]
	})
	.expect(400, {error: "400 Bad Request, wrong parameter"})
    });
})

describe('Test the PUT /v1/exams/:ExamId with not a correct parameter type', () => {
    test('It should response with 400 error status code', async () => {
        const response = await request(app).put("/v1/exams/"+id)
        .send({
		Name: 123,
	  	Description: "dolor sit amet",
	  	Deadline: 12345678,
	  	WorkGroups: [55555555, 66666666],
	  	Tasks: [77777777, 88888888]
	})
	.expect(400, {error: "400 Bad Request, some body parameters have incorrect type"})
    });
})

describe('Test the PUT /v1/exams/:ExamId with empty body parameter', () => {
    test('It should response with 400 error status code', async () => {
        const response = await request(app).put("/v1/exams/"+id)
        .send({
		Name: "",
	  	Description: "dolor sit amet",
	  	Deadline: 12345678,
	  	WorkGroups: [55555555, 66666666],
	  	Tasks: [77777777, 88888888]
	})
	.expect(400, {error: "400 Bad Request, some body parameters are incorrect(can not be empty)"})
    });
})

describe('Test the PUT /v1/exams/:ExamId with more non-existing body parameters', () => {
    test('It should response with 200 status code', async () => {
        const response = await request(app).put("/v1/exams/"+id)
        .send({
        	UnexistingParam: "notExist",
		Name: "Lorem ipsum",
	  	Description: "dolor sit amet",
	  	Deadline: 12345678,
	  	WorkGroups: [55555555, 66666666],
	  	Tasks: [77777777, 88888888]
	})
	.expect(200, {
		WorkGroups: [55555555, 66666666],
		Tasks: [77777777, 88888888],
		_id: id,
		Name: "Lorem ipsum",
	  	Description: "dolor sit amet",
	  	Deadline: 12345678,
	  	__v: 0
	})
    });
})


/******************** Test cases for DELETE /v1/exams/:ExamId ********************/
describe('Test the DELETE /v1/exams/:ExamId with correct query parameter', () => {
    test('It should response with 200 status code', async () => {
        const response = await request(app).delete("/v1/exams/"+id)
	.expect(200, {
        	WorkGroups: [55555555, 66666666],
		Tasks: [77777777, 88888888],
        	_id: id,
		Name: "Lorem ipsum",
	  	Description: "dolor sit amet",
		Deadline: 12345678,
		__v: 0
	})
    });
})

describe('Test the DELETE /v1/exams/:ExamId with not-existing id', () => {
    test('It should response with 404 error status code', async () => {
        const response = await request(app).delete("/v1/exams/5c0bc1ce78e4d91ef3fb05f1")
	.expect(404, {error: "404 Not Found"})
    });
})

describe('Test the DELETE /v1/exams/:ExamId with not a correct parameter type', () => {
    test('It should response with 400 status code', async () => {
        const response = await request(app).delete("/v1/exams/notCorrectType")
	.expect(400, {error: "400 Bad Request, wrong parameter"})
    });
})











