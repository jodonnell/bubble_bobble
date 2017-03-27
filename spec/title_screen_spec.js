import TitleScreen from '../app/title_screen';
import InputControl from '../app/input_control';
import GameInit from '../app/game_init';

describe('Title Screen', function () {
    var titleScreen;

    beforeEach(function () {
        titleScreen = new TitleScreen(new InputControl());
    });

    it('should have a black background', function () {
        var fillRectSpy = spyOn(window.gameContext, 'fillRect');
        titleScreen.draw();
        expect(fillRectSpy).toHaveBeenCalledWith(0, 0, GameInit.width, GameInit.height);
    });

    it('should display Solo Game', function () {
        var fillTextSpy = spyOn(window.gameContext, 'fillText');
        titleScreen.draw();
        expect(fillTextSpy).toHaveBeenCalledWith('Solo Game', 299, 260);
    });

    it('should display Settings', function () {
        var fillTextSpy = spyOn(window.gameContext, 'fillText');
        titleScreen.draw();
        expect(fillTextSpy).toHaveBeenCalledWith('Settings', 319, 310);
    });

    it('should blink', function () {
        var fillStyleSpy = spyOn(titleScreen, 'setFillStyle');
        for (var i = 0; i < 15; i++) {
            titleScreen.update();
            titleScreen.draw();
        }
        expect(fillStyleSpy).toHaveBeenCalledWith('yellow');
    });

    it('should blink on the second option when down is hit', function () {
        //var fillStyleSpy = spyOn(titleScreen, '_drawMenuText');
        sinon.stub(titleScreen._control, 'isHoldingDown').returns(true);
        titleScreen.update();
        expect(titleScreen._selectedEntry).toBe(1);
    });

    it('will not allow you to go to a negative menu entry', function () {
        sinon.stub(titleScreen._control, 'isHoldingUp').returns(true);
        titleScreen.update();
        expect(titleScreen._selectedEntry).toBe(0);
    });

    it('should not allow the selected entry to be out of bounds', function () {
        sinon.stub(titleScreen._control, 'isHoldingDown').returns(true);
        titleScreen.update();
        titleScreen.update();
        titleScreen.update();

        expect(titleScreen._selectedEntry).toBe(1);
    });

});
