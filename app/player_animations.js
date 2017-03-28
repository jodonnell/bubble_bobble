import {RIGHT, LEFT} from './constants';
import LinearAnimation from './animations/linear_animation';

class PlayerAnimations {
    constructor(prefix) {
        this.currentImage = '';
        this.direction = RIGHT;
        this.prefix = prefix;

        this.deathAnimation = new LinearAnimation(8, ['Die', 'Die90', 'Die180', 'Die270']);
        this.jumpingAnimation = new LinearAnimation(20, ['Jump', 'JumpTail']);
        this.standingAnimation = new LinearAnimation(20, ['', 'Tail']);
        this.fallingAnimation = new LinearAnimation(20, ['Fall', 'FallTail']);
        this.walkingAnimation = new LinearAnimation(20, ['Walk', 'WalkTail']);

        this.currentAnimation = this.standingAnimation;
        this.queuedAnimation = this.standingAnimation;
    }

    shoot() {
        this.currentAnimation = new LinearAnimation(15, ['Shoot'], 1);
    }

    jump() {
        if (this._isShooting()) {
            this.queuedAnimation = this.jumpingAnimation;
            return;
        }
        this.currentAnimation = this.jumpingAnimation;
    }

    fall() {
        if (this._isFalling()) {
            return;
        }

        if (this.currentImage === 'Shoot') {
            this.queuedAnimation = this.fallingAnimation;
            return;
        }

        this.currentAnimation = this.fallingAnimation;
    }

    die() {
        this.currentAnimation = this.deathAnimation;
    }

    moveRight() {
        this.direction = RIGHT;

        if (this._isMovingRight()) {
            return;
        }

        if (this._isJumping() || this._isFalling() || this._isShooting()) {
            this.queuedAnimation = this.walkingAnimation;
            return;
        }

        this.currentAnimation = this.walkingAnimation;
    }

    moveLeft() {
        this.direction = LEFT;
        if (this._isMovingLeft()) {
            return;
        }

        if (this._isJumping() || this._isFalling() || this._isShooting()) {
            this.queuedAnimation = this.walkingAnimation;
            return;
        }

        this.currentAnimation = this.walkingAnimation;
    }

    stopFalling() {
        if (!this._isFalling()) {
            return;
        }

        this.currentAnimation = this.queuedAnimation;
    }

    stand() {
        if (this._isStanding() || this._isShooting()) {
            return;
        }

        this.currentAnimation = this.standingAnimation;
    }

    _isShooting() {
        return this.currentImage === 'Shoot';
    }

    _isStanding() {
        return this.currentImage === '' || this.currentImage === 'Tail';
    }

    _isMovingLeft() {
        return this.direction === LEFT && (this.currentImage === 'Walk' || this.currentImage === 'WalkTail');
    }

    _isMovingRight() {
        return this.direction === RIGHT && (this.currentImage === 'Walk' || this.currentImage === 'WalkTail');
    }

    _isFalling() {
        return this.currentImage === 'Fall' || this.currentImage === 'FallTail';
    }

    _isJumping() {
        return this.currentImage === 'Jump' || this.currentImage === 'JumpTail';
    }

    changeAnimation() {
        if (this._isShooting() && this.currentAnimation.isOver()) {
            this.currentAnimation = this.queuedAnimation;
        }

        this.currentImage = this.currentAnimation.update();
    }

    getImageName() {
        let imageName = this.prefix + this.currentImage;

        if (this.currentImage.indexOf('Die') !== -1) {
            return imageName;
        }

        if (this.direction === LEFT) {
            imageName += 'Left';
        }
        else {
            imageName += 'Right';
        }
        return imageName;
    }
}

export default PlayerAnimations;
