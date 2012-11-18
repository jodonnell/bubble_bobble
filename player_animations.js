var PlayerAnimations = Class.extend({
    init: function(player) {
        this.player = player;
    },

    changeAnimation: function() {
        if (this.player.currentAction === 'falling')
            this.fallingAnimation();
        else if (this.player.currentAction === 'standing')
            this.standingAnimation();
        else if (this.player.currentAction === 'walkingRight' || this.player.currentAction == 'walkingLeft')
            this.walkingRightAnimation();
        else if (this.player.currentAction === 'jumping')
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
        if (this.player.timer == 20) {
            this.player.timer = 0;

            if (this.player.currentImage === animationA)
                this.player.currentImage = animationB;
            else if (this.player.currentImage === animationB)
                this.player.currentImage = animationA;
        }

    }

});
