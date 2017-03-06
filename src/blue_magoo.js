"use strict";

class BlueMagoo extends Sprite {
    get JUMP_HEIGHT() {
        return 100;
    }

    constructor(id, x, y, direction) {
        super();
        this.id = id;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.jumping = 0;

        this.currentImage = 'blueMagooWalk';
        this.timer = 0;
    }

    update(args) {
        var collisionDetector = args.collisionDetector;
        var followX = args.onscreenSprites.players[0].x;
        var followY = args.onscreenSprites.players[0].y;
        var onscreenSprites = args.onscreenSprites;

        this.timer++;

        this.changeAnimation();

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
    }

    changeAnimation() {
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
    }

    shouldTrack() {
        return Math.random() > 0.99;
    }

    move(collisionDetector, followX, followY, walls) {
        if (this.shouldTrack())  {
            this.track(collisionDetector, followX, followY, walls);
        }
        else {
            this.moveInCurrentDirection();
            this.boundaryCheck(collisionDetector);
        }
    }

    moveInCurrentDirection() {
        if (this.direction === RIGHT) {
            this.x += 3;
        }
        else {
            this.x -= 3;
        }
    }

    track(collisionDetector, followX, followY, walls) {
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
    }

    getCurrentImage() {
        var imageName = this.currentImage;
        if (this.direction === LEFT) {
            imageName += 'Left';
        }
        else {
            imageName += 'Right';
        }
        return imageName;
    }

    boundaryCheck(collisionDetector) {
        this.moveSpeed = 0;
        if (!collisionDetector.noWallToRight(this)) {
            this.direction = LEFT;
        }
        if (!collisionDetector.noWallToLeft(this)) {
            this.direction = RIGHT;
        }
    }

    isJumping() {
        return this.jumping;
    }

    isTrapped() {
        return this.trapped;
    }

    switchDirection() {
        if (this.direction === RIGHT) {
            this.direction = LEFT;
        }
        else {
            this.direction = RIGHT;
        }
    }
}

if (typeof exports !== 'undefined') {
    exports.BlueMagoo = BlueMagoo;
}
