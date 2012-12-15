"use strict";

var GameController = Class.extend({
    init: function (gameInit) {
        this.gameInit = gameInit;
        this.control = new Control();

        this.bub = new Player(200, 100);
        this.images = new Images();
        this.context = $('#gameCanvas').get(0).getContext("2d");

        this.walls = (new LevelBuilder(this.walls)).walls;

        this.bubbles = [];
        this.enemies = [new BlueMagoo(370, 20, LEFT), new BlueMagoo(370, 70, LEFT), new BlueMagoo(370, 120, LEFT)];

        this.collisionDetector = new CollisionDetector({bub: this.bub, enemies: this.enemies, bubbles: this.bubbles, walls: this.walls});
        this.sprites = [[this.bub]].concat([this.bubbles], [this.walls], [this.enemies]);

        $(document).on('shootBubble', $.proxy(this.createBubble, this));
        $(document).on('removeBubble', $.proxy(this.removeBubble, this));

    },

    removeBubble: function (e, bubble) {
        var remove = -1;
        for (var i = 0; i < this.bubbles.length; i++) {
            if (this.bubbles[i] === bubble) {
                remove = i;
            }
        }
        
        this.bubbles.splice(remove, 1);
    },

    createBubble: function (e, direction) {
        var x;
        if (direction === RIGHT) {
            x = this.bub.x + this.bub.width(this.images) / 2;
        }
        else {
            x = this.bub.x - this.bub.width(this.images) / 2;
        }
        this.bubbles.push(new Bubble(x, this.bub.y, direction));
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
                this.sprites[i][k].update({control: this.control, collisionDetector: this.collisionDetector, player: this.bub});
            }
        }
    }
});
