"use strict";

var OnscreenSprites = Class.extend({
    init: function (sprites) {
        if (!sprites) {
            sprites = {};
        }

        this.player = sprites.player || new Player(100, 100);
        this.enemies = sprites.enemies || [];
        this.bubbles = sprites.bubbles || [];
        this.walls = sprites.walls || [];
        this.deadEnemies = sprites.deadEnemies || [];
        this.collectibles = sprites.collectibles || [];
        this.texts = sprites.texts || [];

        this.sprites = [[this.player]].concat([this.bubbles], [this.walls], [this.enemies], [this.deadEnemies], [this.collectibles], [this.texts]);

        var remove = function (element) {
            var index = this.indexOf(element);
            this.splice(index, 1);
        }

        this.deadEnemies.remove = remove;
        this.enemies.remove = remove;
        this.walls.remove = remove;
        this.collectibles.remove = remove;
        this.bubbles.remove = remove;
        this.texts.remove = remove;
    }
});
