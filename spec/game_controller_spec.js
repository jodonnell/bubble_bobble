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

    it("should land on a platform while falling", function () {
        for (var i = 0; i < 100; i++) {
            gameController.update();
        }
        expect(gameController.player.y).toBe(159);
    });

    it("should fall at the left boundary", function () {
        gameController.player.x = 100;
        gameController.walls.push(new Wall(100 + gameController.player.width(), gameController.player.y + gameController.player.height()));
        gameController.update();
        expect(gameController.player.y).toBe(100);

        gameController.player.x -= 1;
        gameController.update();
        expect(gameController.player.y).toBeGreaterThan(100);
    });

    it("should fall at the right boundary", function () {
        gameController.player.x = 100;
        gameController.walls.push(new Wall(100 - gameController.player.width() + 3, gameController.player.y + gameController.player.height()));
        gameController.update();
        expect(gameController.player.y).toBe(100);

        gameController.player.x += 1;
        gameController.update();
        expect(gameController.player.y).toBeGreaterThan(100);
    });

    it("should have 3 enemies", sinon.test(function () {
        expect(gameController.enemies.length).toBe(3);
    }));

    it("enemies fall", sinon.test(function () {
        expect(gameController.enemies[0].y).toBe(20);
        gameController.update();
        expect(gameController.enemies[0].y).toBe(23);
    }));

    it("can have enemies land on platforms", function () {
        var blueMagoo = new BlueMagoo(0, 0, 0);
        gameController.enemies.push(blueMagoo);
        
        gameController.walls.push(new Wall(0, blueMagoo.bottomSide() + 3));
        gameController.update();
        gameController.update();
        expect(blueMagoo.y).toBe(3);
    });

});
