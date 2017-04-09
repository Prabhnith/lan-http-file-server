var express = require('express');
var fs = require('fs');
var app = express();

const dir = require("node-dir");
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function(req, res) {

	return res.redirect('/public/home.html');

});

app.use('/public', express.static(__dirname + '/public'));

/** Implementing Simple Music Server using Express JS **/
app.get('/music', function(req, res) {
	// File to be served

	var fileId = req.query.id;
	var file = __dirname + '/music/' + fileId;
	fs.exists(file, function(exists) {
		if (exists) {
			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		} else {
			res.send("Its a 404");
			res.end();
		}

	});

});
app.get('/download', function(req, res) {
	var fileId = req.query.id;
	var file = __dirname + '/music/' + fileId;
	fs.exists(file, function(exists) {
		if (exists) {
			res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
			res.setHeader('Content-Type', 'application/audio/mpeg3')
			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		} else {
			res.send("Its a 404");
			res.end();
		}
	});
});

server.listen(3030, function() {
	console.log('App listening on port 3003!');
});
io.on("connection", function(files) {
	console.log("received connection");
	dir.readFiles(__dirname + "/music",
		function(err, content, next) {
			if (err) throw err;
			// console.log('content:', content);
			next();
		},
		function(err, files) {
			if (err) throw err;
			console.log('finished reading files:', files);
			// console.log(files);
			io.emit("files", {
				files: files
			});
		});
});
