const express = require('express');
const fs = require('fs');
const app = express();
const dir = require("node-dir");
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', function(req, res) {
	return res.redirect('/public/home.html');
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/music', function(req, res) {
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

server.listen(port, function() {
	console.log(`Music Server listening on port ${port}...`);
});
io.on("connection", function(files) {
	console.log("received connection");
	dir.readFiles(__dirname + "/music",
		function(err, content, next) {
			if (err) throw err;
			next();
		},
		function(err, files) {
			if (err) throw err;
			console.log('finished reading files:', files);
			io.emit("files", {
				files: files
			});
		});
});