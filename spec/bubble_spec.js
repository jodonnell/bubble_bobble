describe("Bubble", function() {
    it("should go the right way", function() {
        bubble = new Bubble(100, 100, RIGHT);
        bubble.update();
        expect(bubble.x).toBeGreaterThan(100);

        bubble = new Bubble(100, 100, LEFT);
        bubble.update();
        expect(bubble.x).toBeLessThan(100);
    });
});
