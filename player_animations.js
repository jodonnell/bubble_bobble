"use strict";

var PlayerAnimations = Class.extend({
    ANIMATION_LENGTH: 20,

    init: function (prefix) {
        this.timer = 0;
        this.currentImage = '';
        this.direction = RIGHT;
        this.queuedImage = '';
        this.prefix = prefix;
    },

    shoot: function () {
        this.currentImage = 'Shoot';
        this.timer = 0;
    },

    jump: function () {
        if (this._isShooting()) {
            this.queuedImage = 'Jump';
            return;
        }
        this.currentImage = 'Jump';
        this.timer = 0;
    },

    fall: function () {
        if (this._isFalling()) {
            return;
        }

        if (this.currentImage === 'Shoot') {
            this.queuedImage = 'Fall';
            return;
        }
        this.currentImage = 'Fall';
        this.timer = 0;
    },

    die: function () {
        this.currentImage = 'Die';
        this.timer = 0;
    },

    moveRight: function () {
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
    },

    moveLeft: function () {
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
    },

    stopFalling: function () {
        if (!this._isFalling()) {
            return;
        }

        this.currentImage = this.queuedImage;
        this.timer = 0;
    },

    stand: function () {
        if (this._isStanding()) {
            return;
        }

        this.currentImage = '';
        this.timer = 0;
    },

    _isShooting: function () {
        return this.currentImage === 'Shoot';
    },

    _isDead: function () {
        return this.currentImage.indexOf('Die') !== -1;
    },

    _isStanding: function () {
        return this.currentImage === '' || this.currentImage === 'Tail';
    },

    _isMovingLeft: function () {
        return this.direction === LEFT && (this.currentImage === 'Walk' || this.currentImage === 'WalkTail');
    },

    _isMovingRight: function () {
        return this.direction === RIGHT && (this.currentImage === 'Walk' || this.currentImage === 'WalkTail');
    },

    _isFalling: function () {
        return this.currentImage === 'Fall' || this.currentImage === 'FallTail';
    },

    _isJumping: function () {
        return this.currentImage === 'Jump' || this.currentImage === 'JumpTail';
    },

    changeAnimation: function () {
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
    },

    _fallingAnimation: function () {
        this._transitionState('Fall', 'FallTail');
    },

    _standingAnimation: function () {
        this._transitionState('', 'Tail');
    },

    _jumpingAnimation: function () {
        this._transitionState('Jump', 'JumpTail');
    },

    _walkingRightAnimation: function () {
        this._transitionState('Walk', 'WalkTail');
    },

    _deathAnimation: function () {
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
    },

    _transitionState: function (animationA, animationB) {
        if (this.timer === this.ANIMATION_LENGTH) {
            this.timer = 0;

            if (this.currentImage === animationA) {
                this.currentImage = animationB;
            }
            else if (this.currentImage === animationB) {
                this.currentImage = animationA;
            }
        }
    },

    getImageName: function () {
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
});
