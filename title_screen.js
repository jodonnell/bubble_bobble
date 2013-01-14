"use strict";

var TitleScreen = Class.extend({
    init: function (control) {
        this._timer = 0;
        this._control = control;
        this._selectedEntry = 0;
        this._holdingDown = false;
        this._holdingUp = false;
    },

    _clearBackground: function () {
        gameContext.fillStyle = "#010000";
        gameContext.fillRect(0, 0, gameInit.width, gameInit.height);
    },

    update: function() {
        this._timer++;
        if (this._timer === 12) {
            this._timer = 0;
        }

        if (!this._holdingDown && this._control.isHoldingDown()) {
            this._holdingDown = true;
            this._selectedEntry++;
        }

        if (this._holdingDown && !this._control.isHoldingDown()) {
            this._holdingDown = false;
        }

        if (!this._holdingUp && this._control.isHoldingUp()) {
            this._holdingUp = true;
            this._selectedEntry--;
        }

        if (this._holdingUp && !this._control.isHoldingUp()) {
            this._holdingUp = false;
        }

    },

    draw: function () {
        this._clearBackground();
        gameContext.font = "bold 40px Comic Sans MS";
        gameContext.fillStyle = "#FEFFFF";

        var centeredX = Math.floor(gameInit.width / 2 - gameContext.measureText("Solo Game").width / 2);
        var centeredY = gameInit.height / 2 - 40;

        var color = '#FEFFFF';
        if (this._selectedEntry === 0 && this._timer > 6) {
            color = 'yellow';
        }

        this._drawMenuText("Solo Game", centeredX, centeredY, color);

        color = '#FEFFFF';
        if (this._selectedEntry === 1 && this._timer > 6) {
            color = 'yellow';
        }

        centeredY = gameInit.height / 2 + 40;
        this._drawMenuText("Online Game", centeredX, centeredY, color);
    },

    _drawMenuText: function(text, x, y, color) {
        gameContext.font = "bold 40px Comic Sans MS";
        this.setFillStyle(color);
        gameContext.fillText(text, x, y);
    },

    setFillStyle: function(fillStyle) {
        gameContext.fillStyle = fillStyle;
    }

});
