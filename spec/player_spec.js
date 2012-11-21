describe("Player", function() {
    var player;
    var worldState;
    
    beforeEach(function() {
        player = new Player(100, 100);
        worldState = {isHoldingRight: false, isHoldingLeft: false, isJumping: false, isOnPlatform: false};
    });

    it("should have a location", function() {
        expect(player.x).toBe(100);
        expect(player.y).toBe(100);
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
        
        expect(player.y).toBe(11);
    });

    xit("cannot jump twice", function() {
        pending
        player.jump();

        for (var i = 0; i < 44; i++) {
            player.jump();
            player.update(player.falling);
        }

        var oldY = player.y;
        player.update(player.falling);
        expect(player.y).toBeGreaterThan(oldY);
    });

});
