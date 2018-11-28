const request = require('supertest');
const app = require('./../app.js')

describe('Test the root path', () => {
    test('It should response the GET method', () => {
        return request(app).get("/").then(response => {
            expect(response.statusCode).toBe(200)
        })
    });
})

describe('Test the /v1/tasks path no parameters', () => {
    test('It should response the GET method', () => {
        return request(app).get("/v1/tasks").then(response => {
            expect(response.statusCode).toBe(200)
        })
    });
})

describe('Test the /v1/tasks path wrong parameters', () => {
    test('It should response the GET method', () => {
        return request(app).get("/v1/tasks?limit=-1&offset=-1").then(response => {
            expect(response.statusCode).toBe(400)
        })
    });
})
