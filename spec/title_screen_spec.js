"use strict";

describe("Title Screen", function () {
    var titleScreen;

    beforeEach(function () {
        this.addMatchers({
            toBeCalledWith: function() {
                return this.actual.calledWith.apply(this.actual, arguments);
            }
        });

        titleScreen = new TitleScreen();
    });

    it("should have a black background", sinon.test(function () {
        var fillRectSpy = this.spy(gameContext, 'fillRect');
        titleScreen.draw();
        expect(fillRectSpy).toBeCalledWith(0, 0, gameInit.width, gameInit.height);
    }));

    it("should display Solo Game", sinon.test(function () {
        var fillTextSpy = this.spy(gameContext, 'fillText');
        titleScreen.draw();
        expect(fillTextSpy).toBeCalledWith("Solo Game", 300, 260);
    }));

    it("should display Online Game", sinon.test(function () {
        var fillTextSpy = this.spy(gameContext, 'fillText');
        titleScreen.draw();
        expect(fillTextSpy).toBeCalledWith("Online Game", 300, 340);
    }));

    it("should blink", sinon.test(function () {
        var fillStyleSpy = this.spy(titleScreen, 'setFillStyle');
        for (var i = 0; i < 15; i++) {
            titleScreen.update();
            titleScreen.draw();
        }
        expect(fillStyleSpy).toBeCalledWith('yellow');
    }));

});
