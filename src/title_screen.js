"use strict";

class TitleScreen {
    constructor(control) {
        this._timer = 0;
        this._control = control;
        this._selectedEntry = 0;
        this._game = null;

        this.options = ['Solo Game', 'Online Game'];
    }

    _clearBackground() {
        gameContext.fillStyle = "#010000";
        gameContext.fillRect(0, 0, gameInit.width, gameInit.height);
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
            this._game = new SoloGame();
        }
        else if ((this._control.isShooting() || this._control.isJumping()) && this._selectedEntry === 1) {
            cancelAnimationFrame(cancelId);
            this._game = new OnlineGame();
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
        gameContext.font = "bold 40px Comic Sans MS";

        var centeredY = gameInit.height / 2;

        centeredY += -40 + (entry * 50);
        var centeredX = Math.floor(gameInit.width / 2 - gameContext.measureText(text).width / 2);

        var car = function() {
            var shit = 0;

        };

        var color = '#FEFFFF';
        if (this._selectedEntry === entry && this._timer > 6) {
            color = 'yellow';
        }
        this.setFillStyle(color);

        gameContext.fillText(text, centeredX, centeredY);
    }

    setFillStyle(fillStyle) {
        gameContext.fillStyle = fillStyle;
    }
}
