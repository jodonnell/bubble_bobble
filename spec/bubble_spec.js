"use strict";

describe("Bubble", function () {
    var args;

    beforeEach(function () {
        var gameController = {bubbles: []};
        args = {gameController: gameController};
    });

    it("should go the right way", function () {
        var bubble = new Bubble(100, 100, RIGHT);
        bubble.update(args);
        expect(bubble.x).toBeGreaterThan(100);

        bubble = new Bubble(100, 100, LEFT);
        bubble.update(args);
        expect(bubble.x).toBeLessThan(100);
    });

    it("will go up after it is fully formed", function () {
        var bubble = new Bubble(100, 100, RIGHT);
        while (!bubble.isFullyFormed()) {
            bubble.update(args);
        }

        bubble.update(args);
        expect(bubble.y).toBeLessThan(100);
    });

    it("removes bubbles after they are offscreen", function () {
        var bubble = new Bubble(100, 0, RIGHT);
        bubble.currentImage = 'bigBubble';

        var gameController = {bubbles: [bubble]};
        var args = {gameController: gameController};

        for (var i = 0; i < 34; i++) {
            bubble.update(args);
        }

        expect(gameController.bubbles.length).toBe(0);
    });

});
