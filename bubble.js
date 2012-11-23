var Bubble = Sprite.extend({
    init: function(x, y, direction) {
        this.x = x;
        this.y = y;
        this.currentImage = 'smallestBubble';
        this.direction = direction;
        this.timer = 0;
    },

    update: function() {
        this.timer++;

        if (this.isFullyFormed())
            this.floatUp();
        else
            this.shootOut();
    },

    floatUp: function() {
        this.y -= 2;
    },
    
    shootOut: function() {
        if (this.direction == RIGHT)
            this.x += 5;
        else
            this.x -= 5;

        if (this.timer % 7 == 0)
            this.changeFrame();
    },

    changeFrame: function() {
        if (this.currentImage == 'smallestBubble')
            this.currentImage = 'smallBubble';
        else if (this.currentImage == 'smallBubble')
            this.currentImage = 'mediumBubble';
        else if (this.currentImage == 'mediumBubble')
            this.currentImage = 'bigBubble';
    },

    isFullyFormed: function() {
        return this.currentImage === 'bigBubble';
    }
});
