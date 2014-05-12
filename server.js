// Express
var express = require('express')
	, http = require('http')
	, app = express()
	;

app.use(express.static(__dirname + '/public'));
var server = http.createServer(app).listen(8080);
console.log('server start:', 8080);

// Socket.IO
var io = require('socket.io')
	, io = io.listen(server)
	;

io.sockets.on('connection', function(socket) {
	console.log(socket.id, "connected!");
	//io.sockets.emit('login', socket.id);
	socket.on('draw', function(data){
		io.sockets.emit('draw', {x: data.x, y: data.y});
	});
});
