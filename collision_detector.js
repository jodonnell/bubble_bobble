"use strict";

var CollisionDetector = Class.extend({
    init: function (bub, enemies, bubbles, walls) {
        this.bub = bub;
        this.enemies = enemies;
        this.bubbles = bubbles;
        this.walls = walls;
    },

    isStandingOnObjects: function (sprite, objects) {
        for (var i = 0; i < objects.length; i++) {
            if (this.xMatchUp(sprite, objects[i]) && this.doesBottomCollide(sprite, objects[i])) {
                return true;
            }
        }
        return false;
    },

    doesBottomCollide: function (sprite, object) {
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

    xMatchUp: function (sprite, object) {
        return object.x <= sprite.rightSide() && object.rightSide() >= sprite.x;
    },

    isBubStandingOnFloor: function () {
        return this.isStandingOnObjects(this.bub, this.walls);
    },

    isBubStandingOnBubble: function () {
        var onBubble = this.isStandingOnObjects(this.bub, this.bubbles);
        if (onBubble) {
            this.bub.y -= 2;
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
            if (this.xMatchUp(sprite, this.walls[i])) {
                var yWithin = this.walls[i].y <= sprite.bottomSide() - 1 &&
                    this.walls[i].y >= sprite.bottomSide() - 1 - distance;
                if (yWithin) {
                    return true;
                }
            }
        }
        return false;
    }

});
