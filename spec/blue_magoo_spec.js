describe("Blue Magoos", function() {
    it("should move towards point if its not falling", sinon.test(function() {
        blueMagoo = new BlueMagoo(100, 0, 0)

        this.stub(blueMagoo, 'shouldTrack').returns(true);

        blueMagoo.update(false, 105);
        expect(blueMagoo.x).toBeGreaterThan(100);

        blueMagoo.update(false, 95);
        expect(blueMagoo.x).toBe(100);
    }));

    it("should switch direction if it goes beyond a bound", sinon.test(function() {
        blueMagoo = new BlueMagoo(48, 2, 0)
        this.stub(blueMagoo, 'shouldTrack').returns(false);

        blueMagoo.direction = LEFT;
        blueMagoo.update(false, -10, 2);
        expect(blueMagoo.direction).toBe(RIGHT);

        blueMagoo.direction = RIGHT;
        blueMagoo.x = 752 - blueMagoo.width();
        blueMagoo.update(false, 1000, 2);
        expect(blueMagoo.direction).toBe(LEFT);
    }));

});
