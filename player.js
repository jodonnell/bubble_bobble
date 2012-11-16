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
        this.falling = false;
    },

    update: function(isFalling) {
        this.timer++;
        if (this.currentAction === 'standing')
            this.standingAnimation();
        else if (this.currentAction === 'walkingRight' || this.currentAction == 'walkingLeft')
            this.walkingRightAnimation();

        if (this.jumping) {
            this.y -= 6;

            this.jumping++;
            if (this.jumping > 40) {
                this.jumping = 0;
                this.falling = true;
            }
        }

        if (isFalling)
            this.fall();
        else
            this.falling = false;

    },

    standingAnimation: function() {
        if (this.timer == 20) {
            this.timer = 0;
            
            if (this.currentImage === "bub")
                this.currentImage = 'bubTail';
            else if (this.currentImage === "bubTail")
                this.currentImage = 'bub';
        }

    },

    walkingRightAnimation: function() {
        if (this.timer == 20) {
            this.timer = 0;

            if (this.currentImage === 'bubWalk')
                this.currentImage = 'bubWalkTail';
            else if (this.currentImage === "bubWalkTail")
                this.currentImage = 'bubWalk';
        }

    },

    draw: function(images, context) {
        var image = images[this.getImageName()];
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
            this.currentImage = 'bubWalk';
            this.direction = this.RIGHT;
        }
        else if (this.currentAction == 'walkingLeft') {
            this.currentImage = 'bubWalk';
            this.direction = this.LEFT;
        }
        else if (this.currentAction == 'standing')
            this.currentImage = 'bub';

        this.timer = 0;
    },

    fall: function() {
        this.falling = true;
        this.y += 3;
    },

    height: function(images) {
        return images[this.getImageName()].height;
    },

    width: function(images) {
        return images[this.getImageName()].width;
    },

    jump: function() {
        if (this.jumping || this.falling) return;
        this.jumping = 1;
    },

    getImageName: function() {
        var imageName = this.currentImage;
        if (this.direction == this.LEFT)
            imageName += 'Left';
        else
            imageName += 'Right';
        return imageName;
    }


});
