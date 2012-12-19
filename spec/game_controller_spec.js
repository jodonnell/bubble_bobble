"use strict";

describe("GameController", function () {
    var gameController, gameInit;

    beforeEach(function () {
        gameInit = new GameInit(true);
        gameController = new GameController(gameInit);
    });

    afterEach(function () {
        gameInit.destroyCanvas();
    });

    it("can have enemies land on platforms", function () {
        var blueMagoo = new BlueMagoo(0, 0, 0);
        gameController.onscreenSprites.enemies.push(blueMagoo);
        
        gameController.onscreenSprites.walls.push(new Wall(0, blueMagoo.bottomSide() + 3));
        gameController.update();
        gameController.update();
        expect(blueMagoo.y).toBe(3);
    });

});
