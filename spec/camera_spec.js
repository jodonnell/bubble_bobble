import GameInit from '../app/game_init';
import Camera from '../app/camera';

describe('Camera', function () {
    let camera;

    beforeEach(function () {
        camera = new Camera();
    });

    it('leaves the x alone', function () {
        expect(camera.relativeX(1)).toBe(1);
    });

    it('flips the Y', function () {
        expect(camera.relativeY(299)).toBe(301);
    });

    it('adjusts the camera when you move up', function () {
        camera.moveTo(500);
        expect(camera.relativeY(500)).toBe(GameInit.height / 2);
    });

    it('wont let the camera go below 0', function () {
        camera.moveTo(0);
        expect(camera.relativeY(0)).toBe(600);
    });

});
