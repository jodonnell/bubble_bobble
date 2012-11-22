var PlayerAnimations = Class.extend({
    RIGHT: 1,
    LEFT: 2,

    ANIMATION_LENGTH: 20,

    init: function() {
        this.timer = 0;
        this.currentImage = 'bub';
        this.direction = this.RIGHT;
        this.currentAction = "standing";
    },

    setAction: function(action) {
        if (this.currentAction == action)
            return;


        this.currentAction = action;

        this.setDirection();

        if (this.currentAction == 'walkingRight')
            this.currentImage = 'bubWalk';
        else if (this.currentAction == 'walkingLeft')
            this.currentImage = 'bubWalk';
        else if (this.currentAction == 'falling')
            this.currentImage = 'bubFall';
        else if (this.currentAction == 'standing')
            this.currentImage = 'bub';
        else if (this.currentAction == 'jumping')
            this.currentImage = 'bubJump';
        else if (this.currentAction == 'shooting')
            this.currentImage = 'bubShoot';

        this.timer = 0;
    },

    setDirection: function() {
        if (this.currentAction == 'walkingRight') {
            this.direction = this.RIGHT;
        }
        else if (this.currentAction == 'walkingLeft') {
            this.direction = this.LEFT;
        }
    },

    changeAnimation: function() {
        this.timer++;

        if (this.currentAction === 'falling')
            this.fallingAnimation();
        else if (this.currentAction === 'standing')
            this.standingAnimation();
        else if (this.currentAction === 'walkingRight' || this.currentAction == 'walkingLeft')
            this.walkingRightAnimation();
        else if (this.currentAction === 'jumping')
            this.jumpingAnimation();
    },

    fallingAnimation: function() {
        this.transitionState('bubFall', 'bubFallTail');
    },

    standingAnimation: function() {
        this.transitionState('bub', 'bubTail');
    },

    jumpingAnimation: function() {
        this.transitionState('bubJump', 'bubJumpTail');
    },

    walkingRightAnimation: function() {
        this.transitionState('bubWalk', 'bubWalkTail');
    },

    transitionState: function(animationA, animationB) {
        if (this.timer == this.ANIMATION_LENGTH) {
            this.timer = 0;

            if (this.currentImage === animationA)
                this.currentImage = animationB;
            else if (this.currentImage === animationB)
                this.currentImage = animationA;
        }
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
