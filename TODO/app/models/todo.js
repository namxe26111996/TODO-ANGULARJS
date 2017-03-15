var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
		
		name: String,
		status: Boolean,
	
});

module.exports = mongoose.model('task', todoSchema,'task');