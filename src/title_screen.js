"use strict";

class TitleScreen {
    constructor(control) {
        this._timer = 0;
        this._control = control;
        this._selectedEntry = 0;
        this._holdingDown = false;
        this._holdingUp = false;
        this._game = null;
    }

    _clearBackground() {
        gameContext.fillStyle = "#010000";
        gameContext.fillRect(0, 0, gameInit.width, gameInit.height);
    }

    nextEntry() {
        if (!this._holdingDown && this._control.isHoldingDown()) {
            this._holdingDown = true;
            if (this._selectedEntry === 0) {
                this._selectedEntry++;
            }
        }
    }

    previousEntry() {
        if (!this._holdingUp && this._control.isHoldingUp()) {
            this._holdingUp = true;
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

    endHoldingUp() {
        if (this._holdingUp && !this._control.isHoldingUp()) {
            this._holdingUp = false;
        }
    }

    endHoldingDown() {
        if (this._holdingDown && !this._control.isHoldingDown()) {
            this._holdingDown = false;
        }
    }

    updateTimer() {
        this._timer++;
        if (this._timer === 12) {
            this._timer = 0;
        }
    }

    update(cancelId) {
        this.updateTimer();

        this.nextEntry();
        this.endHoldingDown();
        this.previousEntry();
        this.endHoldingUp();
        this.selectEntry(cancelId);
    }

    draw() {
        this._clearBackground();

        this._drawMenuText("Solo Game", 0);
        this._drawMenuText("Online Game", 1);
    }

    _drawMenuText(text, entry) {
        gameContext.font = "bold 40px Comic Sans MS";

        var centeredY = gameInit.height / 2;
        if (entry === 0) {
            centeredY -= 40;
        }
        else {
            centeredY += 40;
        }
        var centeredX = Math.floor(gameInit.width / 2 - gameContext.measureText(text).width / 2);

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
