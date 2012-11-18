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
        this.playerAnimations = new PlayerAnimations(this);
    },

    update: function(options) {
        this.timer++;

        if (options.isHoldingRight)
            this.moveRight();

        if (options.isHoldingLeft)
            this.moveLeft();

        if (!(options.isHoldingLeft && options.isHoldingRight) && !this.jumping && !this.falling)
            this.setAction('standing');

        if (options.isJumping)
            this.jump();

        this.playerAnimations.changeAnimation();

        if (this.jumping)
            this.jumpingUpdate();
        else if (!options.isOnPlatform)
            this.fall();
        else
            this.falling = false;
    },

    jumpingUpdate: function() {
        this.y -= 4;

        this.jumping++;
        if (this.jumping > 40) {
            this.jumping = 0;
            this.falling = true;
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
        else if (this.currentAction == 'falling') {
            this.currentImage = 'bubFall';
        }
        else if (this.currentAction == 'standing')
            this.currentImage = 'bub';
        else if (this.currentAction == 'jumping')
            this.currentImage = 'bubJump';

        this.timer = 0;
    },

    fall: function() {
        this.setAction('falling');
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
        this.setAction('jumping');
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
