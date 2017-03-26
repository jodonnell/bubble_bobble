"use strict";

describe("LinearAnimation", function () {
    var animation;

    beforeEach(function () {
        animation = new LinearAnimation(3, ['deadEnemyRight', 'deadEnemyBottom', 'deadEnemyLeft', 'deadEnemyTop']);
    });

    it("starts with the correct current image", function () {
        expect(animation.currentImage).toBe('deadEnemyRight');
    });

    it("transitions to the 2nd", function () {
        advanceOneFrame();
        expect(animation.currentImage).toBe('deadEnemyBottom');
    });

    it("transitions to the 3rd", function () {
        advanceOneFrame();
        advanceOneFrame();
        expect(animation.currentImage).toBe('deadEnemyLeft');
    });

    it("transitions to the 4th", function () {
        advanceOneFrame();
        advanceOneFrame();
        advanceOneFrame();
        expect(animation.currentImage).toBe('deadEnemyTop');
    });

    it("loops back to the start", function () {
        advanceOneLoop();
        expect(animation.currentImage).toBe('deadEnemyRight');
    });

    it("throws an error if you try to check if is over on an infinite animation", function () {
        expect(animation.isOver).toThrow();
    });

    describe('run one time', function() {
        beforeEach(function() {
            animation.runTimes = 1;
        });

        it('can just run once and call the callback', function() {
            advanceOneLoop();
            advanceOneFrame();
            expect(animation.currentImage).toBe('deadEnemyRight');
            expect(animation.isOver()).toBe(true);
        });
    });

    function advanceOneFrame() {
        animation.update();
        animation.update();
        animation.update();
    }

    function advanceOneLoop() {
        advanceOneFrame();
        advanceOneFrame();
        advanceOneFrame();
        advanceOneFrame();
    }

});
