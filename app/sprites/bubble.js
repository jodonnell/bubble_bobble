import Sprite from './sprite';
import {LEFT, RIGHT} from '../constants';
import LinearAnimation from '../animations/linear_animation';
import DeadEnemy from './dead_enemy';
import CollisionDetector from '../collision_detector';

class Bubble extends Sprite {
    constructor(x, y, direction, playerNum) {
        super();
        this.x = x;
        this.y = y;
        this.originalY = this.y;
        this._playerNum = playerNum;
        this.currentImage = 'smallestBubble';
        this.direction = direction;
        this.trapped = false;
        this.fullyFormed = false;
        this.moveSpeed = 5;
        this.liveTime = 999;

        this.shootOutAnimation = new LinearAnimation(7, ['smallestBubble', 'smallBubble', 'mediumBubble', 'bigBubble'], 1);
        this.enemyWiggleAnimation = new LinearAnimation(10, ['blueMagooTrappedRight', 'blueMagooTrappedLeft']);
    }

    update(args) {
        this.liveTime -= 1;
        if (this.liveTime === 0) {
            if (args.onscreenSprites.hasSprite(this)) {
                this.pop(args.onscreenSprites);
            }
            return;
        }

        if (this.trapped) {
            this.currentImage = this.enemyWiggleAnimation.update();
        }

        if (this.isFullyFormed()) {
            this.updateFullyFormed(args.onscreenSprites);
        }
        else {
            this.updateShootingOut(args.onscreenSprites);
        }
    }

    updateFullyFormed(onscreenSprites) {
        this.floatUp();
        this.checkForCollideWithAnotherBubble(onscreenSprites);
    }

    pushBubbleAwayX(bubble) {
        if (this.x > bubble.x) {
            this.x += 2;
        }
        else if (this.x < bubble.x) {
            this.x -= 2;
        }
        else {
            this.x += this._randomMove() * 2;
        }
    }

    pushBubbleAwayY() {
        this.y -= this._randomMove() * 2;
    }

    checkForCollideWithAnotherBubble(onscreenSprites) {
        const bubble = CollisionDetector.doesCollideWithSprites(this, onscreenSprites.bubbles);
        if (!bubble) {
            return;
        }

        this.pushBubbleAwayX(bubble);
        this.pushBubbleAwayY();
    }

    updateShootingOut(onscreenSprites) {
        const collidedWithEnemy = CollisionDetector.doesCollideWithSprites(this, onscreenSprites.enemies);
        if (collidedWithEnemy) {
            this.trap(onscreenSprites, collidedWithEnemy);
            return;
        }

        this.shootOut();
    }

    _randomMove() {
        let randomNumber = Math.floor(Math.random()*2);
        if (randomNumber === 1) {
            return -1;
        }
        else {
            return 1;
        }
    }

    floatUp() {
        if (this.isAtTop()) {
            this.floatTowardsCenter();
            return;
        }

        this.y += 2;
    }

    floatTowardsCenter() {
        if (this.x > 400) {
            this.x -= 1;
        }
        else if (this.x < 400) {
            this.x += 1;
        }
    }

    isAtTop() {
        return this.y >= this.originalY + 400;
    }

    shootOut() {
        if (this.direction === RIGHT && CollisionDetector.noWallToRight(this)) {
            this.x += this.moveSpeed;
        }
        else if (this.direction === LEFT && CollisionDetector.noWallToLeft(this)){
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

    trap(onscreenSprites, enemy) {
        this.x = enemy.x;
        this.y = enemy.y;
        this.trapped = true;
        this.fullyFormed = true;

        onscreenSprites.enemies.remove(enemy);
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
        return this.currentImage;
    }
}

export default Bubble;
