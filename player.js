var Player = Class.extend({
    init: function() {
        this.x = 100;
        this.y = 100;
        this.currentImage = 'bub';
        this.timer = 0;
        this.currentAction = "standing";
    },

    update: function() {
        this.timer++;
        if (this.currentAction === 'standing')
            this.standingAnimation();
        else if (this.currentAction === 'walkingRight')
            this.walkingRightAnimation();
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
        //context.scale(-1, -1);
        //context.scale(-1, 1);
        
        context.drawImage(image, this.x, this.y);

    },

    moveRight: function() {
        this.setAction('walkingRight');
        this.x += 2;
    },

    moveLeft: function() {
        this.setAction('walkingLeft');
        this.x -= 2;
    },

    setAction: function(action) {
        if (this.currentAction == action)
            return;

        this.currentAction = action;
        if (this.currentAction == 'walkingRight')
            this.currentImage = 'bub_right';
        else if (this.currentAction == 'walkingLeft')
            this.currentImage = 'bub_right';
        else if (this.currentAction == 'standing')
            this.currentImage = 'bub';

        this.timer = 0;
    }

});
