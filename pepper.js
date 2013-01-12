"use strict";

var Pepper = Sprite.extend({
    init: function (x, y) {
        this.x = x;
        this.y = y;
        this.currentImage = 'pepper';
        this.points = 3000;
    }
});

if (typeof exports !== 'undefined') {
    exports.Pepper = Pepper;
}
