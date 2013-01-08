"use strict";

var CollisionDetector = Class.extend({
    isStandingOnObjects: function (sprite, objects) {
        for (var i = 0; i < objects.length; i++) {
            if (this._xMatchUp(sprite, objects[i]) && this._doesBottomCollide(sprite, objects[i])) {
                return true;
            }
        }
        return false;
    },

    noWallToRight: function (sprite) {
        if (sprite.rightSide() + sprite.moveSpeed > RIGHT_BOUND) {
            sprite.x = RIGHT_BOUND - sprite.width();
            return false;
        }
        return true;
    },

    noWallToLeft: function (sprite) {
        if (sprite.x - sprite.moveSpeed < LEFT_BOUND) {
            sprite.x = LEFT_BOUND;
            return false;
        }
        return true;
    },

    areSpritesAboveWithin: function (sprite, sprites, distance) {
        for (var i = 0; i < sprites.length; i++) {
            if (this._xMatchUp(sprite, sprites[i])) {
                var yWithin = sprites[i].y <= sprite.bottomSide() - 1 &&
                    sprites[i].y >= sprite.bottomSide() - 1 - distance;
                if (yWithin) {
                    return true;
                }
            }
        }
        return false;
    },

    doesCollideWithSprites: function (sprite, sprites) {
        for (var i = 0; i < sprites.length; i++) {
            if (this.doesCollideWith(sprite, sprites[i])) {
                return sprites[i];
            }
        }

        return false;
    },
    
    doesCollideWith: function (spriteA, spriteB) {
        if (spriteA === spriteB) {
            return false;
        }
        return spriteA.x < spriteB.rightSide() && spriteA.rightSide() > spriteB.x && spriteA.y < spriteB.bottomSide() && spriteA.bottomSide() > spriteB.y;
    },

    _doesBottomCollide: function (sprite, object) {
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
    },

    _xMatchUp: function (sprite, object) {
        return object.x <= sprite.rightSide() && object.rightSide() >= sprite.x;
    }
});

if (typeof exports !== 'undefined') {
    exports.CollisionDetector = CollisionDetector;
}
