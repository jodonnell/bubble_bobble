"use strict";

var SoloGame = Class.extend({
    init: function() {
        var bub = new Player(200, 100, 'bub', new InputControl(null));
        var enemies = [new BlueMagoo(1, 370, 20, LEFT), new BlueMagoo(2, 370, 70, LEFT), new BlueMagoo(3, 370, 120, LEFT)];

        var gameController = new GameController(gameInit, [bub], enemies);

        (function animloop(){
            stats.begin();
            
            gameController.update();
            gameController.draw();
            requestAnimFrame(animloop);

            stats.end();
        })();
    }
})
