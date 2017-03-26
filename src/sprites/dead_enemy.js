"use strict";

class DeadEnemy extends Sprite {
    constructor(x, y, direction) {
        super();
        this.x = x;
        this.y = y;
        this.direction = direction;

        this.originalY = y;

        this.currentImage = 'deadEnemyRight';
        this.timer = 0;
        this.parabolaTimer = 0;
    }

    update(args) {
        this.switchDirectionIfHitWall();
        this.move();
        this.changeAnimation();
        this.changeToFruit(args.onscreenSprites, args.collisionDetector);
    }

    move() {
        this.parabolaTimer += 2;
        this.y = this.originalY - Math.round(-0.005 * Math.pow(this.parabolaTimer - 200, 2) + 200);

        if (this.direction === RIGHT) {
            this.x += 2;
        }
        else {
            this.x -= 2;
        }
    }

    switchDirectionIfHitWall() {
        if (this.rightSide() >= RIGHT_BOUND) {
            this.direction = LEFT;
        }
        else if (this.x <= LEFT_BOUND) {
            this.direction = RIGHT;
        }
    }

    changeAnimation() {
        this.timer++;

        if (this.timer !== 3) {
            return;
        }

        this.timer = 0;
        if (this.currentImage === 'deadEnemyRight') {
            this.currentImage = 'deadEnemyBottom';
        }
        else if (this.currentImage === 'deadEnemyBottom') {
            this.currentImage = 'deadEnemyLeft';
        }
        else if (this.currentImage === 'deadEnemyLeft') {
            this.currentImage = 'deadEnemyTop';
        }
        else if (this.currentImage === 'deadEnemyTop') {
            this.currentImage = 'deadEnemyRight';
        }
    }

    changeToFruit(onscreenSprites, collisionDetector) {
        if (this.y >= this.originalY) {
            if (collisionDetector.isStandingOnObjects(this, onscreenSprites.walls)) {
                onscreenSprites.collectibles.push(new Pepper(this.x, this.y));
                onscreenSprites.deadEnemies.remove(this);
            }
        }
    }
}

if (typeof exports !== 'undefined') {
    exports.DeadEnemy = DeadEnemy;
}
