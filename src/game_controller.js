"use strict";

class GameController {
    constructor(gameInit, players, enemies) {
        this.gameInit = gameInit;

        this.onscreenSprites = new OnscreenSprites({players: players,
                                                   enemies: enemies,
                                                   bubbles: [],
                                                   walls: (new LevelBuilder(this.walls)).walls});

        this.collisionDetector = new CollisionDetector();
    }

    draw() {
        this._clearBackground();

        var drawMethod = $.proxy(function (i, j) {
            this.onscreenSprites.sprites[i][j].draw();
        }, this);
        this._eachSprite(drawMethod);
    }

    _clearBackground() {
        gameContext.fillStyle = "#010000";
        gameContext.fillRect(0, 0, this.gameInit.width, this.gameInit.height);
    }

    update() {
        var updateMethod = $.proxy(function (i, j) {
            this.onscreenSprites.sprites[i][j].update({collisionDetector: this.collisionDetector, onscreenSprites: this.onscreenSprites});
        }, this);
        this._eachSprite(updateMethod);
    }

    _eachSprite(spriteAction) {
        var i, j, sprites;

        for (i = 0; i < this.onscreenSprites.sprites.length; i++) {
            sprites = this.onscreenSprites.sprites[i];
            for (j = 0; j < sprites.length; j++) {
                spriteAction(i, j);
            }
        }
    }
}

if (typeof exports !== 'undefined') {
    exports.GameController = GameController;
}
