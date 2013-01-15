"use strict";

var OnlineGameManager = Class.extend({
    init: function () {
        this._players = [];
        this._pdt = 0.0001;
        this._pdte = new Date().getTime();
        this._physicsLoopInterval = null;
        this._updateLoopInterval = null;
    },

    findGame: function (socket) {
        if (this._players.length === 2) {
            return null;
        }
        this._players.push(socket);

        socket.on('disconnect', $.proxy(function () {
            console.log('\t socket.io:: socket disconnected ' + socket.userid );

            var index = this._players.indexOf(socket);
            this._players.splice(index, 1);
            
            clearInterval(this._updateLoopInterval);
            clearInterval(this._physicsLoopInterval);
            this.gameController = null;
        }, this));


        if (this._players.length === 2) {
            this._players[0].emit('gameStarted', { playerNum: 1 } );
            this._players[1].emit('gameStarted', { playerNum: 2 } );

            var bub = new Player(200, 100, 'bub', new NetworkedControl(this._players[0]));
            var bob = new Player(600, 100, 'bob', new NetworkedControl(this._players[1]));
            this.gameController = new GameController(null, [bub, bob]);

            this._updateLoopInterval = setInterval($.proxy(function(){
                this._pdt = (new Date().getTime() - this._pdte) / 1000.0;
                this._pdte = new Date().getTime();
                this.gameController.update();
            }, this), 15);

            this._physicsLoopInterval = setInterval($.proxy(function(){
                var bub = this.gameController.onscreenSprites.players[0];
                var bob = this.gameController.onscreenSprites.players[1];
                var enemies = this.gameController.onscreenSprites.enemies;

                var enemyPositions = [];
                for (var i = 0; i < enemies.length; i++) {
                    enemyPositions.push({id: enemies[i].id, x: enemies[i].x, y: enemies[i].y});
                }

                var positions = {bub: {x: bub.x, y: bub.y}, bob: {x: bob.x, y: bob.y}, enemies: enemyPositions};

                this._players[0].emit('updatedPositions', positions);
                this._players[1].emit('updatedPositions', positions);

            }, this), 45);

        }
        return this._players.length;
    }
});

if (typeof exports !== 'undefined') {
    exports.OnlineGameManager = OnlineGameManager;
}
