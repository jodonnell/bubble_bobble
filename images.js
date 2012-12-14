"use strict";

var Images = Class.extend({
    init: function (callback) {
        this.bub();
        this.bubbles();
        this.enemies();

        this.bubRight = new Image();
        this.bubRight.src = "assets/bub.png";
        this.bubRight.onload = callback;
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
    }

});
