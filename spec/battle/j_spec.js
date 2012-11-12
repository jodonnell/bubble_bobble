describe("J", function() {
    var j;

    beforeEach(function() {
        j = new J(new Block(5,1));
    });

    it("can rotate", function() {
        expect(j.occupiedSquares()).toContainBlocks([new Block(6, 1), new Block(5, 1), new Block(4, 1), new Block(6, 2)]);

        j.rotate();
        expect(j.occupiedSquares()).toContainBlocks([new Block(4, 2), new Block(5, 0), new Block(5, 1), new Block(5, 2)]);

        j.rotate();
        expect(j.occupiedSquares()).toContainBlocks([new Block(4, 1), new Block(5, 1), new Block(6, 1), new Block(4, 0)]);
    });

    it("can reverse rotate", function() {
        j.reverseRotate();
        expect(j.rotatedPosition).toEqual(3);
        j.reverseRotate();
        expect(j.rotatedPosition).toEqual(2);
        j.reverseRotate();
        expect(j.rotatedPosition).toEqual(1);
        j.reverseRotate();
        expect(j.rotatedPosition).toEqual(0);
    });

    it("can get the highest block", function() {
        expect(j.highestBlock().y).toEqual(1);
        j.rotate();
        expect(j.highestBlock().y).toEqual(0);
    });

    
});
