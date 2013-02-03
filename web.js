var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {debug: 0});
var UUID = require('node-uuid');


GLOBAL.RIGHT = 1;
GLOBAL.LEFT = 2;
GLOBAL.RIGHT_BOUND = 754;
GLOBAL.LEFT_BOUND = 46;
GLOBAL.document = {addEventListener: function() { }};
GLOBAL.io = {connect: function() { return {on: function() {}}}};
GLOBAL.$ = require('jquery');

GLOBAL.Class = require('./class.js').Class;
GLOBAL.GameController = require('./game_controller.js').GameController;
GLOBAL.Sprite = require('./sprite.js').Sprite;
GLOBAL.Player = require('./player.js').Player;
GLOBAL.Control = require('./control.js').Control;
GLOBAL.InputControl = require('./input_control.js').InputControl;
GLOBAL.NetworkedControl = require('./networked_control.js').NetworkedControl;
GLOBAL.GameInit = require('./game_init.js').GameInit;
GLOBAL.Images = require('./images.js').Images;
GLOBAL.NodeImages = require('./node_images.js').NodeImages;
GLOBAL.PlayerAnimations = require('./player_animations.js').PlayerAnimations;
GLOBAL.GameController = require('./game_controller.js').GameController;
GLOBAL.Wall = require('./wall.js').Wall;
GLOBAL.Bubble = require('./bubble.js').Bubble;
GLOBAL.BlueMagoo = require('./blue_magoo.js').BlueMagoo;
GLOBAL.CollisionDetector = require('./collision_detector.js').CollisionDetector;
GLOBAL.LevelBuilder = require('./level_builder.js').LevelBuilder;
GLOBAL.OnscreenSprites = require('./onscreen_sprites.js').OnscreenSprites;
GLOBAL.DeadEnemy = require('./dead_enemy.js').DeadEnemy;
GLOBAL.Pepper = require('./pepper.js').Pepper;
GLOBAL.Text = require('./text.js').Text;
GLOBAL.OnlineGameManager = require('./online_game_manager.js').OnlineGameManager;

GLOBAL.gameImages = new NodeImages(function() {});


server.listen(3000);

io.configure('development', function(){
    io.set('log level', 0);
});

app.set('views', __dirname)
app.set('view engine', 'jade')

app.get('/', function (req, res) {
    res.render('index', {})
});

app.get('/tests', function (req, res) {
    res.sendfile(__dirname + '/spec_runner.html');
});

app.get(/^\/(.*\.js)$/, function (req, res) {
    res.sendfile(__dirname + '/' + req.params[0]);
});

app.get(/^\/jasmine-1.3.1\/(.*\.js)$/, function (req, res) {
    res.sendfile(__dirname + '/jasmine-1.3.1/' + req.params[0]);
});

app.get(/^\/jasmine-1.3.1\/(.*\.css)$/, function (req, res) {
    res.sendfile(__dirname + '/jasmine-1.3.1/' + req.params[0]);
});

app.get(/^\/assets\/(.*\.png)/, function (req, res) {
    res.sendfile(__dirname + '/assets/' + req.params[0]);
});


var onlineGameManager = new OnlineGameManager()

io.sockets.on('connection', function (socket) {
    socket.userid = UUID();

    console.log('\t socket.io:: player ' + socket.userid + ' connected');

    var playerNum = onlineGameManager.findGame(socket);
});
