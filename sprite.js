"use strict";

var Sprite = Class.extend({
    draw: function () {
        var image = gameImages[this.getCurrentImage()];
        gameContext.drawImage(image, this.x, this.y);
    },

    height: function () {
        return gameImages[this.getCurrentImage()].height;
    },

    width: function () {
        return gameImages[this.getCurrentImage()].width;
    },

    getCurrentImage: function () {
        return this.currentImage;
    },

    rightSide: function () {
        return this.x + this.width();
    },

    bottomSide: function () {
        return this.y + this.height();
    },

    update: function () {

    }
});
