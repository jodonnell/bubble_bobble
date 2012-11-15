var Player = Class.extend({
    RIGHT: 1,
    LEFT: 2,

    init: function() {
        this.x = 100;
        this.y = 100;
        this.currentImage = 'bub';
        this.timer = 0;
        this.currentAction = "standing";
        this.direction = this.RIGHT;
        this.jumping = 0;
    },

    update: function() {
        this.timer++;
        if (this.currentAction === 'standing')
            this.standingAnimation();
        else if (this.currentAction === 'walkingRight' || this.currentAction == 'walkingLeft')
            this.walkingRightAnimation();

        if (this.jumping) {
            this.y -= 6;

            this.jumping++;
            if (this.jumping > 40)
                this.jumping = 0;
        }
    },

    standingAnimation: function() {
        if (this.timer == 20) {
            this.timer = 0;
            
            if (this.currentImage === "bub")
                this.currentImage = 'bub_tail';
            else if (this.currentImage === "bub_tail")
                this.currentImage = 'bub';
        }

    },

    walkingRightAnimation: function() {
        if (this.timer == 20) {
            this.timer = 0;

            if (this.currentImage === 'bub_right')
                this.currentImage = 'bub_right_tail';
            else if (this.currentImage === "bub_right_tail")
                this.currentImage = 'bub_right';
        }

    },

    draw: function(images, context) {
        var image = images[this.currentImage];
        context.drawImage(image, this.x, this.y);
    },

    moveRight: function() {
        this.setAction('walkingRight');
        this.x += 4;
    },

    moveLeft: function() {
        this.setAction('walkingLeft');
        this.x -= 4;
    },

    setAction: function(action) {
        if (this.currentAction == action)
            return;

        this.currentAction = action;
        if (this.currentAction == 'walkingRight') {
            this.currentImage = 'bub_right';
            this.direction = this.RIGHT;
        }
        else if (this.currentAction == 'walkingLeft') {
            this.currentImage = 'bub_right';
            this.direction = this.LEFT;
        }
        else if (this.currentAction == 'standing')
            this.currentImage = 'bub';

        this.timer = 0;
    },

    fall: function() {
        this.y += 3;
    },

    height: function(images) {
        return images[this.currentImage].height;
    },

    width: function(images) {
        return images[this.currentImage].width;
    },

    jump: function() {
        this.jumping = 1;
    }


});
