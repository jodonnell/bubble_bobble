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
        expect(gameController.bub.y).toBe(157);
    });

    it("should fall at the left boundary", function() {
        gameController.bub.x = gameController.walls[0].x - gameController.bub.width(gameController.images);
        for (var i = 0; i < 100; i++)
            gameController.update();
        expect(gameController.bub.y).toBe(157);

        gameController.bub.x -= 1;
        gameController.update();
        expect(gameController.bub.y).toBeGreaterThan(157);
    });

    it("should not land on a platform while falling if no platform", function() {
        gameController.bub.x = 100 + 46;
        for (var i = 0; i < 100; i++)
            gameController.update();
        expect(gameController.bub.y).toBeGreaterThan(155.5);
    });

    it("should be able to jump", sinon.test(function() {
        for (var i = 0; i < 100; i++)
            gameController.update();
        expect(gameController.bub.y).toBe(157);

        this.stub(gameController.control, 'isJumping').returns(true);
        for (var i = 0; i < 100; i++)
            gameController.update();
        expect(gameController.bub.y).toBeLessThan(155.5);

    }));

});
