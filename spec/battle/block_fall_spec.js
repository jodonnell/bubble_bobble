describe("BlockFall", function() {
    var blockFall;

    beforeEach(function() {
        blockFall = new BlockFall(new CreateShape(true), null, new Combatant(10));
    });

    it("should have shapes fall periodically", function() {
        blockFall.update(false);
        var startingY = blockFall.fallingShape.block.y;
        for (var i = 0; i <= 40; i++)
            blockFall.update(false);
        expect(blockFall.fallingShape.block.y).toNotEqual(startingY);
    });

    it("update should work", function() {
        for (var i = 0; i <= 1000; i++)
            blockFall.update(false);
        expect(blockFall.blocks.length).toNotEqual(0);
    });

    it("should stop blocks when they hit the ground", function() {
        blockFall.fallingShape = blockFall.createShape.o();
        expect(blockFall.blocks.length).toEqual(0);
        for (var i = 0; i <= 40; i++)
            blockFall.update(true);

        expect(blockFall.blocks.length).toNotEqual(0);
        expect(blockFall.blocks).toContainBlock(new Block(6, 20));
    });

    it("should stop shapes when they land on other blocks", function() {
        blockFall.blocks = [new Block(5, 19)];

        blockFall.fallingShape = blockFall.createShape.j();

        blockFall.moveRight();
        for (var i = 0; i <= 45; i++)
            blockFall.update(true);

        expect(blockFall.blocks).toContainBlock(new Block(5, 18));
    });

    it("should let you move right", function() {
        blockFall.fallingShape = blockFall.createShape.o();
        blockFall.moveRight();
        expect(blockFall.fallingShape.block.x).toEqual(6);
    });

    it("should not let you move right through another object", function() {
        blockFall.blocks = [new Block(7, 0)];
        blockFall.fallingShape = blockFall.createShape.o();
        blockFall.moveRight();
        expect(blockFall.fallingShape.block.x).toEqual(5);
    });

    it("should not let you move left through another object", function() {
        blockFall.blocks = [new Block(4, 0)];
        blockFall.fallingShape = blockFall.createShape.o();
        blockFall.moveLeft();
        expect(blockFall.fallingShape.block.x).toEqual(5);
    });

    it("should not let you move right through wall", function() {
        blockFall.fallingShape = blockFall.createShape.o();
        for (var i = 0; i <= 15; i++)
            blockFall.moveRight();
        expect(blockFall.fallingShape.block.x).toEqual(9);
    });

    it("should be able to remove completed lines", function() {
        for (var i = 1; i <= blockFall.RIGHT_BOUND; i++)
            blockFall.blocks.push(new Block(i, 1))

        expect(blockFall.isLineComplete(1)).toBeTruthy();
        blockFall.completedLines();
        expect(blockFall.blocks.length).toEqual(0);
    });

    it("blocksContain", function() {
        for (var i = 1; i <= blockFall.RIGHT_BOUND; i++)
            blockFall.blocks.push(new Block(i, 1))

        expect(blockFall.blocksContain(new Block(10, 1))).toBeTruthy();
    });

    it("should sink down above when you complete a line", function() {
        for (var i = 1; i <= blockFall.RIGHT_BOUND; i++)
            blockFall.blocks.push(new Block(i, 20))

        for (var i = 1; i <= blockFall.RIGHT_BOUND - 3; i++)
            blockFall.blocks.push(new Block(i, 19))

        blockFall.completedLines();
        expect(blockFall.blocks[0].y).toEqual(20);
    });

    it("should not let you rotate through a wall", function() {
        blockFall.fallingShape = new J(new Block(9, 1));
        blockFall.rotate();
        blockFall.moveRight();
        blockFall.rotate();
        expect(blockFall.fallingShape.rotatedPosition).toEqual(1);
    });

    it("should not let you reverse rotate through a wall", function() {
        blockFall.fallingShape = new T(new Block(9, 1));
        blockFall.rotateCounterClockwise();
        blockFall.moveRight();
        blockFall.rotateCounterClockwise();
        expect(blockFall.fallingShape.rotatedPosition).toEqual(3);
    });

    it("should not let you rotate through another peice", function() {
        blockFall.blocks = [new Block(5, 19), new Block(5, 18), new Block(5, 17), new Block(5, 16)];
        blockFall.fallingShape = new T(new Block(6, 18));
        blockFall.fallingShape.rotatedPosition = 1;
        blockFall.rotate();
        expect(blockFall.fallingShape.rotatedPosition).toEqual(1);
    });

    it("should be able to detect game over", function() {
        blockFall.blocks = [new Block(5, 1)];
        for (var i = 0; i < 50; i++)
            blockFall.update(true);

        expect(blockFall.gameOver).toBeTruthy();
    });

    it("should keep score", function() {
        for (var i = 1; i <= blockFall.RIGHT_BOUND; i++)
            blockFall.blocks.push(new Block(i, 1))

        blockFall.completedLines();
        expect(blockFall.damageDone).toEqual(1);
    });

    function drawMock() {
        return {
            background: function() {},
            border: function() {},
            nextShape: function() {},
            shapes: function() {},
            score: function() {},
            block: function() {}
        };
    };

    it("should draw the next shape", function() {
        var dMock = drawMock();
        var mock = sinon.mock(dMock).expects("nextShape");
        blockFall.draw = dMock;
        blockFall._createFallingShape();
        blockFall.drawScreen();
        mock.verify();
    });

    it("the next block should be the next block", function() {
        blockFall.update(true);
        var nextShape = blockFall.createShape.nextShape;
        
        for (var i = 0; i < 50; i++)
            blockFall.update(true);

        expect(blockFall.fallingShape.color).toEqual(nextShape.color);
    });

    it("should let you hard drop", function() {
        blockFall.update();
        blockFall.hardDrop();
        expect(blockFall.blocks.length).toNotEqual(0);
        expect(blockFall.blocks).toContainBlock(new Block(5, 19));
    });

    it("should be able to count how many touches", function() {
        blockFall.update();
        blockFall._fallAsFarAsPossible();
        expect(blockFall.howManyTouches()).toEqual(1);

        blockFall.shapeHitGround();
        blockFall.rotate();
        blockFall._fallAsFarAsPossible();
        expect(blockFall.howManyTouches()).toEqual(2);

    });
});
