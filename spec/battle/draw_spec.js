describe("Draw", function() {
    var draw;
    var gameInit;

    beforeEach(function() {
        gameInit = new GameInit(true);
        draw = new Draw(10, 20, 0, 0);
        sinon.stub(draw.context, "fillRect");
        sinon.stub(draw.context, "strokeRect");
    });

    afterEach(function() {
        sinon.stub(draw.context.fillRect.restore());
        sinon.stub(draw.context.strokeRect.restore());

        gameInit.destroyCanvas();
    });

    it("draws the border", function() {
        draw.border();
        expect(draw.context.fillRect.callCount).toEqual(83);
    });

    it("draw a block", function() {
        draw.block(new Block(1, 1), "red");
        expect(draw.context.fillRect.calledOnce).toBeTruthy();
    });

    it("can draw the background", function() {
        draw.background();
        expect(draw.context.fillRect.calledOnce).toBeTruthy();
    });

    it("draw an o", function() {
        draw.shapes(new O(new Block(7, 1)));
        expect(draw.context.fillRect.callCount).toEqual(4);
    });

    it("draw next shape", function() {
        draw.nextShape(new O(new Block(14, 1)));
        expect(draw.context.fillRect.callCount).toEqual(5);
    });

});
