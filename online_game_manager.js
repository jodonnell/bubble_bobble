"use strict";

var OnlineGameManager = Class.extend({
    init: function (socket) {
        this._players = [];
    },

    findGame: function (socket) {
        if (this._players.length === 2) {
            return null;
        }
        this._players.push(socket);

        if (this._players.length === 2) {
            var bub = new Player(200, 100, 'bub', new NetworkedControl(this._players[0]))
            var bob = new Player(600, 100, 'bob', new NetworkedControl(this._players[1]))
            var gameController = new GameController(null, [bub, bob]);
        }
        return this._players.length;
    }
});

if (typeof exports !== 'undefined') {
    exports.OnlineGameManager = OnlineGameManager;
}
