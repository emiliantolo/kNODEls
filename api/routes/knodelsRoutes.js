'use strict';

module.exports.init = function(app) {
	var examController=require('./../controllers/examsController.js');
	
	//var knodels = require ('../controllers/knodelsController');
	/*
	app.route('/v1/signup')
		.post();
	app.route('/v1/login')
		.post();
	app.route('/v1/logout')
		.get();
	
	app.route('/v1/users')
		.get(knodels.getUsers);
	app.route('/v1/users/:UserId')
		.get(knodels.getUserByUserId)
		.post(knodels.setUserByUserId)
		.delete(knodels.deleteUserByUserId);
	app.route('/v1/users/:UserId/submissions')
		.get(knodels.getUserSubmissionByUserd);
	
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
	*/
	app.route('/v1/exams')
		.get(examController.getExams)
		//.post(examController.createExam);
	/*app.route('/v1/exams/:ExamId')
		.get(examController.getExamByExamId)
		.post(examController.modifyExamByExamId)
		.delete(examController.deleteExamByExamId);
	app.route('/v1/exams/:ExamId/submissions')
		.get();
	*/
}
