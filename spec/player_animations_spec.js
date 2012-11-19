describe("PlayerAnimations", function() {
    var player;
    var worldState;
    
    beforeEach(function() {
        playerAnimations = new PlayerAnimations();
    });

    it("should change to tail wag frame after 20 frames have passed", function() {
        expect(playerAnimations.currentImage).toBe("bub");

        playerAnimations.timer = 20;
        playerAnimations.changeAnimation();

        expect(playerAnimations.currentImage).toBe("bubTail");
    });

    it("should change remove tail wag frame after 20 more frames have passed", function() {
        playerAnimations.timer = 20;
        playerAnimations.changeAnimation();

        playerAnimations.timer = 20;
        playerAnimations.changeAnimation();

        expect(playerAnimations.currentImage).toBe("bub");
    });

    it("can transition to the jumping animation", function() {
        playerAnimations.setAction('jumping');
        expect(playerAnimations.currentImage).toBe("bubJump");

        playerAnimations.timer = 20;
        playerAnimations.changeAnimation();

        expect(playerAnimations.currentImage).toBe("bubJumpTail");
    });

    it("can transition to the falling animation", function() {
        playerAnimations.setAction('falling');
        expect(playerAnimations.currentImage).toBe("bubFall");

        playerAnimations.timer = 20;
        playerAnimations.changeAnimation();

        expect(playerAnimations.currentImage).toBe("bubFallTail");
    });

});
