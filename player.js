var Player = Class.extend({
    init: function(x, y) {
        this.x = x;
        this.y = y;
        this.jumping = 0;
        this.falling = false;
        this.playerAnimations = new PlayerAnimations();
    },

    update: function(worldState) {
        this.respondToControls(worldState);

        this.playerAnimations.changeAnimation();

        if (this.jumping)
            this.jumpingUpdate();
        else if (!worldState.isOnPlatform)
            this.fall();
        else
            this.falling = false;
    },

    respondToControls: function(controls) {
        if (controls.isHoldingRight)
            this.moveRight();

        if (controls.isHoldingLeft)
            this.moveLeft();

        if (!controls.isHoldingLeft && !controls.isHoldingRight && !this.jumping && !this.falling)
            this.playerAnimations.setAction('standing');

        if (controls.isJumping)
            this.jump();
    },

    jumpingUpdate: function() {
        this.y -= 4;

        this.jumping++;
        if (this.jumping > 35) {
            this.jumping = 0;
            this.falling = true;
        }
    },

    draw: function(images, context) {
        var image = images[this.playerAnimations.getImageName()];
        context.drawImage(image, this.x, this.y);
    },

    moveRight: function() {
        this.playerAnimations.setAction('walkingRight');
        this.x += 4;
    },

    moveLeft: function() {
        this.playerAnimations.setAction('walkingLeft');
        this.x -= 4;
    },

    fall: function() {
        this.playerAnimations.setAction('falling');
        this.falling = true;
        this.y += 3;
    },

    height: function(images) {
        return images[this.playerAnimations.getImageName()].height;
    },

    width: function(images) {
        return images[this.playerAnimations.getImageName()].width;
    },

    jump: function() {
        if (this.jumping || this.falling) return;
        this.playerAnimations.setAction('jumping');
        this.jumping = 1;
    }
});
