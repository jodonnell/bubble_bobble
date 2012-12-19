"use strict";

var GameController = Class.extend({
    init: function (gameInit) {
        this.gameInit = gameInit;
        this.context = $('#gameCanvas').get(0).getContext("2d");

        this.onscreenSprites = new OnscreenSprites();

        this.player = new Player(200, 100);

        this.walls = (new LevelBuilder(this.walls)).walls;

        this.bubbles = [];

        this.enemies = [new BlueMagoo(370, 20, LEFT), new BlueMagoo(370, 70, LEFT), new BlueMagoo(370, 120, LEFT)];

        this.collisionDetector = new CollisionDetector({player: this.onscreenSprites.player, enemies: this.onscreenSprites.enemies, bubbles: this.onscreenSprites.bubbles, walls: this.onscreenSprites.walls});
        this.sprites = [[this.player]].concat([this.bubbles], [this.walls], [this.enemies]);
    },

    draw: function () {
        this.clearBackground();

        var drawMethod = $.proxy(function (i, j) {
            this.onscreenSprites.sprites[i][j].draw();
        }, this);
        this.eachSprite(drawMethod);
    },

    clearBackground: function () {
        this.context.fillStyle = "#010000";
        this.context.fillRect(0, 0, this.gameInit.width, this.gameInit.height);
    },

    update: function () {
        var updateMethod = $.proxy(function (i, j) {
            this.onscreenSprites.sprites[i][j].update({collisionDetector: this.collisionDetector, player: this.player, onscreenSprites: this.onscreenSprites});
        }, this);
        this.eachSprite(updateMethod);
    },

    eachSprite: function (spriteAction) {
        var i, j, sprites;

        for (i = 0; i < this.onscreenSprites.sprites.length; i++) {
            sprites = this.onscreenSprites.sprites[i];
            for (j = 0; j < sprites.length; j++) {
                spriteAction(i, j);
            }
        }
    }
});
