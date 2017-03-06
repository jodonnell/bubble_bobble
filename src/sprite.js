"use strict";

class Sprite {
    draw() {
        var image = gameImages[this.getCurrentImage()];
        gameContext.drawImage(image, this.x, this.y);
    }

    height() {
        return gameImages[this.getCurrentImage()].height;
    }

    width() {
        return gameImages[this.getCurrentImage()].width;
    }

    getCurrentImage() {
        return this.currentImage;
    }

    rightSide() {
        return this.x + this.width();
    }

    bottomSide() {
        return this.y + this.height();
    }

    update() {

    }
}

if (typeof exports !== 'undefined') {
    exports.Sprite = Sprite;
}
