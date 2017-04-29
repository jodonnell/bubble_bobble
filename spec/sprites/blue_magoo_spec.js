import BlueMagoo from '../../app/sprites/blue_magoo';
import CollisionDetector from '../../app/collision_detector';
import OnscreenSprites from '../../app/onscreen_sprites';
import {LEFT, RIGHT} from '../../app/constants';

describe('Blue Magoos', function () {
    let onscreenSprites;

    beforeEach(function () {
        onscreenSprites = new OnscreenSprites();
    });

    it('should move towards point if its not falling', function () {
        let blueMagoo = new BlueMagoo(100, 0, 0);

        spyOn(blueMagoo, 'shouldTrack').and.returnValue(true);
        spyOn(CollisionDetector, 'isStandingOnObjects').and.returnValue(true);

        onscreenSprites.players[0].x = 105;
        blueMagoo.update({onscreenSprites: onscreenSprites});
        expect(blueMagoo.x).toBeGreaterThan(100);

        onscreenSprites.players[0].x = 95;
        blueMagoo.update({onscreenSprites: onscreenSprites});
        expect(blueMagoo.x).toBe(100);
    });

    it('should switch direction if it goes beyond a bound', function () {
        let blueMagoo = new BlueMagoo(48, 2, 0);

        spyOn(blueMagoo, 'shouldTrack').and.returnValue(false);
        spyOn(CollisionDetector, 'isStandingOnObjects').and.returnValue(true);

        onscreenSprites.players[0].y = 2;

        onscreenSprites.players[0].x = -10;
        blueMagoo.direction = LEFT;
        blueMagoo.update({onscreenSprites: onscreenSprites});
        expect(blueMagoo.direction).toBe(RIGHT);

        onscreenSprites.players[0].x = 1000;
        blueMagoo.direction = RIGHT;
        blueMagoo.x = 752 - blueMagoo.width();
        blueMagoo.update({onscreenSprites: onscreenSprites});
        expect(blueMagoo.direction).toBe(LEFT);
    });


    it('should jump if platform is above and the tracking Y is above it', function () {
        let blueMagoo = new BlueMagoo(100, 100, 0);
        spyOn(blueMagoo, 'shouldTrack').and.returnValue(true);
        spyOn(CollisionDetector, 'areSpritesAboveWithin').and.returnValue(true);
        spyOn(CollisionDetector, 'isStandingOnObjects').and.returnValue(true);

        onscreenSprites.players[0].x = 100;
        onscreenSprites.players[0].y = 150;
        blueMagoo.update({onscreenSprites: onscreenSprites});
        expect(blueMagoo.isJumping()).toBeTruthy();
    });

    it('should not jump if tracking Y is above it but now platform', function () {
        let blueMagoo = new BlueMagoo(100, 100, 0);
        spyOn(blueMagoo, 'shouldTrack').and.returnValue(true);
        spyOn(CollisionDetector, 'isStandingOnObjects').and.returnValue(false);

        onscreenSprites.players[0].x = 100;
        onscreenSprites.players[0].y = 0;
        blueMagoo.update({onscreenSprites: onscreenSprites});
        expect(blueMagoo.isJumping()).toBeFalsy();
    });

    it('should fall', function () {
        let blueMagoo = new BlueMagoo(100, 100, 0);
        onscreenSprites.players[0].x = 0;
        onscreenSprites.players[0].y = 0;

        blueMagoo.update({onscreenSprites: onscreenSprites});
        expect(blueMagoo.y).toBeLessThan(100);
    });

});
