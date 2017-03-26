import TitleScreen from './title_screen';
import GameInit from './game_init';
import SceneCreator from './scene_creator';
import BrowserImages from './browser_images';

import InputControl from './input_control';

SceneCreator.stats();

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };

})();

window.cancelAnimationFrame = (function(){
    return  window.cancelAnimationFrame || window.mozCancelRequestAnimationFrame;

})();


new GameInit();
window.gameContext = document.getElementById('gameCanvas').getContext('2d');
window.gameImages = new BrowserImages(function() {
    let titleScreen = new TitleScreen(new InputControl(null));
    SceneCreator.create(titleScreen);
});
