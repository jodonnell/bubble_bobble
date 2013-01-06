"use strict";

var Images = Class.extend({
    init: function (callback) {
        this.bub();
        this.bob();
        this.bubbles();
        this.enemies();
        this.deadEnemies();
        this.collectibles();

        this.bubRight = new Image();
        this.bubRight.src = "assets/bub.png";
        this.bubRight.onload = callback;
    },

    collectibles: function () {
        this.pepper = new Image();
        this.pepper.src = "assets/pepper.png";
    },

    deadEnemies: function () {
        this.deadEnemyRight = new Image();
        this.deadEnemyRight.src = "assets/blue_magoo_dead.png";

        this.deadEnemyBottom = new Image();
        this.deadEnemyBottom.src = "assets/blue_magoo_dead_vertical.png";

        this.deadEnemyLeft = new Image();
        this.deadEnemyLeft.src = "assets/blue_magoo_dead_left.png";

        this.deadEnemyTop = new Image();
        this.deadEnemyTop.src = "assets/blue_magoo_dead_vertical_left.png";
    },

    enemies: function () {
        this.blueMagooWalkLeft = new Image();
        this.blueMagooWalkLeft.src = "assets/blue_magoo_walk_left.png";

        this.blueMagooWalkLegLeft = new Image();
        this.blueMagooWalkLegLeft.src = "assets/blue_magoo_walk_leg_left.png";

        this.blueMagooWalkRight = new Image();
        this.blueMagooWalkRight.src = "assets/blue_magoo_walk.png";

        this.blueMagooWalkLegRight = new Image();
        this.blueMagooWalkLegRight.src = "assets/blue_magoo_walk_leg.png";

        this.blueMagooTrappedRight = new Image();
        this.blueMagooTrappedRight.src = "assets/blue_magoo_trapped.png";

        this.blueMagooTrappedLeft = new Image();
        this.blueMagooTrappedLeft.src = "assets/blue_magoo_trapped_left.png";

    },

    bubbles: function () {
        this.smallestBubble = new Image();
        this.smallestBubble.src = "assets/smallest_bubble.png";

        this.smallBubble = new Image();
        this.smallBubble.src = "assets/small_bubble.png";

        this.mediumBubble = new Image();
        this.mediumBubble.src = "assets/medium_bubble.png";

        this.bigBubble = new Image();
        this.bigBubble.src = "assets/big_bubble.png";
    },

    bub: function () {
        this.bubTailRight = new Image();
        this.bubTailRight.src = "assets/bub_tail.png";

        this.bubTailLeft = new Image();
        this.bubTailLeft.src = "assets/bub_tail_left.png";

        this.bubWalkRight = new Image();
        this.bubWalkRight.src = "assets/bub_walk.png";

        this.bubWalkLeft = new Image();
        this.bubWalkLeft.src = "assets/bub_walk_left.png";

        this.bubWalkTailRight = new Image();
        this.bubWalkTailRight.src = "assets/bub_walk_tail.png";

        this.bubWalkTailLeft = new Image();
        this.bubWalkTailLeft.src = "assets/bub_walk_tail_left.png";


        this.bubJumpRight = new Image();
        this.bubJumpRight.src = "assets/bub_jump.png";

        this.bubJumpTailRight = new Image();
        this.bubJumpTailRight.src = "assets/bub_jump_tail.png";

        this.bubJumpLeft = new Image();
        this.bubJumpLeft.src = "assets/bub_jump_left.png";

        this.bubJumpTailLeft = new Image();
        this.bubJumpTailLeft.src = "assets/bub_jump_tail_left.png";

        this.bubFallRight = new Image();
        this.bubFallRight.src = "assets/bub_fall.png";

        this.bubFallTailRight = new Image();
        this.bubFallTailRight.src = "assets/bub_fall_tail.png";

        this.bubFallLeft = new Image();
        this.bubFallLeft.src = "assets/bub_fall_left.png";

        this.bubFallTailLeft = new Image();
        this.bubFallTailLeft.src = "assets/bub_fall_tail_left.png";

        this.bubShootLeft = new Image();
        this.bubShootLeft.src = "assets/bub_shoot_left.png";

        this.bubShootRight = new Image();
        this.bubShootRight.src = "assets/bub_shoot.png";

        this.wall = new Image();
        this.wall.src = "assets/wall.png";

        this.bubLeft = new Image();
        this.bubLeft.src = "assets/bub_left.png";

        this.bubDie = new Image();
        this.bubDie.src = "assets/bub_die.png";

        this.bubDie90 = new Image();
        this.bubDie90.src = "assets/bub_die_90.png";

        this.bubDie180 = new Image();
        this.bubDie180.src = "assets/bub_die_180.png";

        this.bubDie270 = new Image();
        this.bubDie270.src = "assets/bub_die_270.png";
    },

    bob: function () {
        this.bobTailRight = new Image();
        this.bobTailRight.src = "assets/bob_tail.png";

        this.bobTailLeft = new Image();
        this.bobTailLeft.src = "assets/bob_tail_left.png";

        this.bobWalkRight = new Image();
        this.bobWalkRight.src = "assets/bob_walk.png";

        this.bobWalkLeft = new Image();
        this.bobWalkLeft.src = "assets/bob_walk_left.png";

        this.bobWalkTailRight = new Image();
        this.bobWalkTailRight.src = "assets/bob_walk_tail.png";

        this.bobWalkTailLeft = new Image();
        this.bobWalkTailLeft.src = "assets/bob_walk_tail_left.png";


        this.bobJumpRight = new Image();
        this.bobJumpRight.src = "assets/bob_jump.png";

        this.bobJumpTailRight = new Image();
        this.bobJumpTailRight.src = "assets/bob_jump_tail.png";

        this.bobJumpLeft = new Image();
        this.bobJumpLeft.src = "assets/bob_jump_left.png";

        this.bobJumpTailLeft = new Image();
        this.bobJumpTailLeft.src = "assets/bob_jump_tail_left.png";

        this.bobFallRight = new Image();
        this.bobFallRight.src = "assets/bob_fall.png";

        this.bobFallTailRight = new Image();
        this.bobFallTailRight.src = "assets/bob_fall_tail.png";

        this.bobFallLeft = new Image();
        this.bobFallLeft.src = "assets/bob_fall_left.png";

        this.bobFallTailLeft = new Image();
        this.bobFallTailLeft.src = "assets/bob_fall_tail_left.png";

        this.bobShootLeft = new Image();
        this.bobShootLeft.src = "assets/bob_shoot_left.png";

        this.bobShootRight = new Image();
        this.bobShootRight.src = "assets/bob_shoot.png";

        this.wall = new Image();
        this.wall.src = "assets/wall.png";

        this.bobLeft = new Image();
        this.bobLeft.src = "assets/bob_left.png";

        this.bobDie = new Image();
        this.bobDie.src = "assets/bob_die.png";

        this.bobDie90 = new Image();
        this.bobDie90.src = "assets/bob_die_90.png";

        this.bobDie180 = new Image();
        this.bobDie180.src = "assets/bob_die_180.png";

        this.bobDie270 = new Image();
        this.bobDie270.src = "assets/bob_die_270.png";

    }


});
