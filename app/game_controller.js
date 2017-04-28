import OnscreenSprites from './onscreen_sprites';
import LevelBuilder from './level_builder';
import GameInit from './game_init';
import Camera from './camera';

class GameController {
    constructor(players, enemies) {
        this.onscreenSprites = new OnscreenSprites({players: players,
                                                    enemies: enemies,
                                                    bubbles: [],
                                                    walls: (new LevelBuilder(this.walls)).walls});
        this.camera = new Camera();

    }

    draw() {
        this._clearBackground();
        this._eachSprite((sprite) => { sprite.draw(this.camera); });
    }

    update() {
        this._eachSprite((sprite) => {
            sprite.update({onscreenSprites: this.onscreenSprites});
        });
    }

    _clearBackground() {
        window.gameContext.fillStyle = '#010000';
        window.gameContext.fillRect(0, 0, GameInit.width, GameInit.height);
    }

    _eachSprite(spriteAction) {
        for (let i = 0; i < this.onscreenSprites.sprites.length; i++) {
            const sprites = this.onscreenSprites.sprites[i];
            for (let j = 0; j < sprites.length; j++) {
                const sprite = this.onscreenSprites.sprites[i][j];
                spriteAction(sprite);
            }
        }
    }
}

export default GameController;
