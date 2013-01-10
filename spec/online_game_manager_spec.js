"use strict";

describe("OnlineGameManager", function () {
    var onlineGameManager;

    beforeEach(function () {
        onlineGameManager = new OnlineGameManager(100, 100, RIGHT);
    });

    it("will make the first player wait for another player", function () {
        var playerNum = onlineGameManager.findGame({});
        expect(playerNum).toBe(1);
    });

    it("will start the game when the second player joins", function () {
        onlineGameManager.findGame({});
        var playerNum = onlineGameManager.findGame({});
        expect(playerNum).toBe(2);

        
    });

    it("will only allow 2 players", function () {
        onlineGameManager.findGame({});
        onlineGameManager.findGame({});
        var playerNum = onlineGameManager.findGame({});
        expect(playerNum).toBe(null);
    });

});
