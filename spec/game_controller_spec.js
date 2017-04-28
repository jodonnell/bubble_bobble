import Wall from '../app/sprites/wall';
import BlueMagoo from '../app/sprites/blue_magoo';
import Player from '../app/sprites/player';
import GameController from '../app/game_controller';
import Control from '../app/control';

describe('GameController', function () {
    let gameController;

    beforeEach(function () {
        let bub = new Player(200, 100, 'bub', new Control());
        gameController = new GameController([bub]);
    });

    it('can have enemies land on platforms', function () {
        let blueMagoo = new BlueMagoo(0, 100);
        gameController.onscreenSprites.enemies.push(blueMagoo);

        gameController.onscreenSprites.walls.push(new Wall(0, blueMagoo.bottomSide() - 3));
        gameController.update();
        gameController.update();
        expect(blueMagoo.y).toBe(94);
    });

});
