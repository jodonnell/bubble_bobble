describe("Player", function() {
    it("should have a location", function() {
        var player = new Player();
        expect(player.x).toBe(100);
        expect(player.y).toBe(100);
    });

    it("should be able to move right", function() {
        var player = new Player();
        player.moveRight();
        expect(player.x).toBeGreaterThan(100);
    });

    it("should be able to move left", function() {
        var player = new Player();
        player.moveLeft();
        expect(player.x).toBeLessThan(100);
    });

});
