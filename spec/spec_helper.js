import BrowserImages from '../app/browser_images';
import GameInit from '../app/game_init';

var loaded = 0;
window.gameImages = new BrowserImages(function() {
    loaded = 1;
});

beforeEach(function(done) {
    window.gameInit = new GameInit(true);
    window.gameContext = document.getElementById('gameCanvas').getContext('2d');

    if (loaded) {
        done();
    }
    else {
        setTimeout(function() {
            if (loaded) {
                done();
            }
        }, 1000);
    }
});

afterEach(function() {
    window.gameInit.destroyCanvas();
});
