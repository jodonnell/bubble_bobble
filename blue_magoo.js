var BlueMagoo = Sprite.extend({
    init: function(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;

        if (this.direction == LEFT)
            this.currentImage = 'blueMagooWalkLeft';
        else
            this.currentImage = 'blueMagooWalkRight';
        this.timer = 0;
    },

});
