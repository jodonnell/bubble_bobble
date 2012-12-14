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
        if (this.isShooting()) {
            this.queuedImage = 'bubJump';
            return;
        }
        this.currentImage = 'bubJump';
        this.timer = 0;
    },

    fall: function () {
        if (this.isFalling()) {
            return;
        }

        if (this.currentImage === 'bubShoot') {
            this.queuedImage = 'bubFall';
            return;
        }
        this.currentImage = 'bubFall';
        this.timer = 0;
    },

    moveRight: function () {
        this.direction = RIGHT;

        if (this.isMovingRight()) {
            return;
        }

        if (this.isJumping() || this.isFalling() || this.isShooting()) {
            this.queuedImage = 'bubWalk';
            return;
        }

        this.currentImage = 'bubWalk';
        this.timer = 0;
    },

    moveLeft: function () {
        this.direction = LEFT;
        if (this.isMovingLeft()) {
            return;
        }

        if (this.isJumping() || this.isFalling() || this.isShooting()) {
            this.queuedImage = 'bubWalk';
            return;
        }

        this.currentImage = 'bubWalk';
        this.timer = 0;
    },

    stopFalling: function () {
        if (!this.isFalling()) {
            return;
        }

        this.currentImage = this.queuedImage;
        this.timer = 0;
    },

    stand: function () {
        if (this.isStanding()) {
            return;
        }

        this.currentImage = 'bub';
        this.timer = 0;
    },

    isShooting: function () {
        return this.currentImage === 'bubShoot';
    },

    isStanding: function () {
        return this.currentImage === 'bub' || this.currentImage === 'bubTail';
    },

    isMovingLeft: function () {
        return this.direction === LEFT && (this.currentImage === 'bubWalk' || this.currentImage === 'bubWalkTail');
    },

    isMovingRight: function () {
        return this.direction === RIGHT && (this.currentImage === 'bubWalk' || this.currentImage === 'bubWalkTail');
    },

    isFalling: function () {
        return this.currentImage === 'bubFall' || this.currentImage === 'bubFallTail';
    },

    isJumping: function () {
        return this.currentImage === 'bubJump' || this.currentImage === 'bubJumpTail';
    },

    changeAnimation: function () {
        this.timer++;
        
        if (this.isShooting() && this.timer === 15) {
            this.timer = 0;
            this.currentImage = this.queuedImage;
        }
            
        if (this.isFalling()) {
            this.fallingAnimation();
        }
        else if (this.isStanding()) {
            this.standingAnimation();
        }
        else if (this.isMovingRight() || this.isMovingLeft()) {
            this.walkingRightAnimation();
        }
        else if (this.isJumping()) {
            this.jumpingAnimation();
        }
    },

    fallingAnimation: function () {
        this.transitionState('bubFall', 'bubFallTail');
    },

    standingAnimation: function () {
        this.transitionState('bub', 'bubTail');
    },

    jumpingAnimation: function () {
        this.transitionState('bubJump', 'bubJumpTail');
    },

    walkingRightAnimation: function () {
        this.transitionState('bubWalk', 'bubWalkTail');
    },

    transitionState: function (animationA, animationB) {
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
        if (this.direction === LEFT) {
            imageName += 'Left';
        }
        else {
            imageName += 'Right';
        }
        return imageName;
    }
});
