
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

GLOBAL.gameImages = new NodeImages(function() {

    var gameController = new GameController(null, 1);

    for (var i = 0; i < 30; i++) {
        gameController.update();
    }

});

