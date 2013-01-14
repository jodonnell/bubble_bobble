"use strict";

var TitleScreen = Class.extend({
    init: function (control) {
        this._timer = 0;
        this._control = control;
        this._selectedEntry = 0;
        this._holdingDown = false;
        this._holdingUp = false;
    },

    _clearBackground: function () {
        gameContext.fillStyle = "#010000";
        gameContext.fillRect(0, 0, gameInit.width, gameInit.height);
    },

    update: function(cancelId) {
        this._timer++;
        if (this._timer === 12) {
            this._timer = 0;
        }

        if (!this._holdingDown && this._control.isHoldingDown()) {
            this._holdingDown = true;
            if (this._selectedEntry === 0) {
                this._selectedEntry++;
            }
        }

        if (this._holdingDown && !this._control.isHoldingDown()) {
            this._holdingDown = false;
        }

        if (!this._holdingUp && this._control.isHoldingUp()) {
            this._holdingUp = true;
            if (this._selectedEntry > 0) {
                this._selectedEntry--;
            }
        }

        if (this._holdingUp && !this._control.isHoldingUp()) {
            this._holdingUp = false;
        }

        if ((this._control.isShooting() || this._control.isJumping()) && this._selectedEntry === 0) {
            var bub = new Player(200, 100, 'bub', new InputControl(null));
            var gameController = new GameController(gameInit, [bub]);
            cancelAnimationFrame(cancelId);

            (function animloop(){
              stats.begin();
      
              gameController.update();
              gameController.draw();
              requestAnimFrame(animloop);

              stats.end();
          })();
        }
        else if ((this._control.isShooting() || this._control.isJumping()) && this._selectedEntry === 1) {
            cancelAnimationFrame(cancelId);
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

    },

    draw: function () {
        this._clearBackground();

        this._drawMenuText("Solo Game", 0);
        this._drawMenuText("Online Game", 1);
    },

    _drawMenuText: function(text, entry) {
        gameContext.font = "bold 40px Comic Sans MS";

        var centeredY = gameInit.height / 2;
        if (entry === 0) {
            centeredY -= 40;
        }
        else {
            centeredY += 40;
        }
        var centeredX = Math.floor(gameInit.width / 2 - gameContext.measureText(text).width / 2);

        var color = '#FEFFFF';
        if (this._selectedEntry === entry && this._timer > 6) {
            color = 'yellow';
        }
        this.setFillStyle(color);

        gameContext.fillText(text, centeredX, centeredY);
    },

    setFillStyle: function(fillStyle) {
        gameContext.fillStyle = fillStyle;
    }

});
