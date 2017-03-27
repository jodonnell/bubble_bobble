import OnscreenSprites from '../app/onscreen_sprites';

describe('OnscreenSprites', function () {
    var onscreenSprites;

    beforeEach(function () {
        onscreenSprites = new OnscreenSprites({enemies: [1, 2, 3]});
    });

    it('should have 3 enemies', function () {
        expect(onscreenSprites.enemies.length).toBe(3);
    });
});
