'use strict';
module.exports = function(app) {
	var users= require ('../controllers/usersController');
/*	app.route('/v1/login')
		.post();
	app.route('/v1/logout')
		.get();
	*/
	app.route('/v1/users')
		.get(users.getUsers)
		.post(users.createUser);
	app.route('/v1/users/:UserId')
		.get(users.getUserByUserId);
/*		.put(users.setUserByUserId)
		.delete(users.deleteUserByUserId);
	
	app.route('/v1/users/:UserId/submissions')
		.get(users.getUserSubmissionByUserd);
	
	app.route('/v1/submissions')
		.get()
		.post();
	app.route('/v1/submissions/:SubmissionId')
		.get();
	app.route('/v1/submissions/:SubmissionId/evaluation')
		.get();
	app.route('/v1/tasks')
		.get()
		.post();
	app.route('/v1/tasks/TaskId')
		.get()
		.post()
		.delete();
	app.route('/v1/exams')
		.get()
		.post();
	app.route('/v1/exams/:ExamId')
		.get()
		.post()
		.delete();
	app.route('/v1/exams/:ExamId/submissions')
		.get();
	*/
}
