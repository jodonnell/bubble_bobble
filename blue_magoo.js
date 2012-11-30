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

    update: function() {
        this.timer++;

        if (this.timer == 20) {
            if (this.currentImage == 'blueMagooWalkLeft')
                this.currentImage == 'blueMagooWalkLegLeft';
            else
                this.currentImage == 'blueMagooWalkLeft';
            this.timer = 0;
        }

        this.y += 3;
    },

    

});
