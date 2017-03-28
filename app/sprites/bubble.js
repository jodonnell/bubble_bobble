import Sprite from './sprite';
import {LEFT, RIGHT} from '../constants';
import LinearAnimation from '../animations/linear_animation';
import DeadEnemy from './dead_enemy';

class Bubble extends Sprite {
    constructor(x, y, direction, playerNum) {
        super();
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
        if (this.trapped) {
            this.currentImage = this.enemyWiggleAnimation.update();
        }

        if (this.isFullyFormed()) {
            this.updateFullyFormed(args.collisionDetector, args.onscreenSprites);
        }
        else {
            this.updateShootingOut(args.collisionDetector, args.onscreenSprites);
        }
    }

    updateFullyFormed(collisionDetector, onscreenSprites) {
        this.floatUp();
        this.checkForCollideWithAnotherBubble(collisionDetector, onscreenSprites);
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
        this.y += this._randomMove() * 2;
    }

    checkForCollideWithAnotherBubble(collisionDetector, onscreenSprites) {
        const bubble = collisionDetector.doesCollideWithSprites(this, onscreenSprites.bubbles);
        if (!bubble) {
            return;
        }

        this.pushBubbleAwayX(bubble);
        this.pushBubbleAwayY();
    }

    updateShootingOut(collisionDetector, onscreenSprites) {
        const collidedWithEnemy = collisionDetector.doesCollideWithSprites(this, onscreenSprites.enemies);
        if (collidedWithEnemy) {
            this.trap(onscreenSprites, collidedWithEnemy);
            return;
        }

        this.shootOut(collisionDetector);
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

        this.y -= 2;
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
        return this.y <= 70;
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
