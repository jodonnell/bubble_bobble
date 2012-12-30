"use strict";

var PlayerAnimations = Class.extend({
    ANIMATION_LENGTH: 20,

    init: function () {
        this.timer = 0;
        this.currentImage = 'bub';
        this.direction = RIGHT;
        this.queuedImage = "bub";
    },

    shoot: function () {
        this.currentImage = 'bubShoot';
        this.timer = 0;
    },

    jump: function () {
        if (this._isShooting()) {
            this.queuedImage = 'bubJump';
            return;
        }
        this.currentImage = 'bubJump';
        this.timer = 0;
    },

    fall: function () {
        if (this._isFalling()) {
            return;
        }

        if (this.currentImage === 'bubShoot') {
            this.queuedImage = 'bubFall';
            return;
        }
        this.currentImage = 'bubFall';
        this.timer = 0;
    },

    die: function () {
        this.currentImage = 'bubDie';
        this.timer = 0;
    },

    moveRight: function () {
        this.direction = RIGHT;

        if (this._isMovingRight()) {
            return;
        }

        if (this._isJumping() || this._isFalling() || this._isShooting()) {
            this.queuedImage = 'bubWalk';
            return;
        }

        this.currentImage = 'bubWalk';
        this.timer = 0;
    },

    moveLeft: function () {
        this.direction = LEFT;
        if (this._isMovingLeft()) {
            return;
        }

        if (this._isJumping() || this._isFalling() || this._isShooting()) {
            this.queuedImage = 'bubWalk';
            return;
        }

        this.currentImage = 'bubWalk';
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

        this.currentImage = 'bub';
        this.timer = 0;
    },

    _isShooting: function () {
        return this.currentImage === 'bubShoot';
    },

    _isDead: function () {
        return this.currentImage.indexOf('Die') !== -1;
    },

    _isStanding: function () {
        return this.currentImage === 'bub' || this.currentImage === 'bubTail';
    },

    _isMovingLeft: function () {
        return this.direction === LEFT && (this.currentImage === 'bubWalk' || this.currentImage === 'bubWalkTail');
    },

    _isMovingRight: function () {
        return this.direction === RIGHT && (this.currentImage === 'bubWalk' || this.currentImage === 'bubWalkTail');
    },

    _isFalling: function () {
        return this.currentImage === 'bubFall' || this.currentImage === 'bubFallTail';
    },

    _isJumping: function () {
        return this.currentImage === 'bubJump' || this.currentImage === 'bubJumpTail';
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
        this._transitionState('bubFall', 'bubFallTail');
    },

    _standingAnimation: function () {
        this._transitionState('bub', 'bubTail');
    },

    _jumpingAnimation: function () {
        this._transitionState('bubJump', 'bubJumpTail');
    },

    _walkingRightAnimation: function () {
        this._transitionState('bubWalk', 'bubWalkTail');
    },

    _deathAnimation: function () {
        if (this.timer === 8) {
            this.timer = 0;

            if (this.currentImage === 'bubDie') {
                this.currentImage = 'bubDie90';
            }
            else if (this.currentImage === 'bubDie90') {
                this.currentImage = 'bubDie180';
            }
            else if (this.currentImage === 'bubDie180') {
                this.currentImage = 'bubDie270';
            }
            else if (this.currentImage === 'bubDie270') {
                this.currentImage = 'bubDie';
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
        var imageName = this.currentImage;

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
