const request = require('supertest'), express = require('express');
const app = require('./../app.js')

describe('Test the root path', () => {
    test('It should response Exams API', () => {
        return request(app).get("/")
        .expect(200, "Exams API")
    });
})

describe('Test the /v1/exams path without parameters', () => {
    test('It should response with a json containing all the exams', () => {
        return request(app).get("/v1/exams")
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.statusCode).toBe(200)
        })
    });
})

describe('Test the /v1/exams path with all negative parameters', () => {
    test('It should response 400 error status', () => {
        return request(app).get("/v1/exams?offset=-1&limit=-1")
        .expect(400, {error: "400 Bad Request, invalid parameter"})
    });
})

describe('Test the /v1/exams path with negative offset parameter', () => {
    test('It should response 400 error status', () => {
        return request(app).get("/v1/exams?offset=-1&limit=1")
        .expect(400, {error: "400 Bad Request, invalid parameter"})
    });
})

describe('Test the /v1/exams path with negative limit parameter', () => {
    test('It should response 400 error status', () => {
        return request(app).get("/v1/exams?offset=1&limit=-1")
        .expect(400, {error: "400 Bad Request, invalid parameter"})
    });
})

describe('Test the /v1/exams path with only limit parameter', () => {
    test('It should response with the first element', () => {
        return request(app).get("/v1/exams?limit=1")
        .expect(200, [ { Name: 'Formal languages and compilers',
        Description:
         'The exam consists of 13 question, the first 5 are about formal languages, the 7 laters are open questions about compilers and their algorithms. The last one is the bonus question.',
        Deadline: 1550676600,
        WorkGroups: [ 45687125, 5367428 ],
        Tasks: [ 54522845, 74681262 ] } ])
    });
})

describe('Test the /v1/exams path with only offset parameter', () => {
    test('It should response with the first element', () => {
        return request(app).get("/v1/exams?offset=1")
        .expect(200)
    });
})

describe('Test the /v1/exams path with too much parameters', () => {
    test('It should response with 400 error status', () => {
	return request(app).get("/v1/exams?offset=0&limit=1&param3=5")
	.expect(400, {error: "400 Bad Request, wrong number of parameters"})
    });
})













