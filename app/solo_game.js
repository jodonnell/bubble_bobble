import SceneCreator from './scene_creator';
import Player from './sprites/player';
import BlueMagoo from './sprites/blue_magoo';
import GameController from './game_controller';
import InputControl from './input_control';
import {LEFT} from './constants';

class SoloGame {
    constructor() {
        const bub = new Player(200, 100, 'bub', new InputControl(null));
        const enemies = [new BlueMagoo(370, 20, LEFT), new BlueMagoo(370, 70, LEFT), new BlueMagoo(370, 120, LEFT)];

        const gameController = new GameController([bub], enemies);

        SceneCreator.create(gameController);
    }
}

export default SoloGame;
