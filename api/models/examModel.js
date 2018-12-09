let mongoose = require('mongoose')

let examSchema = new mongoose.Schema({
    /*ExamId: {
	type: Number,
	required: true
	  }*/
    Name: {
	type: String,
	required: true
    },
    Description: {
	type: String,
	required: true
    },
    Deadline: {
	type: Number,
	required: true
    },
    WorkGroups: {
	type: Array,
	required: false
    },
    Tasks: {
	type: Array,
	required: false
    }
});

module.exports = mongoose.model('exams', examSchema)
