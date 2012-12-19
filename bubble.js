"use strict";

var Bubble = Sprite.extend({
    init: function (x, y, direction) {
        this.x = x;
        this.y = y;
        this.currentImage = 'smallestBubble';
        this.direction = direction;
        this.timer = 0;
    },

    update: function (args) {
        var onscreenSprites = args.onscreenSprites;

        this.timer++;

        if (this.isFullyFormed()) {
            this.floatUp(onscreenSprites);
        }
        else {
            this.shootOut();
        }
    },

    floatUp: function (onscreenSprites) {
        this.y -= 2;

        if (this.y + this.height() / 2 < 0) {
            var index = onscreenSprites.bubbles.indexOf(this);
            onscreenSprites.bubbles.splice(index, 1);
        }
    },
    
    shootOut: function () {
        if (this.direction === RIGHT) {
            this.x += 5;
        }
        else {
            this.x -= 5;
        }

        if (this.timer % 7 === 0) {
            this.changeFrame();
        }
    },

    changeFrame: function () {
        if (this.currentImage === 'smallestBubble') {
            this.currentImage = 'smallBubble';
        }
        else if (this.currentImage === 'smallBubble') {
            this.currentImage = 'mediumBubble';
        }
        else if (this.currentImage === 'mediumBubble') {
            this.currentImage = 'bigBubble';
        }
    },

    isFullyFormed: function () {
        return this.currentImage === 'bigBubble';
    }
});
