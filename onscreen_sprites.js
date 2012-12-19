"use strict";

var OnscreenSprites = Class.extend({
    init: function (sprites) {
        if (!sprites) {
            sprites = {};
        }

        this.player = sprites.player || [];
        this.enemies = sprites.enemies || [];
        this.bubbles = sprites.bubbles || [];
        this.walls = sprites.walls || [];

        this.sprites = [[this.player]].concat([this.bubbles], [this.walls], [this.enemies]);
    }
});
