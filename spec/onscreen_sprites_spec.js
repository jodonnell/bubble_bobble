"use strict";

describe("OnscreenSprites", function () {
    var onscreenSprites;

    beforeEach(function () {
        onscreenSprites = new OnscreenSprites({enemies: [1, 2, 3]});
    });

    it("should have 3 enemies", sinon.test(function () {
        expect(onscreenSprites.enemies.length).toBe(3);
    }));
});
