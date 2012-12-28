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
        this.dead = 0;
        this.invincible = 0;
        this.score = 0;
    },

    update: function (args) {
        var collisionDetector = args.collisionDetector;
        var onscreenSprites = args.onscreenSprites;

        if (!this.dead) {
            this._respondToControls(collisionDetector, onscreenSprites);
        }

        this.playerAnimations.changeAnimation();

        if (this.dead) {
            this._deadUpdate();
            return;
        }

        if (this.isInvincible()) {
            this.invincible++;
            if (this.invincible > 150) {
                this.invincible = 0;
            }
        }

        if (this.shooting) {
            this._shootingUpdate();
        }

        if (this.jumping) {
            this._jumpingUpdate();
        }
        else if (!(collisionDetector.isStandingOnObjects(this, onscreenSprites.walls))) {
            this.fall();
        }
        else {
            this.falling = false;
            this.playerAnimations.stopFalling();
        }
        this._checkForPoppingBubble(onscreenSprites, collisionDetector);

        if (!this.invincible) {
            this._checkForDeath(onscreenSprites, collisionDetector);
        }

        this._checkForCollectibles(onscreenSprites, collisionDetector);
    },

    _respondToControls: function (collisionDetector, onscreenSprites) {
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
            this.shoot(onscreenSprites);
        }
    },

    _shootingUpdate: function () {
        this.shooting += 1;
        
        if (this.shooting > 35) {
            this.shooting = 0;
        }
    },

    _jumpingUpdate: function () {
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

    shoot: function (onscreenSprites) {
        if (this.shooting) {
            return;
        }
        this.shooting = 1;
        this.playerAnimations.shoot();
        
        this._createBubble(onscreenSprites);
    },

    getCurrentImage: function () {
        return this.playerAnimations.getImageName();
    },

    _createBubble: function (onscreenSprites) {
        var x;
        if (this.playerAnimations.direction === RIGHT) {
            x = this.x + this.width() / 2;
        }
        else {
            x = this.x - this.width() / 2;
        }
        onscreenSprites.bubbles.push(new Bubble(x, this.y, this.playerAnimations.direction));
    },
    
    isDead: function () {
        return this.dead;
    },

    isInvincible: function () {
        return this.invincible;
    },

    _checkForPoppingBubble: function (onscreenSprites, collisionDetector) {
        var bubble = collisionDetector.doesCollideWithSprites(this, onscreenSprites.bubbles);
        if (bubble && bubble.isFullyFormed()) {
            var direction;
            if (this.x < bubble.x + bubble.width() / 2) {
                direction = RIGHT;
            }
            else {
                direction = LEFT;
            }
            bubble.pop(onscreenSprites, direction);
        }
    },

    _checkForDeath: function (onscreenSprites, collisionDetector) {
        if (!this.dead && collisionDetector.doesCollideWithSprites(this, onscreenSprites.enemies)) {
            this.dead = 1;
            this.playerAnimations.die();
        }
    },

    _checkForCollectibles: function (onscreenSprites, collisionDetector) {
        var collectible = collisionDetector.doesCollideWithSprites(this, onscreenSprites.collectibles);
        if (collectible) {        
            onscreenSprites.collectibles.remove(collectible);
            this.score += collectible.points;
            onscreenSprites.texts.push(new Text(collectible.x, collectible.y + 30, collectible.points));
        }
    },

    draw: function () {
        if (!this.isInvincible() || this.invincible % 2 === 0) {
            this._super();
        }
    },

    _deadUpdate: function () {
        this.dead++;
        if (this.dead <= 50) {
            return;
        }

        this.dead = 0;
        this.x = 100;
        this.y = 100;
        this.shooting = 0;
        this.jumping = 0;
        this.invincible = 1;
    }
});

