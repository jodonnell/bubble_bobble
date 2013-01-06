var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var UUID = require('node-uuid');


server.listen(3000);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.get('/tests', function (req, res) {
    res.sendfile(__dirname + '/spec_runner.html');
});

app.get(/^\/(.*\.js)$/, function (req, res) {
    res.sendfile(__dirname + '/' + req.params[0]);
});

app.get(/^\/jasmine-1.1.0\/(.*\.js)$/, function (req, res) {
    res.sendfile(__dirname + '/jasmine-1.1.0/' + req.params[0]);
});

app.get(/^\/jasmine-1.1.0\/(.*\.css)$/, function (req, res) {
    res.sendfile(__dirname + '/jasmine-1.1.0/' + req.params[0]);
});

app.get(/^\/assets\/(.*\.png)/, function (req, res) {
    res.sendfile(__dirname + '/assets/' + req.params[0]);
});



var players = [];

io.sockets.on('connection', function (socket) {
    socket.userid = UUID();
    socket.emit('onconnected', { id: socket.userid } );

    console.log('\t socket.io:: player ' + socket.userid + ' connected');
    
    players.push(socket);

    socket.on('disconnect', function () {
        console.log('\t socket.io:: socket disconnected ' + socket.userid );

        var index = players.indexOf(socket);
        players.splice(index, 1);
    });

    socket.on('moveRight', function (data) {
        for (var i = 0; i < players.length; i++) {
            if (socket !== players[i]) {
                console.log('emitting ' + data.moving);
                players[i].emit('moveRight', { moving: data.moving });
            }
        }
    });

    socket.on('moveLeft', function (data) {
        for (var i = 0; i < players.length; i++) {
            if (socket !== players[i]) {
                console.log('emitting ' + data.moving);
                players[i].emit('moveLeft', { moving: data.moving });
            }
        }
    });

    socket.on('pressZ', function (data) {
        for (var i = 0; i < players.length; i++) {
            if (socket !== players[i]) {
                console.log('emitting ' + data.moving);
                players[i].emit('pressZ', { moving: data.moving });
            }
        }
    });

    socket.on('pressX', function (data) {
        for (var i = 0; i < players.length; i++) {
            if (socket !== players[i]) {
                console.log('emitting ' + data.moving);
                players[i].emit('pressX', { moving: data.moving });
            }
        }
    });

});
