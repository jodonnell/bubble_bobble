"use strict";

var Bubble = Sprite.extend({
    init: function (x, y, direction) {
        this.x = x;
        this.y = y;
        this.currentImage = 'smallestBubble';
        this.direction = direction;
        this.timer = 0;
        this.trapped = false;
        this.fullyFormed = false;
    },

    update: function (args) {
        var onscreenSprites = args.onscreenSprites;
        var collisionDetector = args.collisionDetector;
        var collidedWith;

        this.timer++;

        if (this.trapped) {
            if (this.timer % 10 === 0) {
                this.changeFrame();
            }
        }

        if (this.isFullyFormed()) {
            this.floatUp(onscreenSprites);
        }
        else {
            collidedWith = collisionDetector.doesCollideWithSprites(this, onscreenSprites.enemies);
            if (collidedWith) {
                this.trap(onscreenSprites, collidedWith);
                return;
            }

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
            this.fullyFormed = true;
        }
        else if (this.currentImage === 'blueMagooTrappedRight') {
            this.currentImage = 'blueMagooTrappedLeft';
        }
        else if (this.currentImage === 'blueMagooTrappedLeft') {
            this.currentImage = 'blueMagooTrappedRight';
        }

    },

    isFullyFormed: function () {
        return this.fullyFormed;
    },

    trap: function (onscreenSprites, collidedWith) {
        this.x = collidedWith.x;
        this.y = collidedWith.y;
        this.trapped = true;
        this.currentImage = 'blueMagooTrappedRight';
        this.fullyFormed = true;

        var index = onscreenSprites.enemies.indexOf(collidedWith);
        onscreenSprites.enemies.splice(index, 1);
    },

    hasEnemy: function () {
        return this.trapped;
    },

    pop: function (onscreenSprites) {
        var index = onscreenSprites.bubbles.indexOf(this);
        onscreenSprites.bubbles.splice(index, 1);
    }

});
