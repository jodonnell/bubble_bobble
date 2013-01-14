"use strict";

var TitleScreen = Class.extend({
    init: function () {
        this._timer = 0;
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
    },

    draw: function () {
        this._clearBackground();
        gameContext.font = "bold 40px Comic Sans MS";
        gameContext.fillStyle = "#FEFFFF";

        var centeredX = Math.floor(gameInit.width / 2 - gameContext.measureText("Solo Game").width / 2);
        var centeredY = gameInit.height / 2 - 40;

        var color = '#FEFFFF';
        if (this._timer > 6) {
            color = 'yellow';
        }

        this._drawMenuText("Solo Game", centeredX, centeredY, color);

        centeredY = gameInit.height / 2 + 40;
        this._drawMenuText("Online Game", centeredX, centeredY, "#FEFFFF");
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
