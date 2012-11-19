describe("GameController", function() {
    var gameController;
    var gameInit;

    beforeEach(function() {
        gameInit = new GameInit(true);
        gameController = new GameController(gameInit);
    });

    afterEach(function() {
        gameInit.destroyCanvas();
    });

    it("should be able to move right", sinon.test(function() {
        this.stub(gameController.control, 'isHoldingRight').returns(true);
        gameController.update();
        expect(gameController.bub.x).toBeGreaterThan(100);
    }));

    it("should be able to move left", sinon.test(function() {
        this.stub(gameController.control, 'isHoldingLeft').returns(true);
        gameController.update();
        expect(gameController.bub.x).toBeLessThan(100);
    }));

    it("should fall when nothing is under it", function() {
        gameController.update();
        expect(gameController.bub.y).toBeGreaterThan(100);
    });

    it("should land on a platform while falling", function() {
        for (var i = 0; i < 100; i++)
            gameController.update();
        expect(gameController.bub.y).toBe(151);
    });

    it("should fall at the left boundary", function() {
        gameController.bub.x = gameController.walls[0].x - gameController.bub.width(gameController.images);
        for (var i = 0; i < 100; i++)
            gameController.update();
        expect(gameController.bub.y).toBe(151);

        gameController.bub.x -= 1;
        gameController.update();
        expect(gameController.bub.y).toBeGreaterThan(151);
    });

    it("should fall at the right boundary", function() {
        gameController.bub.x = gameController.walls[0].x + gameController.walls[0].width(gameController.images);
        for (var i = 0; i < 100; i++)
            gameController.update();

        expect(gameController.bub.y).toBe(151);

        gameController.bub.x += 1;
        gameController.update();
        expect(gameController.bub.y).toBeGreaterThan(151);
    });

    it("should be able to jump", sinon.test(function() {
        for (var i = 0; i < 100; i++)
            gameController.update();
        expect(gameController.bub.y).toBe(151);

        this.stub(gameController.control, 'isJumping').returns(true);
        for (var i = 0; i < 100; i++)
            gameController.update();
        expect(gameController.bub.y).toBeLessThan(151);

    }));

});
