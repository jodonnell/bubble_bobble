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

        expect(player.currentImage).toBe("bub_tail");
    });

    it("should change remove tail wag frame after 20 more frames have passed", function() {
        for (var i = 0; i < 40; i++)
            player.update();

        expect(player.currentImage).toBe("bub");
    });

    it("should be able to move right", function() {
        player.moveRight();
        expect(player.x).toBeGreaterThan(100);
    });

    it("should be able to move left", function() {
        player.moveLeft();
        expect(player.x).toBeLessThan(100);
    });

});
