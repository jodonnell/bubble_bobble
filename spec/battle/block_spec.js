describe("Block", function() {
    it("should be able to covert to normal position", function() {
        var block = new Block(0, 0);
        expect(block.getX()).toEqual(0);
        expect(block.getY()).toEqual(0);

        block = new Block(1, 1);
        expect(block.getX()).toEqual(block.BLOCK_SIZE);
        expect(block.getY()).toEqual(block.BLOCK_SIZE);
    });

    it("should be able to make a copy", function() {
        var block = new Block(0, 0, 'red');
        expect(block.copy().x).toEqual(0);
        expect(block.copy().y).toEqual(0);
    });

});
