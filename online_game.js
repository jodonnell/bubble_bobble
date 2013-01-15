"use strict";

var OnlineGame = Class.extend({
    init: function() {
        var socket = io.connect('http://192.168.0.105:3000');

        socket.on('gameStarted', function(data){
            if (data.playerNum == 1) {
                var bub = new Player(200, 100, 'bub', new InputControl(socket));
                var bob = new Player(600, 100, 'bob', new NetworkedControl(socket));
            }
            else {
                var bub = new Player(200, 100, 'bub', new NetworkedControl(socket));
                var bob = new Player(600, 100, 'bob', new InputControl(socket));
            }

            var gameController = new GameController(gameInit, [bub, bob]);

            var oldPositions = {bub: {x: 200, y: 100}, bob: {x: 600, y: 100}};

            socket.on('updatedPositions', $.proxy(function (data) {
                
                oldPositions = data;

                gameController.onscreenSprites.players[0].x = data.bub.x;
                gameController.onscreenSprites.players[0].y = data.bub.y;

                gameController.onscreenSprites.players[1].x = data.bob.x;
                gameController.onscreenSprites.players[1].y = data.bob.y;

            }));

            (function animloop(){
                stats.begin();
                
                gameController.update();
                gameController.draw();
                requestAnimFrame(animloop);

                stats.end();
            })();

        });
    }
})
