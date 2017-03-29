import Sprite from './sprite';
import PlayerAnimations from '../player_animations';
import Bubble from './bubble';
import Text from './text';
import {LEFT, RIGHT} from '../constants';
import CollisionDetector from '../collision_detector';

class Player extends Sprite {
    constructor(x, y, type, control) {
        super();
        this.x = x;
        this.y = y;
        this.moveSpeed = 4;

        this._jumping = 0;
        this._falling = false;
        this._shooting = 0;
        this._playerAnimations = new PlayerAnimations(type);
        this._control = control;
        this._dead = 0;
        this._invincible = 0;
        this._score = 0;
    }

    update(args) {
        const onscreenSprites = args.onscreenSprites;

        this._respondToControls(onscreenSprites);
        this._playerAnimations.changeAnimation();
        this._updateState(onscreenSprites);
        this._checkForCollisions(onscreenSprites);
    }

    _respondToControls(onscreenSprites) {
        if (this._dead) {
            return;
        }

        if (this._control.isHoldingRight() && CollisionDetector.noWallToRight(this)) {
            this._moveRight();
        }

        if (this._control.isHoldingLeft() && CollisionDetector.noWallToLeft(this)) {
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
    }

    _shootingUpdate() {
        this._shooting += 1;

        if (this._shooting > 35) {
            this._shooting = 0;
        }
    }

    _jumpingUpdate() {
        this.y -= 4;

        this._jumping++;
        if (this._jumping > 35) {
            this._jumping = 0;
            this._falling = true;
        }
    }

    _moveRight() {
        this._playerAnimations.moveRight();
        this.x += this.moveSpeed;
    }

    _moveLeft() {
        this._playerAnimations.moveLeft();
        this.x -= this.moveSpeed;
    }

    _fall() {
        this._playerAnimations.fall();
        this._falling = true;
        this.y += 3;
    }

    _jump() {
        if (this._jumping || this._falling) {
            return;
        }
        this._playerAnimations.jump();
        this._jumping = 1;
    }

    _shoot(onscreenSprites) {
        if (this._shooting) {
            return;
        }
        this._shooting = 1;
        this._playerAnimations.shoot();

        this._createBubble(onscreenSprites);
    }

    getCurrentImage() {
        return this._playerAnimations.getImageName();
    }

    _createBubble(onscreenSprites) {
        let x;
        if (this._playerAnimations.direction === RIGHT) {
            x = this.x + this.width() / 2;
        }
        else {
            x = this.x - this.width() / 2;
        }
        onscreenSprites.bubbles.push(new Bubble(x, this.y, this._playerAnimations.direction));
    }

    isDead() {
        return this._dead;
    }

    isInvincible() {
        return this._invincible;
    }

    _checkForPoppingBubble(onscreenSprites) {
        let bubble = CollisionDetector.doesCollideWithSprites(this, onscreenSprites.bubbles);

        if (!bubble || !bubble.isFullyFormed()) {
            return;
        }

        if (this.rightSide() < bubble.x + 10) {
            bubble.x += 4;
            return;
        }

        if (this.x > bubble.rightSide() - 10) {
            bubble.x -= 4;
            return;
        }

        let direction;
        if (this.x < bubble.x + bubble.width() / 2) {
            direction = RIGHT;
        }
        else {
            direction = LEFT;
        }
        bubble.pop(onscreenSprites, direction);
    }

    _checkForDeath(onscreenSprites) {
        if (!this._dead && CollisionDetector.doesCollideWithSprites(this, onscreenSprites.enemies)) {
            this._dead = 1;
            this._playerAnimations.die();
        }
    }

    _checkForCollectibles(onscreenSprites) {
        const collectible = CollisionDetector.doesCollideWithSprites(this, onscreenSprites.collectibles);
        if (!collectible) {
            return;
        }

        onscreenSprites.collectibles.remove(collectible);
        this._score += collectible.points;
        onscreenSprites.texts.push(new Text(collectible.x, collectible.y + 30, collectible.points));
    }

    draw() {
        if (!this.isInvincible() || this._invincible % 2 === 0) {
            super.draw();
        }
    }

    _deadUpdate() {
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
    }

    _invincibleUpdate() {
        this._invincible++;
        if (this._invincible > 150) {
            this._invincible = 0;
        }
    }

    _checkForCollisions(onscreenSprites) {
        if (this._dead) {
            return;
        }

        this._checkForPoppingBubble(onscreenSprites);

        if (!this._invincible) {
            this._checkForDeath(onscreenSprites);
        }

        this._checkForCollectibles(onscreenSprites);
    }

    _updateState(onscreenSprites) {
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
        else if (!(CollisionDetector.isStandingOnObjects(this, onscreenSprites.walls))) {
            this._fall();
        }
        else {
            this._falling = false;
            this._playerAnimations.stopFalling();
        }
    }

    getScore() {
        return this._score;
    }
}

export default Player;
