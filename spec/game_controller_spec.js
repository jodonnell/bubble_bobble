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

    it("should be able to move right", sinon.test(function() {
        this.stub(gameController.control, 'isHoldingLeft').returns(true);
        gameController.update();
        expect(gameController.bub.x).toBeLessThan(100);
    }));

});
