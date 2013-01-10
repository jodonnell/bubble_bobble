"use strict";

describe("OnlineGameManager", function () {
    var onlineGameManager, socket;

    beforeEach(function () {
        onlineGameManager = new OnlineGameManager(100, 100, RIGHT);
        socket = {on: function() {}};
    });

    it("will make the first player wait for another player", function () {
        var playerNum = onlineGameManager.findGame(socket);
        expect(playerNum).toBe(1);
    });

    it("will start the game when the second player joins", function () {
        onlineGameManager.findGame(socket);
        var playerNum = onlineGameManager.findGame(socket);
        expect(playerNum).toBe(2);
    });

    it("will only allow 2 players", function () {
        onlineGameManager.findGame(socket);
        onlineGameManager.findGame(socket);
        var playerNum = onlineGameManager.findGame(socket);
        expect(playerNum).toBe(null);
    });

});
