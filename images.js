var Images = Class.extend({
    init: function(callback) {
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

        this.wall = new Image();
        this.wall.src = "assets/wall.png";

        this.bubLeft = new Image();
        this.bubLeft.src = "assets/bub_left.png";

        this.bubRight = new Image();
        this.bubRight.src = "assets/bub.png";
        this.bubRight.onload = callback;
    },

});
