describe("Blue Magoos", function() {
    var collisionDetector;

    beforeEach(function() {
        collisionDetector = new CollisionDetector([], [], [], []);
    });

    it("should move towards point if its not falling", sinon.test(function() {
        var blueMagoo = new BlueMagoo(100, 0, 0)

        this.stub(blueMagoo, 'shouldTrack').returns(true);
        this.stub(collisionDetector, 'isSpriteStandingOnWall').returns(true);

        blueMagoo.update(collisionDetector, 105);
        expect(blueMagoo.x).toBeGreaterThan(100);

        blueMagoo.update(collisionDetector, 95);
        expect(blueMagoo.x).toBe(100);
    }));

    it("should switch direction if it goes beyond a bound", sinon.test(function() {
        var blueMagoo = new BlueMagoo(48, 2, 0)

        this.stub(blueMagoo, 'shouldTrack').returns(false);
        this.stub(collisionDetector, 'isSpriteStandingOnWall').returns(true);

        blueMagoo.direction = LEFT;
        blueMagoo.update(collisionDetector, -10, 2);
        expect(blueMagoo.direction).toBe(RIGHT);

        blueMagoo.direction = RIGHT;
        blueMagoo.x = 752 - blueMagoo.width();
        blueMagoo.update(collisionDetector, 1000, 2);
        expect(blueMagoo.direction).toBe(LEFT);
    }));


    it("should jump if platform is above and the tracking Y is above it", sinon.test(function() {
        var blueMagoo = new BlueMagoo(100, 100, 0)
        this.stub(blueMagoo, 'shouldTrack').returns(true);

        blueMagoo.update(collisionDetector, 100, 0);
        expect(blueMagoo.isJumping()).toBeTruthy();
    }));

    xit("should not jump if tracking Y is above it but now platform", sinon.test(function() {
        var blueMagoo = new BlueMagoo(100, 100, 0)
        this.stub(blueMagoo, 'shouldTrack').returns(true);

        blueMagoo.update(collisionDetector, 100, 0);
        expect(blueMagoo.isJumping()).toBeTruthy();
    }));

});
