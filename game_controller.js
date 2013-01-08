"use strict";

var GameController = Class.extend({
    init: function (gameInit, playerNumber) {
        this.gameInit = gameInit;

        var players = [];

        if (playerNumber > 0) {
            players.push(new Player(200, 100, 'bub', new NetworkedControl()));
            players.push(new Player(600, 100, 'bob', new InputControl()));
        }
        else {
            players.push(new Player(200, 100, 'bub', new InputControl()));
        }
            
        this.onscreenSprites = new OnscreenSprites({players: players,
                                                   enemies: [new BlueMagoo(370, 20, LEFT), new BlueMagoo(370, 70, LEFT), new BlueMagoo(370, 120, LEFT)],
                                                   bubbles: [],
                                                   walls: (new LevelBuilder(this.walls)).walls});

        this.collisionDetector = new CollisionDetector();
    },

    draw: function () {
        this._clearBackground();

        var drawMethod = $.proxy(function (i, j) {
            this.onscreenSprites.sprites[i][j].draw();
        }, this);
        this._eachSprite(drawMethod);
    },

    _clearBackground: function () {
        gameContext.fillStyle = "#010000";
        gameContext.fillRect(0, 0, this.gameInit.width, this.gameInit.height);
    },

    update: function () {
        var updateMethod = $.proxy(function (i, j) {
            this.onscreenSprites.sprites[i][j].update({collisionDetector: this.collisionDetector, onscreenSprites: this.onscreenSprites});
        }, this);
        this._eachSprite(updateMethod);
    },

    _eachSprite: function (spriteAction) {
        var i, j, sprites;

        for (i = 0; i < this.onscreenSprites.sprites.length; i++) {
            sprites = this.onscreenSprites.sprites[i];
            for (j = 0; j < sprites.length; j++) {
                spriteAction(i, j);
            }
        }
    }
});

if (typeof exports !== 'undefined') {
    exports.GameController = GameController;
}
