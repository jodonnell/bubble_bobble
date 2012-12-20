"use strict";

describe("Bubble", function () {
    var args, bubble;

    beforeEach(function () {
        var onscreenSprites = new OnscreenSprites();
        args = {onscreenSprites: onscreenSprites, collisionDetector: new CollisionDetector()};
        bubble = new Bubble(100, 100, RIGHT);
    });

    it("should go the right way", function () {
        bubble.update(args);
        expect(bubble.x).toBeGreaterThan(100);

        bubble = new Bubble(100, 100, LEFT);
        bubble.update(args);
        expect(bubble.x).toBeLessThan(100);
    });

    it("will go up after it is fully formed", function () {
        while (!bubble.isFullyFormed()) {
            bubble.update(args);
        }

        bubble.update(args);
        expect(bubble.y).toBeLessThan(100);
    });

    it("removes bubbles after they are offscreen", function () {
        bubble.currentImage = 'bigBubble';

        for (var i = 0; i < 34; i++) {
            bubble.update(args);
        }

        expect(args.onscreenSprites.bubbles.length).toBe(0);
    });

    it("should get trapped when hit by a bubble", function () {
        args.onscreenSprites.enemies = [new BlueMagoo(100, 100, RIGHT)];
        bubble.update(args);
        expect(bubble.hasEnemy()).toBeTruthy();
        expect(bubble.getCurrentImage()).toBe('blueMagooTrappedRight');
        expect(bubble.isFullyFormed()).toBeTruthy();
        expect(args.onscreenSprites.enemies.length).toBe(0);
    });

    it("should only trap enemies if the bubble is empty", function () {
        args.onscreenSprites.enemies = [new BlueMagoo(100, 100, RIGHT), new BlueMagoo(100, 100, RIGHT)];
        bubble.update(args);
        bubble.update(args);
        expect(args.onscreenSprites.enemies.length).toBe(1);
    });

    it("should move to the trapped enemies position", function () {
        args.onscreenSprites.enemies = [new BlueMagoo(105, 105, RIGHT)];
        bubble.update(args);
        expect(bubble.x).toBe(105);
        expect(bubble.y).toBe(105);
    });

    it("should animate a trapped enemy", function () {
        args.onscreenSprites.enemies = [new BlueMagoo(110, 110, RIGHT)];
        bubble.trap(args.onscreenSprites, args.onscreenSprites.enemies[0]);
        expect(bubble.getCurrentImage()).toBe('blueMagooTrappedRight');
        for (var i = 0; i < 15; i++) {
            bubble.update(args);
        }

        expect(bubble.getCurrentImage()).toBe('blueMagooTrappedLeft');
    });

});
