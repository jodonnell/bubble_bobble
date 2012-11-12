describe("O", function() {
    var o;

    beforeEach(function() {
        o = new O(new Block(1,1));
    });

    it("should be able to fall", function() {
        o.fall();
        expect(o.block.y).toEqual(2);
    });

    it("can move right", function() {
        o.moveRight();
        expect(o.block.x).toEqual(2);
    });

    it("can move left", function() {
        o = new O(new Block(2,1));
        o.moveLeft();
        expect(o.block.x).toEqual(1);
    });

    it("can give you the occupied os", function() {
        expect(o.occupiedSquares().length).toEqual(4);
    });
});
