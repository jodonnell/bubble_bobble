"use strict";

var SoloGame = Class.extend({
    init: function() {
        var bub = new Player(200, 100, 'bub', new InputControl(null));
        var gameController = new GameController(gameInit, [bub]);

        (function animloop(){
            stats.begin();
            
            gameController.update();
            gameController.draw();
            requestAnimFrame(animloop);

            stats.end();
        })();
    }
})
