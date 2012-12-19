"use strict";

var OnscreenSprites = Class.extend({
    init: function () {
        this.player = new Player(200, 100);
        this.walls = (new LevelBuilder(this.walls)).walls;
        this.bubbles = [];
        this.enemies = [new BlueMagoo(370, 20, LEFT), new BlueMagoo(370, 70, LEFT), new BlueMagoo(370, 120, LEFT)];
        this.sprites = [[this.player]].concat([this.bubbles], [this.walls], [this.enemies]);
    }
});
