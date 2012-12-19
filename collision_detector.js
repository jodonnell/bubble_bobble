"use strict";

var CollisionDetector = Class.extend({
    init: function (sprites) {
        this.player = sprites.player || [];
        this.enemies = sprites.enemies || [];
        this.bubbles = sprites.bubbles || [];
        this.walls = sprites.walls || [];
    },

    isStandingOnObjects: function (sprite, objects) {
        for (var i = 0; i < objects.length; i++) {
            if (this._xMatchUp(sprite, objects[i]) && this._doesBottomCollide(sprite, objects[i])) {
                return true;
            }
        }
        return false;
    },

    isBubStandingOnBubble: function () {
        var onBubble = this.isStandingOnObjects(this.player, this.bubbles);
        if (onBubble) {
            this.player.y -= 2;
        }
        return onBubble;
    },

    isSpriteStandingOnWall: function (sprite) {
        return this.isStandingOnObjects(sprite, this.walls);
    },

    noWallToRight: function (sprite) {
        if (sprite.rightSide() + sprite.moveSpeed >= 754) {
            sprite.x = 754 - sprite.width();
            return false;
        }
        return true;
    },

    noWallToLeft: function (sprite) {
        if (sprite.x - sprite.moveSpeed <= 46) {
            sprite.x = 46;
            return false;
        }
        return true;
    },

    isPlatformAboveWithin: function (sprite, distance) {
        for (var i = 0; i < this.walls.length; i++) {
            if (this._xMatchUp(sprite, this.walls[i])) {
                var yWithin = this.walls[i].y <= sprite.bottomSide() - 1 &&
                    this.walls[i].y >= sprite.bottomSide() - 1 - distance;
                if (yWithin) {
                    return true;
                }
            }
        }
        return false;
    },

    _doesBottomCollide: function (sprite, object) {
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
