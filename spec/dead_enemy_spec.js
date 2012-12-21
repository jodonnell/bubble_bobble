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

    });


    function nextFrame() {
        for (var i = 0; i < 3; i++) {
            deadEnemy.update(args);
        }
    }
});
