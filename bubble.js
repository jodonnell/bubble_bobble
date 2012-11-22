var Bubble = Sprite.extend({
    init: function(x, y, direction) {
        this.x = x;
        this.y = y;
        this.currentImage = 'smallestBubble';
        this.direction = direction;
    },

    update: function() {
        if (this.direction == RIGHT)
            this.x += 5;
        else
            this.x -= 5;
    }
});
