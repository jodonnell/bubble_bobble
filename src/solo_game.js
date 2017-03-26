"use strict";

class SoloGame {
    constructor() {
        const bub = new Player(200, 100, 'bub', new InputControl(null));
        const enemies = [new BlueMagoo(1, 370, 20, LEFT), new BlueMagoo(2, 370, 70, LEFT), new BlueMagoo(3, 370, 120, LEFT)];

        const gameController = new GameController([bub], enemies);

        SceneCreator.create(gameController);
    }
}
