"use strict";

describe("Title Screen", function () {
    var titleScreen;

    beforeEach(function () {
        this.addMatchers({
            toBeCalledWith: function() {
                return this.actual.calledWith.apply(this.actual, arguments);
            }
        });

        titleScreen = new TitleScreen(new InputControl());
    });

    it("should have a black background", sinon.test(function () {
        var fillRectSpy = this.spy(gameContext, 'fillRect');
        titleScreen.draw();
        expect(fillRectSpy).toBeCalledWith(0, 0, gameInit.width, gameInit.height);
    }));

    it("should display Solo Game", sinon.test(function () {
        var fillTextSpy = this.spy(gameContext, 'fillText');
        titleScreen.draw();
        expect(fillTextSpy).toBeCalledWith("Solo Game", 299, 260);
    }));

    it("should display Online Game", sinon.test(function () {
        var fillTextSpy = this.spy(gameContext, 'fillText');
        titleScreen.draw();
        expect(fillTextSpy).toBeCalledWith("Online Game", 280, 340);
    }));

    it("should blink", sinon.test(function () {
        var fillStyleSpy = this.spy(titleScreen, 'setFillStyle');
        for (var i = 0; i < 15; i++) {
            titleScreen.update();
            titleScreen.draw();
        }
        expect(fillStyleSpy).toBeCalledWith('yellow');
    }));

    it("should blink on the second option when down is hit", sinon.test(function () {
        var fillStyleSpy = this.spy(titleScreen, '_drawMenuText');
        this.stub(titleScreen._control, 'isHoldingDown').returns(true);
        titleScreen.update();
        expect(titleScreen._selectedEntry).toBe(1);
    }));

    it("should not allow the selected entry to be out of bounds", sinon.test(function () {
        this.stub(titleScreen._control, 'isHoldingUp').returns(true);
        titleScreen.update();
        expect(titleScreen._selectedEntry).toBe(0);

        this.stub(titleScreen._control, 'isHoldingDown').returns(true);
        titleScreen.update();
        titleScreen._control.isHoldingDown.restore();
        this.stub(titleScreen._control, 'isHoldingDown').returns(false);
        titleScreen.update();

        titleScreen._control.isHoldingDown.restore();
        this.stub(titleScreen._control, 'isHoldingDown').returns(true);
        titleScreen.update();

        expect(titleScreen._selectedEntry).toBe(1);

    }));

});
