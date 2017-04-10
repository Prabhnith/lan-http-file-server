const express 	= require('express');
const fs  		= require('fs');
const app 		= express();
const path 		= require("path");
const dir 		= require("node-dir");
const server	= require('http').Server(app);
const io  		= require('socket.io')(server);
const port 		= 3030;

app.get('/', function(req, res) {
	return res.redirect('/public/home.html');
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/music', function(req, res) {
	let fileId = req.query.id;
	let file = __dirname + '/music/' + fileId;
	fs.exists(file, function(exists) {
		if (exists) {
			let rstream = fs.createReadStream(file);
			rstream.pipe(res);
		} else {
			res.send("Its a 404");
			res.end();
		}
	});

});

app.get('/download', function(req, res) {
	let fileId = req.query.id;
	console.log("Download  requested : ",fileId);
	let file = __dirname + '/music/' + fileId;
	fs.exists(file, function(exists) {
		if (exists) {
			console.log(file);
			res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
			res.setHeader('Content-Type', 'application/audio/mpeg3')
			let rstream = fs.createReadStream(file);
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
	sendFiles();
});

function sendFiles(){
dir.readFiles(__dirname + "/music",
		function(err, content, next) {
			if (err) throw err;
			next();
		},
		function(err, files) {
			if (err) throw err;
			let musicFiles = files.filter( (file) => (path.extname(file)==".mp3" || 
													  path.extname(file)==".wav" ||
													  path.extname(file)==".ogg"));
			// let videoFiles = files.filter( (file) => (path.extname(file)==".mp4" ||
													  // path.extname(file)==".avi" ||
													  // path.extname(file)==".webm"));

			console.log('finished reading files:', files);
			io.emit("files", {
				musicFiles,
				// videoFiles
			});
		});
};



