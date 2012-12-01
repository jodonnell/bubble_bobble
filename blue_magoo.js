var BlueMagoo = Sprite.extend({
    init: function(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;

        this.currentImage = 'blueMagooWalk';
        this.timer = 0;
    },

    update: function(collisionDetector, followX, followY) {
        this.timer++;

        this.changeAnimation();

        if (collisionDetector.isSpriteStandingOnWall(this)) {
            this.move(collisionDetector, followX, followY);
        }
        else {
            this.y += 3;
        }
    },

    changeAnimation: function() {
        if (this.timer != 10)
            return;

        if (this.currentImage == 'blueMagooWalk')
            this.currentImage = 'blueMagooWalkLeg';
        else
            this.currentImage = 'blueMagooWalk';
        this.timer = 0;
    },

    shouldTrack: function() {
        return Math.random() > 0.99;
    },

    move: function(collisionDetector, followX, followY) {
        if (this.shouldTrack())  {
            this.track(followX, followY);
        }
        else {
            this.moveInCurrentDirection();
            this.boundaryCheck(collisionDetector);
        }
    },

    moveInCurrentDirection: function() {
        if (this.direction == RIGHT) {
            this.x += 3;
        }
        else {
            this.x -= 3;
        }
    },

    track: function(followX, followY) {
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
    },

    getCurrentImage: function() {
        var imageName = this.currentImage;
        if (this.direction == LEFT)
            imageName += 'Left';
        else
            imageName += 'Right';
        return imageName;
    },

    boundaryCheck: function(collisionDetector) {
        this.moveSpeed = 0;
        if (!collisionDetector.noWallToRight(this)) {
            this.direction = LEFT;
        }
        if (!collisionDetector.noWallToLeft(this)) {
            this.direction = RIGHT;
        }
    },

    isJumping: function() {
        return true;
    }

});
