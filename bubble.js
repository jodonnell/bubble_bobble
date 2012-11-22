var Bubble = Sprite.extend({
    init: function(x, y) {
        this.x = x + 10;
        this.y = y;
        this.currentImage = 'smallestBubble';
    }
});
