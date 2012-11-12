describe("GameInit", function() {
    var gameInit;

    beforeEach(function() {
        gameInit = new GameInit(true);
    });

    afterEach(function() {
        gameInit.destroyCanvas();
    });

    it("should have a canvas element", function() {
        expect($('#gameCanvas').length).toEqual(1);
    });
});
