describe("Bubble", function() {
    it("should go the right way", function() {
        bubble = new Bubble(100, 100, RIGHT);
        bubble.update();
        expect(bubble.x).toBeGreaterThan(100);

        bubble = new Bubble(100, 100, LEFT);
        bubble.update();
        expect(bubble.x).toBeLessThan(100);
    });

    it("will go up after it is fully formed", function() {
        bubble = new Bubble(100, 100, RIGHT);
        while(!bubble.isFullyFormed())
            bubble.update();

        bubble.update()
        expect(bubble.y).toBeLessThan(100);
    });
});
