import OnscreenSprites from './onscreen_sprites';
import CollisionDetector from './collision_detector';
import LevelBuilder from './level_builder';
import GameInit from './game_init';

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
        this._eachSprite((sprite) => { sprite.draw(); });
    }

    update() {
        this._eachSprite((sprite) => {
            sprite.update({collisionDetector: this.collisionDetector, onscreenSprites: this.onscreenSprites});
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