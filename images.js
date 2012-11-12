var Images = Class.extend({
    init: function(callback) {
        this.bub_tail = new Image();
        this.bub_tail.src = "assets/bub_tail.png";

        this.bub_right = new Image();
        this.bub_right.src = "assets/bub_walk.png";

        this.bub_right_tail = new Image();
        this.bub_right_tail.src = "assets/bub_walk_tail.png";

        this.bub = new Image();
        this.bub.src = "assets/bub.png";
        this.bub.onload = callback;
    },

});
