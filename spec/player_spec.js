describe("Player", function() {
    var player;
    var worldState;
    
    beforeEach(function() {
        player = new Player();
        worldState = {isHoldingRight: false, isHoldingLeft: false, isJumping: false, isOnPlatform: false};
    });

    it("should have a location", function() {
        expect(player.x).toBe(100);
        expect(player.y).toBe(100);
    });

    it("should change to tail wag frame after 20 frames have passed", function() {
        worldState.isOnPlatform = true;
        expect(player.currentImage).toBe("bub");

        for (var i = 0; i < 20; i++)
            player.update(worldState);

        expect(player.currentImage).toBe("bubTail");
    });

    it("should change remove tail wag frame after 20 more frames have passed", function() {
        worldState.isOnPlatform = true;
        for (var i = 0; i < 40; i++)
            player.update(worldState);

        expect(player.currentImage).toBe("bub");
    });

    it("can move right", function() {
        player.moveRight();
        expect(player.x).toBeGreaterThan(100);
    });

    it("can move left", function() {
        player.moveLeft();
        expect(player.x).toBeLessThan(100);
    });

    it("can jump", function() {
        worldState.isJumping = true;
        player.update(worldState);
        expect(player.y).toBe(96);

        player.update(worldState);
        expect(player.y).toBe(92);

        for (var i = 0; i < 50; i++)
            player.update(worldState);
        
        expect(player.y).toBe(-24);
    });

    it("can transition to the jumping animation", function() {
        player.jump();
        expect(player.currentImage).toBe("bubJump");

        for (var i = 0; i < 20; i++)
            player.update(worldState);

        expect(player.currentImage).toBe("bubJumpTail");
    });

    it("can transition to the falling animation", function() {
        player.update(true);
        expect(player.currentImage).toBe("bubFall");

        for (var i = 0; i < 20; i++)
            player.update(true);

        expect(player.currentImage).toBe("bubFallTail");
    });

    xit("cannot jump twice", function() {
        pending
        player.jump();

        for (var i = 0; i < 44; i++) {
            player.jump();
            player.update(player.falling);
            console.log(player.jumping);
        }

        var oldY = player.y;
        player.update(player.falling);
        expect(player.y).toBeGreaterThan(oldY);
    });

});
