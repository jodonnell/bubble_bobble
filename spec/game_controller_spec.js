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
        gameController.bub.x = 100;
        this.stub(gameController.control, 'isHoldingRight').returns(true);
        gameController.update();
        expect(gameController.bub.x).toBeGreaterThan(100);
    }));

    it("should be able to move left", sinon.test(function() {
        gameController.bub.x = 100;
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
        expect(gameController.bub.y).toBe(160);
    });

    it("should fall at the left boundary", function() {
        gameController.bub.x = 100;
        gameController.walls = [new Wall(100 + gameController.bub.width(gameController.images) , gameController.bub.y + gameController.bub.height(gameController.images))]
        gameController.update();
        expect(gameController.bub.y).toBe(100);

        gameController.bub.x -= 1;
        gameController.update();
        expect(gameController.bub.y).toBeGreaterThan(100);
    });

    it("should fall at the right boundary", function() {
        gameController.bub.x = 100;
        gameController.walls = [new Wall(100 - gameController.bub.width(gameController.images) + 3 , gameController.bub.y + gameController.bub.height(gameController.images))]
        gameController.update();
        expect(gameController.bub.y).toBe(100);

        gameController.bub.x += 1;
        gameController.update();
        expect(gameController.bub.y).toBeGreaterThan(100);
    });

    it("should be able to jump", sinon.test(function() {
        for (var i = 0; i < 100; i++)
            gameController.update();
        expect(gameController.bub.y).toBe(160);

        this.stub(gameController.control, 'isJumping').returns(true);
        for (var i = 0; i < 100; i++)
            gameController.update();
        expect(gameController.bub.y).toBeLessThan(160);

    }));

});
