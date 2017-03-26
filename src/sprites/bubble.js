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
        this.trapped = false;
        this.fullyFormed = false;
        this.moveSpeed = 5;

        this.shootOutAnimation = new LinearAnimation(7, ['smallestBubble', 'smallBubble', 'mediumBubble', 'bigBubble'], 1);
        this.enemyWiggleAnimation = new LinearAnimation(10, ['blueMagooTrappedRight', 'blueMagooTrappedLeft']);
    }

    update(args) {
        var onscreenSprites = args.onscreenSprites;
        var collisionDetector = args.collisionDetector;
        var collidedWith;

        if (this.trapped) {
            this.currentImage = this.enemyWiggleAnimation.update();
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

        this.currentImage = this.shootOutAnimation.update();
        if (this.shootOutAnimation.isOver()) {
            this.fullyFormed = true;
        }
    }

    isFullyFormed() {
        return this.fullyFormed;
    }

    trap(onscreenSprites, collidedWith) {
        this.x = collidedWith.x;
        this.y = collidedWith.y;
        this.trapped = true;
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
