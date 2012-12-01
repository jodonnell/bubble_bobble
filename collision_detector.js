var CollisionDetector = Class.extend({
    init: function(bub, enemies, bubbles, walls) {
        this.bub = bub;
        this.enemies = enemies;
        this.bubbles = bubbles;
        this.walls = walls;
    },

    isStandingOnObjects: function(sprite, objects) {
        for (var i = 0; i < objects.length; i++) {
            if (this.doesBottomCollide(sprite, objects[i]) && this.xMatchUp(sprite, objects[i])) {
                return true;
            }
        }
        return false;
    },

    doesBottomCollide: function(sprite, object) {
        return object.y == sprite.bottomSide() ||
            object.y + 1 == sprite.bottomSide() ||
            object.y + 2 == sprite.bottomSide();
    },

    xMatchUp: function(sprite, object) {
        return object.x <= sprite.rightSide() && object.rightSide() >= sprite.x;
    },

    isBubStandingOnFloor: function() {
        return this.isStandingOnObjects(this.bub, this.walls);
    },

    isBubStandingOnBubble: function() {
        var onBubble = this.isStandingOnObjects(this.bub, this.bubbles);
        if (onBubble)
            this.bub.y -= 2;
        return onBubble;
    },

    isSpriteStandingOnWall: function(sprite) {
        return this.isStandingOnObjects(sprite, this.walls);
    },

    noWallToRight: function(sprite) {
        if (sprite.rightSide() + sprite.moveSpeed >= 754) {
            sprite.x = 754 - sprite.width();
            return false;
        }
        return true;
    },

    noWallToLeft: function(sprite) {
        if (sprite.x - sprite.moveSpeed <= 46) {
            sprite.x = 46;
            return false;
        }
        return true;
    }

});
