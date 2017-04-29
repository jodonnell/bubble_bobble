import Wall from '../app/sprites/wall';
import BlueMagoo from '../app/sprites/blue_magoo';
import Player from '../app/sprites/player';
import GameController from '../app/game_controller';
import Control from '../app/control';
import GameInit from '../app/game_init';

describe('GameController', function () {
    let gameController;

    beforeEach(function () {
        let bub = new Player(200, 100, 'bub', new Control());
        gameController = new GameController([bub]);
    });

    it('can have enemies land on platforms', function () {
        let blueMagoo = new BlueMagoo(0, 100);
        gameController.onscreenSprites.enemies.push(blueMagoo);

        gameController.onscreenSprites.walls.push(new Wall(0, blueMagoo.bottomSide() + 2));
        gameController.update();
        gameController.update();
        expect(blueMagoo.y).toBe(94);
    });

    it('displays the score', function () {
        let fillTextSpy = spyOn(window.gameContext, 'fillText');
        gameController.draw();
        expect(fillTextSpy).toHaveBeenCalledWith('0', GameInit.width - 100, 40);
    });
});
