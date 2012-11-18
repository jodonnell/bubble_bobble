describe("Player", function() {
    var player;
    
    beforeEach(function() {
        player = new Player();
    });

    it("should have a location", function() {
        expect(player.x).toBe(100);
        expect(player.y).toBe(100);
    });

    it("should change to tail wag frame after 20 frames have passed", function() {
        expect(player.currentImage).toBe("bub");

        for (var i = 0; i < 20; i++)
            player.update();

        expect(player.currentImage).toBe("bubTail");
    });

    it("should change remove tail wag frame after 20 more frames have passed", function() {
        for (var i = 0; i < 40; i++)
            player.update();

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
        player.jump();

        player.update();
        expect(player.y).toBe(94);

        player.update();
        expect(player.y).toBe(88);

        for (var i = 0; i < 50; i++)
            player.update();
        
        expect(player.y).toBe(-140);
    });

    it("can transition to the jumping animation", function() {
        player.jump();
        expect(player.currentImage).toBe("bubJump");

        for (var i = 0; i < 20; i++)
            player.update();

        expect(player.currentImage).toBe("bubJumpTail");
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
