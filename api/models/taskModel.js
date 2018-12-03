let mongoose = require('mongoose')

let taskSchema = new mongoose.Schema({
    /*    TaskId: {
	  type: Number,
	  required: true
	  }*/
    Question: {
	type: String,
	required: true
    },
    TaskType: {
	type: String,
	required: true
    },
    TaskFile: {
	type: String,
	required: true
    },
    Options: {
	type: Array,
	required: false
    },
    Answers: {
	type: Array,
	required: false
    }
})

module.exports = mongoose.model('Tasks', taskSchema)
