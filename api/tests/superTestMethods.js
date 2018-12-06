const request = require('supertest');
const app = require('../../app.js');

function getUserByUserId(id){
	return request(app)
			.get('/v1/users/'+id);
}
function createUser(payload){
	return request(app).post('/v1/users')
		.set('Content-Type', 'application/json')
		.set('Accept','application/json')	
		.send(payload)
};
module.exports ={
	getUserByUserId,
	createUser
};

