"use strict";

var Text = Sprite.extend({
    init: function (x, y, text) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.timer = 0;
    },

    draw: function () {
        gameContext.font = "bold 25px Comic Sans MS";
        gameContext.fillStyle = "green";
        gameContext.fillText(this.text, this.x, this.y);
    },

    update: function(args) {
        this.y -= 1;
        this.timer++;

        if (this.timer > 40) {
            args.onscreenSprites.texts.remove(this);
        }
    }
});

if (typeof exports !== 'undefined') {
    exports.Text = Text;
}
