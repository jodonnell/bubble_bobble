"use strict";

var OnlineGameManager = Class.extend({
    init: function () {
        this._players = [];
        this._pdt = 0.0001;
        this._pdte = new Date().getTime();
    },

    findGame: function (socket) {
        if (this._players.length === 2) {
            return null;
        }
        this._players.push(socket);

        if (this._players.length === 2) {
            var bub = new Player(200, 100, 'bub', new NetworkedControl(this._players[0]))
            var bob = new Player(600, 100, 'bob', new NetworkedControl(this._players[1]))
            this.gameController = new GameController(null, [bub, bob]);

            setInterval($.proxy(function(){
                this._pdt = (new Date().getTime() - this._pdte)/1000.0;
                this._pdte = new Date().getTime();
                this.gameController.update();
            }, this), 15);

        }
        return this._players.length;
    }
});

if (typeof exports !== 'undefined') {
    exports.OnlineGameManager = OnlineGameManager;
}
