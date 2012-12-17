"use strict";

var GameController = Class.extend({
    init: function (gameInit) {
        this.gameInit = gameInit;
        this.context = $('#gameCanvas').get(0).getContext("2d");

        this.bub = new Player(200, 100);

        this.walls = (new LevelBuilder(this.walls)).walls;

        this.bubbles = [];

        this.enemies = [new BlueMagoo(370, 20, LEFT), new BlueMagoo(370, 70, LEFT), new BlueMagoo(370, 120, LEFT)];

        this.collisionDetector = new CollisionDetector({bub: this.bub, enemies: this.enemies, bubbles: this.bubbles, walls: this.walls});
        this.sprites = [[this.bub]].concat([this.bubbles], [this.walls], [this.enemies]);
    },

    removeBubble: function (bubble) {
        var remove = -1;
        for (var i = 0; i < this.bubbles.length; i++) {
            if (this.bubbles[i] === bubble) {
                remove = i;
            }
        }
        
        this.bubbles.splice(remove, 1);
    },

    draw: function () {
        var i, k, sprites;

        this.clearBackground();

        for (i = 0; i < this.sprites.length; i++) {
            sprites = this.sprites[i];
            for (k = 0; k < sprites.length; k++) {
                this.sprites[i][k].draw();
            }
        }
    },

    clearBackground: function () {
        this.context.fillStyle = "#010000";
        this.context.fillRect(0, 0, this.gameInit.width, this.gameInit.height);
    },

    update: function () {
        var i, k, sprites;

        for (i = 0; i < this.sprites.length; i++) {
            sprites = this.sprites[i];
            for (k = 0; k < sprites.length; k++) {
                this.sprites[i][k].update({collisionDetector: this.collisionDetector, player: this.bub, gameController: this});
            }
        }
    }
});
