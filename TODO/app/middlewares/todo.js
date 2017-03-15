var Todo = require('../models/todo');

exports.add = function(req, res) {
	var todo = new Todo({
		name: req.body.name,
		status: req.body.status,
	});

	todo.save(function(err) {
		if (err) {
			return next({
				error: err
			});
		}

		res.json({
			id: todo._id,
			name: todo.name,
			status: todo.status
		});
	});
};

exports.loadData = function(req, res) {
	Todo.find(function(err, data) {
		res.json(data);
	});
};

exports.findById = function(req, res) {
	Todo.findById(req.params.id, function(err, data) {
		res.json(data);
	});
};

exports.delete = function(req, res) {
	var id = req.params.id;
	Todo.remove({
		_id: id
	}, function(err) {
		if (err) {
			return next({
				error: err
			});
		}

		res.json({
			id: id
		});
	});
};


//update method put
exports.update = function(req, res) {
	var id = req.params.id;
	var newname = req.body.name;
	var newstatus = req.body.status;

	Todo.update({
			_id: id
		}, {
			name: newname,
			status: newstatus
		},
		function(err, raw) {
			if (err) {
				return next({
					error: err
				});
			}
			res.json({
				id: id,
				name: newname,
				status: newstatus
			});
		}
	);
};