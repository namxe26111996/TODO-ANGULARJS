var LOAD_WEB_OK = 200;

var todo = require('./middlewares/todo.js');
var fs = require('fs');
module.exports = function(app){
	

	

	app.get('/',function(req,res) {
		res.writeHead(LOAD_WEB_OK,{"Content-Type":"text/html"});
		var data = fs.readFileSync("views/index.html","utf-8");
		res.end(data);
	})

	// app.get('/todos',todo.loadData);
	// app.post('/todos',todo.addNew);
	// app.post('/addNew',todo.addNew);
	// app.post('/delete',todo.delete);
	// app.post('/update',todo.update);


	app.route('/todos')
			.get(todo.loadData)
			.post(todo.add);

	app.route('/todos/:id')
			.get(todo.findById)
			.put(todo.update)
			.delete(todo.delete);
}