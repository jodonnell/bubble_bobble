import SceneCreator from './scene_creator';
import Player from './sprites/player';
import BlueMagoo from './sprites/blue_magoo';
import GameController from './game_controller';
import InputControl from './input_control';
import {LEFT} from './constants';

class SoloGame {
    constructor() {
        const bub = new Player(200, 500, 'bub', new InputControl(null));
        const enemies = [new BlueMagoo(370, 580, LEFT), new BlueMagoo(370, 510, LEFT), new BlueMagoo(370, 490, LEFT),
            new BlueMagoo(100, 510, LEFT), new BlueMagoo(570, 510, LEFT), new BlueMagoo(570, 490, LEFT),
        ];

        const gameController = new GameController([bub], enemies);

        SceneCreator.create(gameController);
    }
}

export default SoloGame;
