"use strict";

var Player = Sprite.extend({
    init: function (x, y) {
        this.x = x;
        this.y = y;
        this.moveSpeed = 4;

        this._jumping = 0;
        this._falling = false;
        this._shooting = 0;
        this._playerAnimations = new PlayerAnimations();
        this._control = new Control();
        this._dead = 0;
        this._invincible = 0;
        this._score = 0;
    },

    update: function (args) {
        var collisionDetector = args.collisionDetector;
        var onscreenSprites = args.onscreenSprites;

        this._respondToControls(collisionDetector, onscreenSprites);
        this._playerAnimations.changeAnimation();
        this._updateState(onscreenSprites, collisionDetector);
        this._checkForCollisions(onscreenSprites, collisionDetector);
    },

    _respondToControls: function (collisionDetector, onscreenSprites) {
        if (this._dead) {
            return;
        }

        if (this._control.isHoldingRight() && collisionDetector.noWallToRight(this)) {
            this._moveRight();
        }

        if (this._control.isHoldingLeft() && collisionDetector.noWallToLeft(this)) {
            this._moveLeft();
        }

        if (!this._control.isHoldingLeft() && !this._control.isHoldingRight() && !this._jumping && !this._falling && !this.shooting) {
            this._playerAnimations.stand();
        }

        if (this._control.isJumping()) {
            this._jump();
        }

        if (this._control.isShooting()) {
            this._shoot(onscreenSprites);
        }
    },

    _shootingUpdate: function () {
        this._shooting += 1;
        
        if (this._shooting > 35) {
            this._shooting = 0;
        }
    },

    _jumpingUpdate: function () {
        this.y -= 4;

        this._jumping++;
        if (this._jumping > 35) {
            this._jumping = 0;
            this._falling = true;
        }
    },

    _moveRight: function () {
        this._playerAnimations.moveRight();
        this.x += this.moveSpeed;
    },

    _moveLeft: function () {
        this._playerAnimations.moveLeft();
        this.x -= this.moveSpeed;
    },

    _fall: function () {
        this._playerAnimations.fall();
        this._falling = true;
        this.y += 3;
    },

    _jump: function () {
        if (this._jumping || this._falling) {
            return;
        }
        this._playerAnimations.jump();
        this._jumping = 1;
    },

    _shoot: function (onscreenSprites) {
        if (this._shooting) {
            return;
        }
        this._shooting = 1;
        this._playerAnimations.shoot();
        
        this._createBubble(onscreenSprites);
    },

    getCurrentImage: function () {
        return this._playerAnimations.getImageName();
    },

    _createBubble: function (onscreenSprites) {
        var x;
        if (this._playerAnimations.direction === RIGHT) {
            x = this.x + this.width() / 2;
        }
        else {
            x = this.x - this.width() / 2;
        }
        onscreenSprites.bubbles.push(new Bubble(x, this.y, this._playerAnimations.direction));
    },
    
    isDead: function () {
        return this._dead;
    },

    isInvincible: function () {
        return this._invincible;
    },

    _checkForPoppingBubble: function (onscreenSprites, collisionDetector) {
        var bubble = collisionDetector.doesCollideWithSprites(this, onscreenSprites.bubbles);

        if (bubble && bubble.isFullyFormed()) {
            if (this.rightSide() < bubble.x + 10) {
                bubble.x += 4;
                return;
            }

            if (this.x > bubble.rightSide() - 10) {
                bubble.x -= 4;
                return;
            }

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
        if (!this._dead && collisionDetector.doesCollideWithSprites(this, onscreenSprites.enemies)) {
            this._dead = 1;
            this._playerAnimations.die();
        }
    },

    _checkForCollectibles: function (onscreenSprites, collisionDetector) {
        var collectible = collisionDetector.doesCollideWithSprites(this, onscreenSprites.collectibles);
        if (collectible) {        
            onscreenSprites.collectibles.remove(collectible);
            this._score += collectible.points;
            onscreenSprites.texts.push(new Text(collectible.x, collectible.y + 30, collectible.points));
        }
    },

    draw: function () {
        if (!this.isInvincible() || this._invincible % 2 === 0) {
            this._super();
        }
    },

    _deadUpdate: function () {
        this._dead++;
        if (this._dead <= 50) {
            return;
        }

        this._dead = 0;
        this.x = 100;
        this.y = 100;
        this._shooting = 0;
        this._jumping = 0;
        this._invincible = 1;
    },

    _invincibleUpdate: function () {
        this._invincible++;
        if (this._invincible > 150) {
            this._invincible = 0;
        }
    },

    _checkForCollisions: function (onscreenSprites, collisionDetector) {
        if (this._dead) {
            return;
        }

        this._checkForPoppingBubble(onscreenSprites, collisionDetector);

        if (!this._invincible) {
            this._checkForDeath(onscreenSprites, collisionDetector);
        }

        this._checkForCollectibles(onscreenSprites, collisionDetector);
    },

    _updateState: function (onscreenSprites, collisionDetector) {
        if (this._dead) {
            this._deadUpdate();
            return;
        }

        if (this.isInvincible()) {
            this._invincibleUpdate();
        }

        if (this._shooting) {
            this._shootingUpdate();
        }

        if (this._jumping) {
            this._jumpingUpdate();
        }
        else if (!(collisionDetector.isStandingOnObjects(this, onscreenSprites.walls))) {
            this._fall();
        }
        else {
            this._falling = false;
            this._playerAnimations.stopFalling();
        }
    },

    getScore: function () {
        return this._score;
    }


});

