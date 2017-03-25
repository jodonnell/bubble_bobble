"use strict";

describe("Title Screen", function () {
    var titleScreen;

    beforeEach(function () {
        titleScreen = new TitleScreen(new InputControl());
    });

    it("should have a black background", sinon.test(function () {
        var fillRectSpy = spyOn(gameContext, 'fillRect');
        titleScreen.draw();
        expect(fillRectSpy).toHaveBeenCalledWith(0, 0, gameInit.width, gameInit.height);
    }));

    it("should display Solo Game", sinon.test(function () {
        var fillTextSpy = spyOn(gameContext, 'fillText');
        titleScreen.draw();
        expect(fillTextSpy).toHaveBeenCalledWith("Solo Game", 299, 260);
    }));

    it("should display Online Game", sinon.test(function () {
        var fillTextSpy = spyOn(gameContext, 'fillText');
        titleScreen.draw();
        expect(fillTextSpy).toHaveBeenCalledWith("Online Game", 280, 310);
    }));

    it("should blink", sinon.test(function () {
        var fillStyleSpy = spyOn(titleScreen, 'setFillStyle');
        for (var i = 0; i < 15; i++) {
            titleScreen.update();
            titleScreen.draw();
        }
        expect(fillStyleSpy).toHaveBeenCalledWith('yellow');
    }));

    it("should blink on the second option when down is hit", sinon.test(function () {
        var fillStyleSpy = spyOn(titleScreen, '_drawMenuText');
        this.stub(titleScreen._control, 'isHoldingDown').returns(true);
        titleScreen.update();
        expect(titleScreen._selectedEntry).toBe(1);
    }));

    it("will not allow you to go to a negative menu entry", sinon.test(function () {
        this.stub(titleScreen._control, 'isHoldingUp').returns(true);
        titleScreen.update();
        expect(titleScreen._selectedEntry).toBe(0);
    }));

    it("should not allow the selected entry to be out of bounds", sinon.test(function () {
        this.stub(titleScreen._control, 'isHoldingDown').returns(true);
        titleScreen.update();
        titleScreen.update();
        titleScreen.update();

        expect(titleScreen._selectedEntry).toBe(1);
    }));

});
