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
});
