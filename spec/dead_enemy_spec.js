"use strict";

describe("Dead Enemy", function () {
    var args, deadEnemy;

    beforeEach(function () {
        deadEnemy = new DeadEnemy(100, 100);
        args = {collisionDetector: new CollisionDetector(), onscreenSprites: new OnscreenSprites({DeadEnemies: [deadEnemy]})};
    });

    it("should animate correctly", function () {
        expect(deadEnemy.currentImage).toBe('deadEnemyRight');
        nextFrame();
        expect(deadEnemy.currentImage).toBe('deadEnemyBottom');
        nextFrame();
        expect(deadEnemy.currentImage).toBe('deadEnemyLeft');
        nextFrame();
        expect(deadEnemy.currentImage).toBe('deadEnemyTop');
        nextFrame();
        expect(deadEnemy.currentImage).toBe('deadEnemyRight');
    });

    it("should travel its silly flight", function () {
        deadEnemy.update(args);
        expect(deadEnemy.x).toBe(102);
        expect(deadEnemy.y).toBe(96);

        deadEnemy.update(args);
        expect(deadEnemy.x).toBe(104);
        expect(deadEnemy.y).toBe(92);
    });

    function nextFrame() {
        for (var i = 0; i < 3; i++) {
            deadEnemy.update(args);
        }
    }
});
