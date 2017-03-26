"use strict";

class GameController {
    constructor(players, enemies) {
        this.onscreenSprites = new OnscreenSprites({players: players,
                                                   enemies: enemies,
                                                   bubbles: [],
                                                   walls: (new LevelBuilder(this.walls)).walls});

        this.collisionDetector = new CollisionDetector();
    }

    draw() {
        this._clearBackground();

        var drawMethod = (i, j) => {
            this.onscreenSprites.sprites[i][j].draw();
        };
        this._eachSprite(drawMethod);
    }

    _clearBackground() {
        gameContext.fillStyle = "#010000";
        gameContext.fillRect(0, 0, GameInit.width, GameInit.height);
    }

    update() {
        var updateMethod = (i, j) => {
            this.onscreenSprites.sprites[i][j].update({collisionDetector: this.collisionDetector, onscreenSprites: this.onscreenSprites});
        };
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
