const request = require('supertest');
const app = require('../../app.js');
function getUsers(){
	return request(app)
		.get('/v1/users');
}
function getUserByUserId(id){
	return request(app)
		.get('/v1/users/'+id);
}
function createUsers(payload){
	return request(app).post('/v1/users')
		.set('Content-Type', 'application/json')
		.set('Accept','application/json')	
		.send(payload)
};
function updateUserByUserId(id,payload){
	return request(app).put('/v1/users/'+id)
		.set('Content-Type', 'application/json')
		.set('Accept','application/json')	
		.send(payload)
}
function deleteUserByUserId(id){
	return request(app).delete('/v1/users/'+id)
		.set('Content-Type', 'application/json')
		.set('Accept','application/json')	
}
module.exports ={
	getUsers,
	getUserByUserId,
	createUsers,
	updateUserByUserId,
	deleteUserByUserId
};

