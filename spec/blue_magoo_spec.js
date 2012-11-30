describe("Blue Magoos", function() {
    it("should move towards point if its not falling", sinon.test(function() {
        blueMagoo = new BlueMagoo(100, 0, 0)

        this.stub(blueMagoo, 'shouldTrack').returns(true);

        blueMagoo.update(false, 105);
        expect(blueMagoo.x).toBeGreaterThan(100);

        blueMagoo.update(false, 95);
        expect(blueMagoo.x).toBe(100);
    }));
});
