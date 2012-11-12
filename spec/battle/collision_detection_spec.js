describe("CollisionDetection", function() {
    var collisionDetection;

    beforeEach(function() {
        collisionDetection = new CollisionDetection(14, 24);
    });

    it("should have left collision detection", function() {
        var locked = [new Block(6, 1)];
        var falling = new O(new Block(7, 1));

        expect(collisionDetection.doesLeftCollideWithBlocks(falling, locked)).toBeTruthy();

        falling = new O(new Block(5, 1));
        expect(collisionDetection.doesLeftCollideWithBlocks(falling, locked)).toBeFalsy();
    });

    it("should have right collision detection", function() {
        var locked = [new Block(9, 1)];
        var falling = new O(new Block(7, 1));

        expect(collisionDetection.doesRightCollideWithBlocks(falling, locked)).toBeTruthy();

        falling = new O(new Block(6, 1));
        expect(collisionDetection.doesRightCollideWithBlocks(falling, locked)).toBeFalsy();
    });

    it("should have bottom collision detection", function() {
        var locked = [new Block(7, 4)];
        var falling = new O(new Block(7, 2));

        expect(collisionDetection.doesBottomCollideWithBlocks(falling, locked)).toBeTruthy();

        falling = new O(new Block(7, 1));
        expect(collisionDetection.doesBottomCollideWithBlocks(falling, locked)).toBeFalsy();
    });

    it("should have bottom hole detection", function() {
        var locked = [new Block(7, 4)];
        var falling = new O(new Block(7, 2));

        expect(collisionDetection.doesBottomHaveHoles(falling, locked)).toEqual(1);

        locked = [new Block(7, 4), new Block(8, 4)];
        expect(collisionDetection.doesBottomHaveHoles(falling, locked)).toEqual(0);
    });

    it("is at bottom", function() {
        var o = new O(new Block(7,1));
        expect(collisionDetection.isAtBottom(o)).toBeFalsy();

        o = new O(new Block(1,23));
        expect(collisionDetection.isAtBottom(o)).toBeTruthy();

        var j = new J(new Block(1,23));
        j.rotate();
        expect(collisionDetection.isAtBottom(j)).toBeTruthy();
    });

    it("cannot go through right wall", function() {
        var j = new J(new Block(14,1));
        expect(collisionDetection.isAtRightBound(j)).toBeTruthy();
    });

    it("cannot go through left wall", function() {
        var o = new O(new Block(1,1));
        expect(collisionDetection.isAtLeftBound(o)).toBeTruthy();
    });

});
