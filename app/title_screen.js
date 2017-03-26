import GameInit from './game_init';
import SoloGame from './solo_game';
import OnlineGame from './online_game';

class TitleScreen {
    constructor(control) {
        this._timer = 0;
        this._control = control;
        this._selectedEntry = 0;

        this.options = ['Solo Game', 'Online Game'];
    }

    _clearBackground() {
        window.gameContext.fillStyle = '#010000';
        window.gameContext.fillRect(0, 0, GameInit.width, GameInit.height);
    }

    update(cancelId) {
        this.updateTimer();

        this.nextEntry();
        this.previousEntry();
        this.selectEntry(cancelId);
    }

    nextEntry() {
        if (this._control.isHoldingDown()) {
            if (this._selectedEntry < this.options.length - 1) {
                this._selectedEntry++;
            }
        }
    }

    previousEntry() {
        if (this._control.isHoldingUp()) {
            if (this._selectedEntry > 0) {
                this._selectedEntry--;
            }
        }
    }

    selectEntry(cancelId) {
        if ((this._control.isShooting() || this._control.isJumping()) && this._selectedEntry === 0) {
            cancelAnimationFrame(cancelId);
            new SoloGame();
        }
        else if ((this._control.isShooting() || this._control.isJumping()) && this._selectedEntry === 1) {
            cancelAnimationFrame(cancelId);
            new OnlineGame();
        }
    }

    updateTimer() {
        this._timer++;
        if (this._timer === 12) {
            this._timer = 0;
        }
    }

    draw() {
        this._clearBackground();

        for (var i = 0; i < this.options.length; i++) {
            this._drawMenuText(this.options[i], i);
        }
    }

    _drawMenuText(text, entry) {
        window.gameContext.font = 'bold 40px Comic Sans MS';

        var centeredY = GameInit.height / 2;

        centeredY += -40 + (entry * 50);
        var centeredX = Math.floor(GameInit.width / 2 - window.gameContext.measureText(text).width / 2);

        var color = '#FEFFFF';
        if (this._selectedEntry === entry && this._timer > 6) {
            color = 'yellow';
        }
        this.setFillStyle(color);

        window.gameContext.fillText(text, centeredX, centeredY);
    }

    setFillStyle(fillStyle) {
        window.gameContext.fillStyle = fillStyle;
    }
}

export default TitleScreen;
