var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io')(server);

app.get('/soundfont-player.min.js', function (req, res) {
    res.sendFile(__dirname + '/soundfont-player.min.js');
});

app.get('/*', function (req, res) {
    console.log('radio client connecting');
    res.sendFile(__dirname + '/radio_client.html');

    
});

io.on('connection', function (socket) {

    var room = 'default';
    socket.join(room);
    socket.on('joinRoom', function(data) {
      for(let room in socket.rooms) {
        socket.leave(room);
      }
      room = data;
      socket.join(room);
      console.log('joined room ' + room);
    });
    socket.on('keyDown', function (data) {
        console.log('keyDown: ' + data);
        socket.to(room).emit('keyDown', data);
    });
    socket.on('keyUp', function (data) {
        console.log('keyUp: ' + data);
        socket.to(room).emit('keyUp', data);
    });
});

server.listen(3000, () => {
    console.log('listening');
});