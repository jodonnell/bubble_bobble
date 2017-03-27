import BlueMagoo from '../../app/sprites/blue_magoo';
import CollisionDetector from '../../app/collision_detector';
import OnscreenSprites from '../../app/onscreen_sprites';
import {LEFT, RIGHT} from '../../app/constants';

describe('Blue Magoos', function () {
    var collisionDetector;
    var onscreenSprites;

    beforeEach(function () {
        collisionDetector = new CollisionDetector();
        onscreenSprites = new OnscreenSprites();
    });

    it('should move towards point if its not falling', function () {
        var blueMagoo = new BlueMagoo(1, 100, 0, 0);

        sinon.stub(blueMagoo, 'shouldTrack').returns(true);
        sinon.stub(collisionDetector, 'isStandingOnObjects').returns(true);

        onscreenSprites.players[0].x = 105;
        blueMagoo.update({collisionDetector: collisionDetector, onscreenSprites: onscreenSprites});
        expect(blueMagoo.x).toBeGreaterThan(100);

        onscreenSprites.players[0].x = 95;
        blueMagoo.update({collisionDetector: collisionDetector, onscreenSprites: onscreenSprites});
        expect(blueMagoo.x).toBe(100);
    });

    it('should switch direction if it goes beyond a bound', function () {
        var blueMagoo = new BlueMagoo(1, 48, 2, 0);

        sinon.stub(blueMagoo, 'shouldTrack').returns(false);
        sinon.stub(collisionDetector, 'isStandingOnObjects').returns(true);

        onscreenSprites.players[0].y = 2;

        onscreenSprites.players[0].x = -10;
        blueMagoo.direction = LEFT;
        blueMagoo.update({collisionDetector: collisionDetector, onscreenSprites: onscreenSprites});
        expect(blueMagoo.direction).toBe(RIGHT);

        onscreenSprites.players[0].x = 1000;
        blueMagoo.direction = RIGHT;
        blueMagoo.x = 752 - blueMagoo.width();
        blueMagoo.update({collisionDetector: collisionDetector, onscreenSprites: onscreenSprites});
        expect(blueMagoo.direction).toBe(LEFT);
    });


    it('should jump if platform is above and the tracking Y is above it', function () {
        var blueMagoo = new BlueMagoo(1, 100, 100, 0);
        sinon.stub(blueMagoo, 'shouldTrack').returns(true);
        sinon.stub(collisionDetector, 'areSpritesAboveWithin').returns(true);
        sinon.stub(collisionDetector, 'isStandingOnObjects').returns(true);

        onscreenSprites.players[0].x = 100;
        onscreenSprites.players[0].y = 0;
        blueMagoo.update({collisionDetector: collisionDetector, onscreenSprites: onscreenSprites});
        expect(blueMagoo.isJumping()).toBeTruthy();
    });

    it('should not jump if tracking Y is above it but now platform', function () {
        var blueMagoo = new BlueMagoo(1, 100, 100, 0);
        sinon.stub(blueMagoo, 'shouldTrack').returns(true);
        sinon.stub(collisionDetector, 'areSpritesAboveWithin').returns(false);

        onscreenSprites.players[0].x = 100;
        onscreenSprites.players[0].y = 0;
        blueMagoo.update({collisionDetector: collisionDetector, onscreenSprites: onscreenSprites});
        expect(blueMagoo.isJumping()).toBeFalsy();
    });

    it('should fall', function () {
        var blueMagoo = new BlueMagoo(1, 100, 100, 0);
        onscreenSprites.players[0].x = 0;
        onscreenSprites.players[0].y = 0;

        blueMagoo.update({onscreenSprites: onscreenSprites, collisionDetector: new CollisionDetector()});
        expect(blueMagoo.y).toBeGreaterThan(100);
    });

});
