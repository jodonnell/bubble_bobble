"use strict";

describe("Blue Magoos", function () {
    var collisionDetector;
    var onscreenSprites;

    beforeEach(function () {
        collisionDetector = new CollisionDetector();
        onscreenSprites = new OnscreenSprites();
    });

    it("should move towards point if its not falling", sinon.test(function () {
        var blueMagoo = new BlueMagoo(100, 0, 0);

        this.stub(blueMagoo, 'shouldTrack').returns(true);
        this.stub(collisionDetector, 'isStandingOnObjects').returns(true);
        
        onscreenSprites.player.x = 105;
        blueMagoo.update({collisionDetector: collisionDetector, onscreenSprites: onscreenSprites});
        expect(blueMagoo.x).toBeGreaterThan(100);

        onscreenSprites.player.x = 95;
        blueMagoo.update({collisionDetector: collisionDetector, onscreenSprites: onscreenSprites});
        expect(blueMagoo.x).toBe(100);
    }));

    it("should switch direction if it goes beyond a bound", sinon.test(function () {
        var blueMagoo = new BlueMagoo(48, 2, 0);

        this.stub(blueMagoo, 'shouldTrack').returns(false);
        this.stub(collisionDetector, 'isStandingOnObjects').returns(true);


        onscreenSprites.player.y = 2;

        onscreenSprites.player.x = -10;
        blueMagoo.direction = LEFT;
        blueMagoo.update({collisionDetector: collisionDetector, onscreenSprites: onscreenSprites});
        expect(blueMagoo.direction).toBe(RIGHT);

        onscreenSprites.player.x = 1000;
        blueMagoo.direction = RIGHT;
        blueMagoo.x = 752 - blueMagoo.width();
        blueMagoo.update({collisionDetector: collisionDetector, onscreenSprites: onscreenSprites});
        expect(blueMagoo.direction).toBe(LEFT);
    }));


    it("should jump if platform is above and the tracking Y is above it", sinon.test(function () {
        var blueMagoo = new BlueMagoo(100, 100, 0);
        this.stub(blueMagoo, 'shouldTrack').returns(true);
        this.stub(collisionDetector, 'areSpritesAboveWithin').returns(true);
        this.stub(collisionDetector, 'isStandingOnObjects').returns(true);
        
        onscreenSprites.player.x = 100;
        onscreenSprites.player.y = 0;
        blueMagoo.update({collisionDetector: collisionDetector, onscreenSprites: onscreenSprites});
        expect(blueMagoo.isJumping()).toBeTruthy();
    }));

    it("should not jump if tracking Y is above it but now platform", sinon.test(function () {
        var blueMagoo = new BlueMagoo(100, 100, 0);
        this.stub(blueMagoo, 'shouldTrack').returns(true);
        this.stub(collisionDetector, 'areSpritesAboveWithin').returns(false);

        onscreenSprites.player.x = 100;
        onscreenSprites.player.y = 0;
        blueMagoo.update({collisionDetector: collisionDetector, onscreenSprites: onscreenSprites});
        expect(blueMagoo.isJumping()).toBeFalsy();
    }));

    it("should fall", sinon.test(function () {
        var blueMagoo = new BlueMagoo(100, 100, 0);
        onscreenSprites.player.x = 0;
        onscreenSprites.player.y = 0;

        blueMagoo.update({onscreenSprites: onscreenSprites, collisionDetector: new CollisionDetector()});
        expect(blueMagoo.y).toBeGreaterThan(100);
    }));

});
