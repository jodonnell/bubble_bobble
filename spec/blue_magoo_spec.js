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
        
        onscreenSprites.players[0].x = 105;
        blueMagoo.update({collisionDetector: collisionDetector, onscreenSprites: onscreenSprites});
        expect(blueMagoo.x).toBeGreaterThan(100);

        onscreenSprites.players[0].x = 95;
        blueMagoo.update({collisionDetector: collisionDetector, onscreenSprites: onscreenSprites});
        expect(blueMagoo.x).toBe(100);
    }));

    it("should switch direction if it goes beyond a bound", sinon.test(function () {
        var blueMagoo = new BlueMagoo(48, 2, 0);

        this.stub(blueMagoo, 'shouldTrack').returns(false);
        this.stub(collisionDetector, 'isStandingOnObjects').returns(true);


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
    }));


    it("should jump if platform is above and the tracking Y is above it", sinon.test(function () {
        var blueMagoo = new BlueMagoo(100, 100, 0);
        this.stub(blueMagoo, 'shouldTrack').returns(true);
        this.stub(collisionDetector, 'areSpritesAboveWithin').returns(true);
        this.stub(collisionDetector, 'isStandingOnObjects').returns(true);
        
        onscreenSprites.players[0].x = 100;
        onscreenSprites.players[0].y = 0;
        blueMagoo.update({collisionDetector: collisionDetector, onscreenSprites: onscreenSprites});
        expect(blueMagoo.isJumping()).toBeTruthy();
    }));

    it("should not jump if tracking Y is above it but now platform", sinon.test(function () {
        var blueMagoo = new BlueMagoo(100, 100, 0);
        this.stub(blueMagoo, 'shouldTrack').returns(true);
        this.stub(collisionDetector, 'areSpritesAboveWithin').returns(false);

        onscreenSprites.players[0].x = 100;
        onscreenSprites.players[0].y = 0;
        blueMagoo.update({collisionDetector: collisionDetector, onscreenSprites: onscreenSprites});
        expect(blueMagoo.isJumping()).toBeFalsy();
    }));

    it("should fall", sinon.test(function () {
        var blueMagoo = new BlueMagoo(100, 100, 0);
        onscreenSprites.players[0].x = 0;
        onscreenSprites.players[0].y = 0;

        blueMagoo.update({onscreenSprites: onscreenSprites, collisionDetector: new CollisionDetector()});
        expect(blueMagoo.y).toBeGreaterThan(100);
    }));

});
