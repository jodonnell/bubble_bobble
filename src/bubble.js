"use strict";

class Bubble extends Sprite {
    constructor(id, x, y, direction, playerNum) {
        super();
        this.id = id;
        this.x = x;
        this.y = y;
        this._playerNum = playerNum;
        this.currentImage = 'smallestBubble';
        this.direction = direction;
        this.timer = 0;
        this.trapped = false;
        this.fullyFormed = false;
        this.moveSpeed = 5;
    }

    update(args) {
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
            var bubble = collisionDetector.doesCollideWithSprites(this, onscreenSprites.bubbles);
            if (bubble) {
                if (this.x > bubble.x) {
                    this.x += 2;
                }
                else if (this.x < bubble.x) {
                    this.x -= 2;
                }
                else {
                    this.x += this._randomMove() * 2;
                }
                this.y += this._randomMove() * 2;
            }
        }
        else {
            collidedWith = collisionDetector.doesCollideWithSprites(this, onscreenSprites.enemies);
            if (collidedWith) {
                this.trap(onscreenSprites, collidedWith);
                return;
            }

            this.shootOut(collisionDetector);
        }
    }

    _randomMove() {
        var randomNumber = Math.floor(Math.random()*2);
        if (randomNumber === 1) {
            return -1;
        }
        else {
            return 1;
        }
    }

    floatUp(onscreenSprites) {
        if (this.y <= 70) {
            if (this.x > 400) {
                this.x -= 1;
            }
            else if (this.x < 400) {
                this.x += 1;
            }
            return;
        }

        this.y -= 2;
    }

    shootOut(collisionDetector) {
        if (this.direction === RIGHT && collisionDetector.noWallToRight(this)) {
            this.x += this.moveSpeed;
        }
        else if (this.direction === LEFT && collisionDetector.noWallToLeft(this)){
            this.x -= this.moveSpeed;
        }

        if (this.timer % 7 === 0) {
            this.changeFrame();
        }
    }

    changeFrame() {
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
    }

    isFullyFormed() {
        return this.fullyFormed;
    }

    trap(onscreenSprites, collidedWith) {
        this.x = collidedWith.x;
        this.y = collidedWith.y;
        this.trapped = true;
        this.currentImage = 'blueMagooTrappedRight';
        this.fullyFormed = true;

        onscreenSprites.enemies.remove(collidedWith);
    }

    hasEnemy() {
        return this.trapped;
    }

    pop(onscreenSprites, direction) {
        if (this.hasEnemy()) {
            onscreenSprites.deadEnemies.push(new DeadEnemy(this.x, this.y, direction));
        }

        onscreenSprites.bubbles.remove(this);
    }

    getCurrentImage() {
        if (this._playerNum === 1) {
            return this.currentImage;
        }

        return this.currentImage.replace('Bub', 'Bob');
    }
}

if (typeof exports !== 'undefined') {
    exports.Bubble = Bubble;
}
