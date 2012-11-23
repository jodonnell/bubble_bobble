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
        playerAnimations.jump();
        expect(playerAnimations.currentImage).toBe("bubJump");

        nextTickNewAnimation();
        playerAnimations.changeAnimation();

        expect(playerAnimations.currentImage).toBe("bubJumpTail");
    });

    it("can transition to the falling animation", function() {
        playerAnimations.fall();
        expect(playerAnimations.currentImage).toBe("bubFall");

        nextTickNewAnimation();
        playerAnimations.changeAnimation();

        expect(playerAnimations.currentImage).toBe("bubFallTail");
    });

    it("can transition to the falling animation", function() {
        playerAnimations.shoot();
        expect(playerAnimations.currentImage).toBe("bubShoot");
    });

    it("knows if a player is going left or right", function() {
        playerAnimations.moveLeft();
        expect(playerAnimations.direction).toBe(LEFT)

        playerAnimations.moveRight();
        expect(playerAnimations.direction).toBe(RIGHT)
    });

    it("overides all animations with the shooting animation", function() {
        playerAnimations.shoot();
        expect(playerAnimations.currentImage).toBe("bubShoot");

        playerAnimations.moveRight();
        expect(playerAnimations.currentImage).toBe("bubShoot");
    });

    it("ends the shooting animation after 15 frame", function() {
        playerAnimations.shoot();
        for (var i = 0; i < 15; i++)
            playerAnimations.changeAnimation();

        expect(playerAnimations.currentImage).toBe("bub");
    });

    it("should go to the secondary frame when shooting finishes", function() {
        playerAnimations.shoot();
        for (var i = 0; i < 35; i++) {
            if (i == 30)
                playerAnimations.moveRight();
            playerAnimations.changeAnimation();
        }
        expect(playerAnimations.currentImage).toBe("bubWalk");
    });

    function nextTickNewAnimation() {
        playerAnimations.timer = playerAnimations.ANIMATION_LENGTH - 1;
    }

});
