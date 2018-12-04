const request = require('supertest'), express = require('express');
const app = require('./../app.js')


/** Test cases for GET /v1/exams **/
describe('Test the root path', () => {
    test('It should response Exams API', () => {
        return request(app).get("/")
        .expect(200, "Exams API")
    });
})

describe('Test the GET /v1/exams path without parameters', () => {
    test('It should response with a json containing all the exams', () => {
        return request(app).get("/v1/exams")
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.statusCode).toBe(200)
        })
    });
})

describe('Test the GET /v1/exams path with all negative parameters', () => {
    test('It should response 400 error status', () => {
        return request(app).get("/v1/exams?offset=-1&limit=-1")
        .expect(400, {error: "400 Bad Request, invalid parameter"})
    });
})

describe('Test the GET /v1/exams path with negative offset parameter', () => {
    test('It should response 400 error status', () => {
        return request(app).get("/v1/exams?offset=-1&limit=1")
        .expect(400, {error: "400 Bad Request, invalid parameter"})
    });
})

describe('Test the GET /v1/exams path with negative limit parameter', () => {
    test('It should response 400 error status', () => {
        return request(app).get("/v1/exams?offset=1&limit=-1")
        .expect(400, {error: "400 Bad Request, invalid parameter"})
    });
})

describe('Test the GET /v1/exams path with only limit parameter', () => {
    test('It should response with the first element', () => {
        return request(app).get("/v1/exams?limit=1")
        .expect(200, [ { 
		ExamId: 0,
		Name: 'Formal languages and compilers',
		Description:
		 'The exam consists of 13 question, the first 5 are about formal languages, the 7 laters are open questions about compilers and their algorithms. The last one is the bonus question.',
		Deadline: 1550676600,
		WorkGroups: [ 45687125, 5367428 ],
		Tasks: [ 54522845, 74681262 ] } ])
    	});
})

describe('Test the GET /v1/exams path with only offset parameter', () => {
    test('It should response with the first element', () => {
        return request(app).get("/v1/exams?offset=1")
        .expect(200)
    });
})

describe('Test the GET /v1/exams path with too much parameters', () => {
    test('It should response with 400 error status', () => {
	return request(app).get("/v1/exams?offset=0&limit=1&param3=5")
	.expect(400, {error: "400 Bad Request, wrong number of parameters"})
    });
})

/** Test cases for POST /v1/exams **/
describe('Test the POST /v1/exams with all body parameters', () => {
    test('It should response with 200 status code', () => {
        return request(app).post("/v1/exams")
        .send({
		"Name": "Formal languages and compilers",
		"Description": "The exam consists of 13 question, the first 5 are about formal languages, the 7 laters are open questions about compilers and their algorithms. The last one is the bonus question.",
		"Deadline": 1550676600,
		"WorkGroups": [45687125, 5367428],
		"Tasks": [54522845, 74681262]
	})
	.expect(201, {error: "201"})
    });
})

describe('Test the POST /v1/exams without "WorkGroups" body parameters', () => {
    test('It should response with 200 status code', () => {
        return request(app).post("/v1/exams")
        .send({
		"Name": "Formal languages and compilers",
	  	"Description": "The exam consists of 13 question, the first 5 are about formal languages, the 7 laters are open questions about compilers and their algorithms. The last one is the bonus question.",
	  	"Deadline": 1550676600,
	  	"Tasks": [54522845, 74681262]
	})
	.expect(201, {error: "201"})
    });
})

describe('Test the POST /v1/exams without body parameters', () => {
    test('It should response with 400 error status code', () => {
        return request(app).post("/v1/exams")
        .send()
	.expect(400, {error: "400"})
    });
})


/** Test cases for GET /v1/exams/:ExamId **/
describe('Test the GET /v1/exams/:ExamId with correct parameter', () => {
    test('It should response with 200 status code', () => {
        return request(app).get("/v1/exams/0")
	.expect(200, { 
		ExamId: 0,
		Name: 'Formal languages and compilers',
		Description:
		 'The exam consists of 13 question, the first 5 are about formal languages, the 7 laters are open questions about compilers and their algorithms. The last one is the bonus question.',
		Deadline: 1550676600,
		WorkGroups: [ 45687125, 5367428 ],
		Tasks: [ 54522845, 74681262 ] } )
    });
})

describe('Test the GET /v1/exams/:ExamId with too big parameter', () => {
    test('It should response with 404 error status code', () => {
        return request(app).get("/v1/exams/1000")
	.expect(404, {error: "404"})
    });
})

describe('Test the GET /v1/exams/:ExamId with not a number (NaN) parameter', () => {
    test('It should response with 400 error status code', () => {
        return request(app).get("/v1/exams/notANumber")
	.expect(400, {error: "400"})
    });
})

/** Test cases for PUT /v1/exams/:ExamId **/
describe('Test the PUT /v1/exams/:ExamId with all correct parameters', () => {
    test('It should response with 200 status code', () => {
        return request(app).put("/v1/exams/0")
        .send({
		"Name": "Lorem ipsum",
	  	"Description": "dolor sit amet",
	  	"Deadline": 12345678,
	  	"WorkGroups": [32165498, 98765432],
	  	"Tasks": [12345679, 18767832]
	})
	.expect(200, {
		"ExamId": 0,
		"Name": "Lorem ipsum",
	  	"Description": "dolor sit amet",
	  	"Deadline": 12345678,
	  	"WorkGroups": [32165498, 98765432],
	  	"Tasks": [12345679, 18767832]
	})
    });
})

describe('Test the PUT /v1/exams/:ExamId with incorrect query parameter', () => {
    test('It should response with 404 error status code', () => {
        return request(app).put("/v1/exams/1000")
        .send({
		"Name": "Lorem ipsum",
	  	"Description": "dolor sit amet",
	  	"Deadline": 12345678,
	  	"WorkGroups": [32165498, 98765432],
	  	"Tasks": [12345679, 18767832]
	})
	.expect(404, {error: "404"})
    });
})

describe('Test the PUT /v1/exams/:ExamId with not a number (NaN) query parameter', () => {
    test('It should response with 400 error status code', () => {
        return request(app).put("/v1/exams/notANumber")
        .send({
		"Name": "Lorem ipsum",
	  	"Description": "dolor sit amet",
	  	"Deadline": 12345678,
	  	"WorkGroups": [32165498, 98765432],
	  	"Tasks": [12345679, 18767832]
	})
	.expect(400, {error: "400"})
    });
})


/** Test cases for DELETE /v1/exams/:ExamId **/
describe('Test the DELETE /v1/exams/:ExamId with correct query parameter', () => {
    test('It should response with 200 status code', () => {
        return request(app).delete("/v1/exams/0")
	.expect(200, {error: "200"})
    });
})

describe('Test the DELETE /v1/exams/:ExamId with incorrect query parameter', () => {
    test('It should response with 404 error status code', () => {
        return request(app).delete("/v1/exams/1000")
	.expect(404, {error: "404"})
    });
})

describe('Test the DELETE /v1/exams/:ExamId with not a number (NaN) query parameter', () => {
    test('It should response with 400 status code', () => {
        return request(app).delete("/v1/exams/notANumber")
	.expect(400, {error: "400"})
    });
})












