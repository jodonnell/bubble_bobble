var Player = Sprite.extend({
    init: function(x, y) {
        this.x = x;
        this.y = y;
        this.jumping = 0;
        this.falling = false;
        this.shooting = 0;
        this.playerAnimations = new PlayerAnimations();
        this.moveSpeed = 4;
    },

    update: function(worldState, collisionDetector) {
        this.respondToControls(worldState);

        this.playerAnimations.changeAnimation();

        if (this.shooting)
            this.shootingUpdate();

        if (this.jumping)
            this.jumpingUpdate();
        else if (!(collisionDetector.isBubStandingOnFloor() || collisionDetector.isBubStandingOnBubble()))
            this.fall();
        else {
            this.falling = false;
            this.playerAnimations.stopFalling()
        }
    },

    respondToControls: function(controls) {
        if (controls.isHoldingRight)
            this.moveRight();

        if (controls.isHoldingLeft)
            this.moveLeft();

        if (!controls.isHoldingLeft && !controls.isHoldingRight && !this.jumping && !this.falling && !this.shooting)
            this.playerAnimations.stand();

        if (controls.isJumping)
            this.jump();

        if (controls.isShooting)
            this.shoot();
    },

    shootingUpdate: function() {
        this.shooting += 1;
        
        if (this.shooting > 35)
            this.shooting = 0;
    },

    jumpingUpdate: function() {
        this.y -= 4;

        this.jumping++;
        if (this.jumping > 35) {
            this.jumping = 0;
            this.falling = true;
        }
    },

    moveRight: function() {
        this.playerAnimations.moveRight();
        this.x += this.moveSpeed;
    },

    moveLeft: function() {
        this.playerAnimations.moveLeft();
        this.x -= this.moveSpeed;
    },

    fall: function() {
        this.playerAnimations.fall();
        this.falling = true;
        this.y += 3;
    },

    jump: function() {
        if (this.jumping || this.falling) return;
        this.playerAnimations.jump();
        this.jumping = 1;
    },

    shoot: function() {
        if (this.shooting) return;
        this.shooting = 1;
        this.playerAnimations.shoot();
        $(document).trigger('shootBubble', [this.playerAnimations.direction]);
    },

    getCurrentImage: function() {
        return this.playerAnimations.getImageName();
    }
});
