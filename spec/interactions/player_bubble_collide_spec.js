import PlayerBubbleCollide from '../../app/interactions/player_bubble_collide';
import Player from '../../app/sprites/player';
import Control from '../../app/control';
import OnscreenSprites from '../../app/onscreen_sprites';
import Bubble from '../../app/sprites/bubble';
import {RIGHT} from '../../app/constants';

describe('PlayerBubbleCollide', function () {
    let collide, player;

    beforeEach(function () {
        player = new Player(100, 100, 'bub', new Control());
        let bubble = new Bubble(100, 100, RIGHT);
        bubble.fullyFormed = true;
        let onscreenSprites = new OnscreenSprites({players: [player], bubbles: [bubble]});
        collide = new PlayerBubbleCollide(player, onscreenSprites);
    });

    it('bounces off a bubble', function () {
        spyOn(player, 'isHoldingJump').and.returnValue(true);
        const spyJump = spyOn(player, 'jump');
        collide.collide();
        expect(spyJump).toHaveBeenCalled();
    });
});
