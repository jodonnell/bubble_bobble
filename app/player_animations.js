import {RIGHT, LEFT} from './constants';

class PlayerAnimations {

    get ANIMATION_LENGTH() {
        return 20;
    }

    constructor(prefix) {
        this.timer = 0;
        this.currentImage = '';
        this.direction = RIGHT;
        this.queuedImage = '';
        this.prefix = prefix;
    }

    shoot() {
        this.currentImage = 'Shoot';
        this.timer = 0;
    }

    jump() {
        if (this._isShooting()) {
            this.queuedImage = 'Jump';
            return;
        }
        this.currentImage = 'Jump';
        this.timer = 0;
    }

    fall() {
        if (this._isFalling()) {
            return;
        }

        if (this.currentImage === 'Shoot') {
            this.queuedImage = 'Fall';
            return;
        }
        this.currentImage = 'Fall';
        this.timer = 0;
    }

    die() {
        this.currentImage = 'Die';
        this.timer = 0;
    }

    moveRight() {
        this.direction = RIGHT;

        if (this._isMovingRight()) {
            return;
        }

        if (this._isJumping() || this._isFalling() || this._isShooting()) {
            this.queuedImage = 'Walk';
            return;
        }

        this.currentImage = 'Walk';
        this.timer = 0;
    }

    moveLeft() {
        this.direction = LEFT;
        if (this._isMovingLeft()) {
            return;
        }

        if (this._isJumping() || this._isFalling() || this._isShooting()) {
            this.queuedImage = 'Walk';
            return;
        }

        this.currentImage = 'Walk';
        this.timer = 0;
    }

    stopFalling() {
        if (!this._isFalling()) {
            return;
        }

        this.currentImage = this.queuedImage;
        this.timer = 0;
    }

    stand() {
        if (this._isStanding()) {
            return;
        }

        this.currentImage = '';
        this.timer = 0;
    }

    _isShooting() {
        return this.currentImage === 'Shoot';
    }

    _isDead() {
        return this.currentImage.indexOf('Die') !== -1;
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
        this.timer++;

        if (this._isShooting() && this.timer === 15) {
            this.timer = 0;
            this.currentImage = this.queuedImage;
        }

        if (this._isFalling()) {
            this._fallingAnimation();
        }
        else if (this._isStanding()) {
            this._standingAnimation();
        }
        else if (this._isMovingRight() || this._isMovingLeft()) {
            this._walkingRightAnimation();
        }
        else if (this._isJumping()) {
            this._jumpingAnimation();
        }
        else if (this._isDead()) {
            this._deathAnimation();
        }
    }

    _fallingAnimation() {
        this._transitionState('Fall', 'FallTail');
    }

    _standingAnimation() {
        this._transitionState('', 'Tail');
    }

    _jumpingAnimation() {
        this._transitionState('Jump', 'JumpTail');
    }

    _walkingRightAnimation() {
        this._transitionState('Walk', 'WalkTail');
    }

    _deathAnimation() {
        if (this.timer === 8) {
            this.timer = 0;

            if (this.currentImage === 'Die') {
                this.currentImage = 'Die90';
            }
            else if (this.currentImage === 'Die90') {
                this.currentImage = 'Die180';
            }
            else if (this.currentImage === 'Die180') {
                this.currentImage = 'Die270';
            }
            else if (this.currentImage === 'Die270') {
                this.currentImage = 'Die';
            }
        }
    }

    _transitionState(animationA, animationB) {
        if (this.timer === this.ANIMATION_LENGTH) {
            this.timer = 0;

            if (this.currentImage === animationA) {
                this.currentImage = animationB;
            }
            else if (this.currentImage === animationB) {
                this.currentImage = animationA;
            }
        }
    }

    getImageName() {
        var imageName = this.prefix + this.currentImage;

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
