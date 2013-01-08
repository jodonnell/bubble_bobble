"use strict";

var Wall = Sprite.extend({
    init: function (x, y) {
        this.x = x;
        this.y = y;
        this.currentImage = 'wall';
    }
});

if (typeof exports !== 'undefined') {
    exports.Wall = Wall;
}
