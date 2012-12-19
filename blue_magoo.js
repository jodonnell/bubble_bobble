"use strict";

var BlueMagoo = Sprite.extend({
    JUMP_HEIGHT: 100,

    init: function (x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.jumping = 0;

        this.currentImage = 'blueMagooWalk';
        this.timer = 0;
        this.trapped = false;
    },

    update: function (args) {
        var collisionDetector = args.collisionDetector;
        var followX = args.onscreenSprites.player.x;
        var followY = args.onscreenSprites.player.y;
        var onscreenSprites = args.onscreenSprites;

        this.timer++;

        this.changeAnimation();

        if (collisionDetector.doesCollideWithSprites(this, onscreenSprites.bubbles)) {
            this.trap();
        }
        
        if (this.trapped) {
            return;
        }

        if (this.isJumping()) {
            this.y -= 3;
            this.jumping++;
            if (this.jumping > 50) {
                this.jumping = 0;
            }
        }
        else if (collisionDetector.isStandingOnObjects(this, onscreenSprites.walls)) {
            this.move(collisionDetector, followX, followY, onscreenSprites.walls);
        }
        else {
            this.y += 3;
        }
    },

    trap: function () {
        this.trapped = true;
        this.currentImage = 'blueMagooTrapped';
    },

    changeAnimation: function () {
        if (this.timer !== 10) {
            return;
        }

        if (this.currentImage === 'blueMagooWalk') {
            this.currentImage = 'blueMagooWalkLeg';
        }
        else if (this.currentImage === 'blueMagooWalkLeg') {
            this.currentImage = 'blueMagooWalk';
        }
        else if (this.currentImage === 'blueMagooTrapped') {
            this.switchDirection();
        }
        this.timer = 0;
    },

    shouldTrack: function () {
        return Math.random() > 0.99;
    },

    move: function (collisionDetector, followX, followY, walls) {
        if (this.shouldTrack())  {
            this.track(collisionDetector, followX, followY, walls);
        }
        else {
            this.moveInCurrentDirection();
            this.boundaryCheck(collisionDetector);
        }
    },

    moveInCurrentDirection: function () {
        if (this.direction === RIGHT) {
            this.x += 3;
        }
        else {
            this.x -= 3;
        }
    },

    track: function (collisionDetector, followX, followY, walls) {
        if (this.y > followY) {
            if (collisionDetector.areSpritesAboveWithin(this, walls, 150)) {
                this.jumping = 1;
                return;
            }
        }

        if (followX === this.x) {
        }
        else if (followX > this.x) {
            this.direction = RIGHT;
            this.x += 3;
        }
        else {
            this.direction = LEFT;
            this.x -= 3;
        }
    },

    getCurrentImage: function () {
        var imageName = this.currentImage;
        if (this.direction === LEFT) {
            imageName += 'Left';
        }
        else {
            imageName += 'Right';
        }
        return imageName;
    },

    boundaryCheck: function (collisionDetector) {
        this.moveSpeed = 0;
        if (!collisionDetector.noWallToRight(this)) {
            this.direction = LEFT;
        }
        if (!collisionDetector.noWallToLeft(this)) {
            this.direction = RIGHT;
        }
    },

    isJumping: function () {
        return this.jumping;
    },

    isTrapped: function () {
        return this.trapped;
    },

    switchDirection: function () {
        if (this.direction === RIGHT) {
            this.direction = LEFT;
        }
        else {
            this.direction = RIGHT;
        }
    }
});
