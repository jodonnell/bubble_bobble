var Player = Class.extend({
    init: function() {
        this.x = 100;
        this.y = 100;
    },

    draw: function(images, context) {
        context.drawImage(images.bub, this.x, this.y);
    },

    moveRight: function() {
        this.x += 10;
    },

    moveLeft: function() {
        this.x -= 10;
    }

});
