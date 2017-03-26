"use strict";

class OnlineBlueMagoo extends Sprite {
    constructor(id, x, y, direction) {
        super();
        this.id = id;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.jumping = 0;

        this._coords = [];

        this.currentImage = 'blueMagooWalk';
        this.animation = new LinearAnimation(10, ['blueMagooWalk', 'blueMagooWalkLeg']);
    }

    update(args) {
        if (this._coords.length) {
            if (this._coords.length > 1) {
                this._coords.shift();
            }

            if (this._coords[0].x > this.x) {
                this.moveRight();
            }
            else if (this._coords[0].x < this.x) {
                this.moveLeft();
            }

            if (this._coords[0].y < this.y) {
                this.jump();
            }
            else if (this._shouldFall()) {
                this.fall();
            }

            if (this._coords[0].x === this.x && this._coords[0].y === this.y) {
                this._coords.shift();
            }
        }

        this.currentImage = this.animation.update();
    }

    addCoords(coordinate) {
        this._coords.push(coordinate);
    }

    moveRight() {
        this.direction = RIGHT;
        var diff = this._coords[0].x - this.x;
        this._move(4, diff);
    }

    moveLeft(moveTo) {
        this.direction = LEFT;

        var diff = this.x - this._coords[0].x;
        this._move(-4, diff);
    }

    _move(amount, diff) {
        var moveTo = this._coords[0].x;

        if (diff > 40) {
            this.x = moveTo;
        }
        else if (diff < 4) {
            this.x = moveTo;
        }
        else {
            this.x += amount;
        }
    }

    jump() {
        var diff = this.y - this._coords[0].y;
        if (diff < 4) {
            this.y = this._coords[0].y;
        }
        else {
            this.y -= 4;
        }
    }

    fall() {
        var diff = this._coords[0].y - this.y;
        if (diff < 4) {
            this.y = this._coords[0].y;
        }
        else {
            this.y += 4;
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

    isJumping() {
        return this.jumping;
    }

    isTrapped() {
        return this.trapped;
    }

    _shouldFall() {
        return this._coords[0].y > this.y;
    }
}

if (typeof exports !== 'undefined') {
    exports.OnlineBlueMagoo = OnlineBlueMagoo;
}
