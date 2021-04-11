var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io')(server);

app.get('/soundfont-player.min.js', function (req, res) {
    res.sendFile(__dirname + '/soundfont-player.min.js');
});

app.get('/', function (req, res) {
    console.log('radio client connecting');
    res.sendFile(__dirname + '/radio_client.html');
});

io.on('connection', function (socket) {
    socket.on('keyDown', function (data) {
        console.log('keyDown: ' + data);
        socket.broadcast.emit('keyDown', data);
    });
    socket.on('keyUp', function (data) {
        console.log('keyUp: ' + data);
        socket.broadcast.emit('keyUp', data);
    });
});

server.listen(3000, () => {
    console.log('listening');
});