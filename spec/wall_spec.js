describe("Wall", function() {
    var wall;

    beforeEach(function() {
        wall = new Wall(100, 200);
    });

    it("should have a position", function() {
        expect(wall.x).toEqual(100);
        expect(wall.y).toEqual(200);
    });
});
