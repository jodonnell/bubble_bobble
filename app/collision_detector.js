import {LEFT_BOUND, RIGHT_BOUND} from './constants';
import _ from 'lodash';

class CollisionDetector {
    static isStandingOnObjects(sprite, objects) {
        return _.find(objects, (object) => {
            return this._xMatchUp(sprite, object) && this._doesBottomCollide(sprite, object);
        });
    }

    static noWallToRight(sprite) {
        if (sprite.rightSide() + sprite.moveSpeed > RIGHT_BOUND) {
            sprite.x = RIGHT_BOUND - sprite.width();
            return false;
        }
        return true;
    }

    static noWallToLeft(sprite) {
        if (sprite.x - sprite.moveSpeed < LEFT_BOUND) {
            sprite.x = LEFT_BOUND;
            return false;
        }
        return true;
    }

    static areSpritesAboveWithin(sprite, sprites, distance) {
        for (let i = 0; i < sprites.length; i++) {
            if (this._xMatchUp(sprite, sprites[i])) {
                let yWithin = sprites[i].y <= sprite.bottomSide() - 1 &&
                    sprites[i].y >= sprite.bottomSide() - 1 - distance;
                if (yWithin) {
                    return true;
                }
            }
        }
        return false;
    }

    static doesCollideWithSprites(sprite, sprites) {
        return _.find(sprites, (otherSprite) => {
            return this.doesCollideWith(sprite, otherSprite);
        });
    }

    static doesCollideWith(spriteA, spriteB) {
        if (spriteA === spriteB) {
            return false;
        }
        return spriteA.x < spriteB.rightSide() && spriteA.rightSide() > spriteB.x && spriteA.y < spriteB.bottomSide() && spriteA.bottomSide() > spriteB.y;
    }

    static _doesBottomCollide(sprite, object) {
        // this needs to make sure it's under the threshold of speed
        if (object.y === sprite.bottomSide()) {
            return true;
        }
        if (object.y === sprite.bottomSide() - 1) {
            sprite.y -= 1;
            return true;
        }
        if (object.y === sprite.bottomSide() - 2) {
            sprite.y -= 2;
            return true;
        }
        return false;
    }

    static _xMatchUp(sprite, object) {
        return object.x <= sprite.rightSide() && object.rightSide() >= sprite.x;
    }
}

export default CollisionDetector;
