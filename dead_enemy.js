"use strict";

var DeadEnemy = Sprite.extend({
    init: function (x, y) {
        this.x = x;
        this.y = y;

        this.currentImage = 'blueMagooDead';
        this.timer = 0;
    }
});
