describe("PlayerAnimations", function() {
    var player;
    var worldState;
    
    beforeEach(function() {
        playerAnimations = new PlayerAnimations();
    });

    it("should change to tail wag frame after 20 frames have passed", function() {
        expect(playerAnimations.currentImage).toBe("bub");

        nextTickNewAnimation();
        playerAnimations.changeAnimation();

        expect(playerAnimations.currentImage).toBe("bubTail");
    });

    it("should change remove tail wag frame after 20 more frames have passed", function() {
        nextTickNewAnimation();
        playerAnimations.changeAnimation();

        nextTickNewAnimation();
        playerAnimations.changeAnimation();

        expect(playerAnimations.currentImage).toBe("bub");
    });

    it("can transition to the jumping animation", function() {
        playerAnimations.setAction('jumping');
        expect(playerAnimations.currentImage).toBe("bubJump");

        nextTickNewAnimation();
        playerAnimations.changeAnimation();

        expect(playerAnimations.currentImage).toBe("bubJumpTail");
    });

    it("can transition to the falling animation", function() {
        playerAnimations.setAction('falling');
        expect(playerAnimations.currentImage).toBe("bubFall");

        nextTickNewAnimation();
        playerAnimations.changeAnimation();

        expect(playerAnimations.currentImage).toBe("bubFallTail");
    });

    it("can transition to the falling animation", function() {
        playerAnimations.setAction('shooting');
        expect(playerAnimations.currentImage).toBe("bubShoot");

        nextTickNewAnimation();
        playerAnimations.changeAnimation();

        expect(playerAnimations.currentImage).toBe("bub");
    });

    function nextTickNewAnimation() {
        playerAnimations.timer = playerAnimations.ANIMATION_LENGTH - 1;
    }

});
