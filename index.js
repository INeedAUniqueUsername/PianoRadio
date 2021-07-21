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

let metronomes = {};

io.on('connection', function (socket) {
    var room = 'default';
    socket.join(room);

    socket.on('metronome', function(data) {
        let bpm = data;
        if(metronomes[room]) {
            clearInterval(metronomes[room]);
        }
        metronomes[room] = setInterval(function() {
            io.to(room).emit('beat');
        }, 60 * 1000 / bpm);
    });

    socket.on('joinRoom', function (data) {
        for (let room in socket.rooms) {
            socket.leave(room);
            io.to(room).emit('userCount', io.sockets.adapter.rooms.get(room).size)
        }
        room = data;
        socket.join(room);
        io.to(room).emit('userCount', io.sockets.adapter.rooms.get(room).size)
        console.log(`joined room ${room}`);
    });
    socket.on('keyDown', function (key) {
        console.log(`keyDown: (${room}, ${socket.id}, ${key})`);
        socket.to(room).emit('keyDown', key);
    });
    socket.on('keyUp', function (key) {
        console.log(`keyUp: (${room}, ${socket.id}, ${key})`);
        socket.to(room).emit('keyUp', key);
    });
    socket.on('disconnect', function () {
        console.log(`disconnected: ${socket.id}`);
        for (let room in socket.rooms) {
            socket.leave(room);
            io.to(room).emit('userCount', io.sockets.adapter.rooms.get(room).size)
        }
    });
});

server.listen(3000, () => {
    console.log('listening');
});