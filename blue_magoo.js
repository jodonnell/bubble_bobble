var BlueMagoo = Sprite.extend({
    init: function(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;

        this.currentImage = 'blueMagooWalk';
        this.timer = 0;
    },

    update: function(falling, followX) {
        this.timer++;

        if (this.timer == 10) {
            if (this.currentImage == 'blueMagooWalk')
                this.currentImage = 'blueMagooWalkLeg';
            else
                this.currentImage = 'blueMagooWalk';
            this.timer = 0;
        }

        if (falling)
            this.y += 3;
        else if (followX) {
            if (followX == this.x)
                ;
            else if (followX > this.x) {
                this.direction = RIGHT;
                this.x += 3;
            }
            else {
                this.direction = LEFT;
                this.x -= 3;
            }
        }
    },

    getCurrentImage: function() {
        var imageName = this.currentImage;
        if (this.direction == LEFT)
            imageName += 'Left';
        else
            imageName += 'Right';
        return imageName;
    }


});
