"use strict";

describe("GameController", function () {
    var gameController;

    beforeEach(function () {
        var bub = new Player(200, 100, 'bub', new Control());
        gameController = new GameController([bub]);
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
