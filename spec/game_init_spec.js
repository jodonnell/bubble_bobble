import GameInit from '../app/game_init';

describe('GameInit', function () {
    it('should have a canvas element', function () {
        expect(document.querySelectorAll('#gameCanvas').length).toEqual(1);
    });
});
