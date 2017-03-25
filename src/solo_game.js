"use strict";

class SoloGame {
    constructor() {
        var bub = new Player(200, 100, 'bub', new InputControl(null));
        var enemies = [new BlueMagoo(1, 370, 20, LEFT), new BlueMagoo(2, 370, 70, LEFT), new BlueMagoo(3, 370, 120, LEFT)];

        var gameController = new GameController(gameInit, [bub], enemies);

        SceneCreator.create(gameController);
    }
}
