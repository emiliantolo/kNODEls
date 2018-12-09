'use strict';

module.exports = function(app) {

    var taskController=require('./../controllers/tasksController.js');

    app.route('/v1/tasks')
	.get(taskController.getTasks)
	.post(taskController.createTask);
    app.route('/v1/tasks/:TaskId')
	.get(taskController.getTask)
	.put(taskController.updateTask)
	.delete(taskController.deleteTask);
    
	var users= require ('../controllers/usersController');	
	
	/*
	app.route('/v1/signup')
		.post();
	app.route('/v1/login')
		.post();
	app.route('/v1/logout')
		.get();
	*/
	
	app.route('/v1/users')
		.get(users.getUsers)
		.post(users.createUsers);
	app.route('/v1/users/:UserId')
		.get(users.getUserByUserId)
		.put(users.updateUserByUserId)
		.delete(users.deleteUserByUserId);
	/*
	app.route('/v1/users/:UserId/submissions')
		.get(users.getUserSubmissionByUserd);
	
	app.route('/v1/submissions')
		.get()
		.post();
	app.route('/v1/submissions/:SubmissionId')
		.get();
	app.route('/v1/submissions/:SubmissionId/evaluation')
		.get();
	*/
	
	var examController=require('./../controllers/examsController.js');
	
	app.route('/v1/exams')
		.get(examController.getExams)
		.post(examController.createExam);
	app.route('/v1/exams/:ExamId')
		.get(examController.getExamByExamId)
		.put(examController.updateExamByExamId)
		.delete(examController.deleteExamByExamId);
	/*app.route('/v1/exams/:ExamId/submissions')
		.get();
	*/
    
}
