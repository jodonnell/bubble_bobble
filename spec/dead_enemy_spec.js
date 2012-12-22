"use strict";

describe("Dead Enemy", function () {
    var args, deadEnemy;

    beforeEach(function () {
        deadEnemy = new DeadEnemy(100, 100, RIGHT);
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

    it("should travel in a parabola", function () {
        deadEnemy.update(args);
        expect(deadEnemy.x).toBe(102);
        expect(deadEnemy.y).toBe(96);

        deadEnemy.update(args);
        expect(deadEnemy.x).toBe(104);
        expect(deadEnemy.y).toBe(92);
    });

    it("should be able to fly left too", function () {
        deadEnemy.direction = LEFT;
        deadEnemy.update(args);
        expect(deadEnemy.x).toBe(98);
        expect(deadEnemy.y).toBe(96);

        deadEnemy.update(args);
        expect(deadEnemy.x).toBe(96);
        expect(deadEnemy.y).toBe(92);
    });

    it("should bounce off a wall", function () {
        deadEnemy.x = RIGHT_BOUND;
        deadEnemy.update(args);
        expect(deadEnemy.x).toBe(RIGHT_BOUND - 2);
        expect(deadEnemy.y).toBe(96);

        deadEnemy.update(args);
        expect(deadEnemy.x).toBe(RIGHT_BOUND - 4);
        expect(deadEnemy.y).toBe(92);
    });

    function nextFrame() {
        for (var i = 0; i < 3; i++) {
            deadEnemy.update(args);
        }
    }
});
