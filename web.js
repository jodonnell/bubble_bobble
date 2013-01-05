var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var UUID = require('node-uuid');


server.listen(3000);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.get(/^\/(.*\.js)$/, function (req, res) {
    res.sendfile(__dirname + '/' + req.params[0]);
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
        var indexOfPlayer;

        var index = players.indexOf(element);
        players.splice(index, 1);
    });

    socket.on('moveRight', function (data) {
        for (var i = 0; i < players.length; i++) {
            if (socket !== players[i]) {
                socket.emit('moveRight', { moving: data.moving });
            }
        }
    });
});
