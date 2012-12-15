"use strict";

describe("Blue Magoos", function () {
    var collisionDetector;

    beforeEach(function () {
        collisionDetector = new CollisionDetector({});
    });

    it("should move towards point if its not falling", sinon.test(function () {
        var blueMagoo = new BlueMagoo(100, 0, 0);

        this.stub(blueMagoo, 'shouldTrack').returns(true);
        this.stub(collisionDetector, 'isSpriteStandingOnWall').returns(true);

        blueMagoo.update({collisionDetector: collisionDetector, player: {x: 105}});
        expect(blueMagoo.x).toBeGreaterThan(100);

        blueMagoo.update({collisionDetector: collisionDetector, player: {x: 95}});
        expect(blueMagoo.x).toBe(100);
    }));

    it("should switch direction if it goes beyond a bound", sinon.test(function () {
        var blueMagoo = new BlueMagoo(48, 2, 0);

        this.stub(blueMagoo, 'shouldTrack').returns(false);
        this.stub(collisionDetector, 'isSpriteStandingOnWall').returns(true);

        blueMagoo.direction = LEFT;
        blueMagoo.update({collisionDetector: collisionDetector, player: {x: -10, y: 2}});
        expect(blueMagoo.direction).toBe(RIGHT);

        blueMagoo.direction = RIGHT;
        blueMagoo.x = 752 - blueMagoo.width();
        blueMagoo.update({collisionDetector: collisionDetector, player: {x: 1000, y: 2}});
        expect(blueMagoo.direction).toBe(LEFT);
    }));


    it("should jump if platform is above and the tracking Y is above it", sinon.test(function () {
        var blueMagoo = new BlueMagoo(100, 100, 0);
        this.stub(blueMagoo, 'shouldTrack').returns(true);
        this.stub(collisionDetector, 'isPlatformAboveWithin').returns(true);
        this.stub(collisionDetector, 'isSpriteStandingOnWall').returns(true);
        
        blueMagoo.update({collisionDetector: collisionDetector, player: {x: 100, y: 0}});
        expect(blueMagoo.isJumping()).toBeTruthy();
    }));

    it("should not jump if tracking Y is above it but now platform", sinon.test(function () {
        var blueMagoo = new BlueMagoo(100, 100, 0);
        this.stub(blueMagoo, 'shouldTrack').returns(true);
        this.stub(collisionDetector, 'isPlatformAboveWithin').returns(false);

        blueMagoo.update({collisionDetector: collisionDetector, player: {x: 100, y: 0}});
        expect(blueMagoo.isJumping()).toBeFalsy();
    }));

});
