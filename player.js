"use strict";

var Player = Sprite.extend({
    init: function (x, y) {
        this.x = x;
        this.y = y;
        this.jumping = 0;
        this.falling = false;
        this.shooting = 0;
        this.playerAnimations = new PlayerAnimations();
        this.moveSpeed = 4;
        this.control = new Control();
    },

    update: function (args) {
        var collisionDetector = args.collisionDetector;
        var gameController = args.gameController;

        this.respondToControls(collisionDetector, gameController);

        this.playerAnimations.changeAnimation();

        if (this.shooting) {
            this.shootingUpdate();
        }

        if (this.jumping) {
            this.jumpingUpdate();
        }
        else if (!(collisionDetector.isBubStandingOnFloor() || collisionDetector.isBubStandingOnBubble())) {
            this.fall();
        }
        else {
            this.falling = false;
            this.playerAnimations.stopFalling();
        }
    },

    respondToControls: function (collisionDetector, gameController) {
        if (this.control.isHoldingRight() && collisionDetector.noWallToRight(this)) {
            this.moveRight();
        }

        if (this.control.isHoldingLeft() && collisionDetector.noWallToLeft(this)) {
            this.moveLeft();
        }

        if (!this.control.isHoldingLeft() && !this.control.isHoldingRight() && !this.jumping && !this.falling && !this.shooting) {
            this.playerAnimations.stand();
        }

        if (this.control.isJumping()) {
            this.jump();
        }

        if (this.control.isShooting()) {
            this.shoot(gameController);
        }
    },

    shootingUpdate: function () {
        this.shooting += 1;
        
        if (this.shooting > 35) {
            this.shooting = 0;
        }
    },

    jumpingUpdate: function () {
        this.y -= 4;

        this.jumping++;
        if (this.jumping > 35) {
            this.jumping = 0;
            this.falling = true;
        }
    },

    moveRight: function () {
        this.playerAnimations.moveRight();
        this.x += this.moveSpeed;
    },

    moveLeft: function () {
        this.playerAnimations.moveLeft();
        this.x -= this.moveSpeed;
    },

    fall: function () {
        this.playerAnimations.fall();
        this.falling = true;
        this.y += 3;
    },

    jump: function () {
        if (this.jumping || this.falling) {
            return;
        }
        this.playerAnimations.jump();
        this.jumping = 1;
    },

    shoot: function (gameController) {
        if (this.shooting) {
            return;
        }
        this.shooting = 1;
        this.playerAnimations.shoot();
        
        this.createBubble(gameController);
    },

    getCurrentImage: function () {
        return this.playerAnimations.getImageName();
    },

    createBubble: function (gameController) {
        var x;
        if (this.playerAnimations.direction === RIGHT) {
            x = this.x + this.width() / 2;
        }
        else {
            x = this.x - this.width() / 2;
        }
        gameController.bubbles.push(new Bubble(x, this.y, this.playerAnimations.direction));
    }
});

