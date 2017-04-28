import Wall from '../../app/sprites/wall';
import Camera from '../../app/camera';
import GameInit from '../../app/game_init';
import ImageDrawer from '../../app/drawers/image_drawer';

describe('ImageDrawer', function () {
    let drawSpy;

    beforeEach(function () {
        drawSpy = spyOn(window.gameContext, 'drawImage');
    });

    it('makes 0 the bottom y instead of top', function () {
        const camera = new Camera();
        const wall = new Wall(0, 300);

        ImageDrawer.draw(wall, camera);
        expect(drawSpy).toHaveBeenCalledWith(jasmine.any(Object), 0, GameInit.height / 2);
    });
});
