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

        this.sprites = [[this.player]].concat([this.bubbles], [this.walls], [this.enemies], [this.deadEnemies]);
    }
});
