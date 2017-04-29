import CollisionDetector from '../collision_detector';
import {LEFT, RIGHT} from '../constants';

class PlayerBubbleCollide {
    constructor(player, onscreenSprites) {
        this.player = player;
        this.onscreenSprites = onscreenSprites;
    }

    collide() {
        this.bubble = CollisionDetector.doesCollideWithSprites(this.player, this.onscreenSprites.bubbles);

        if (!this.bubble || !this.bubble.isFullyFormed()) {
            return;
        }

        if (this.player.isHoldingJump()) {
            return this.player.jump();
        }

        if (this._pushBubbleRight() || this._pushBubbleLeft()) {
            return;
        }

        this.bubble.pop(this.onscreenSprites, this._popDirection());
    }

    _popDirection() {
        if (this.player.x < this.bubble.x + this.bubble.width() / 2) {
            return RIGHT;
        }
        else {
            return LEFT;
        }
    }

    _pushBubbleRight() {
        if (this._shouldPushBubbleRight()) {
            this.bubble.x += 4;
        }
        return this._shouldPushBubbleRight();
    }

    _shouldPushBubbleRight() {
        return this.player.rightSide() < this.bubble.x + 10;
    }

    _pushBubbleLeft() {
        if (this._shouldPushBubbleLeft()) {
            this.bubble.x -= 4;
        }
        return this._shouldPushBubbleLeft();
    }

    _shouldPushBubbleLeft() {
        return this.player.x > this.bubble.rightSide() - 10;
    }

}

export default PlayerBubbleCollide;
