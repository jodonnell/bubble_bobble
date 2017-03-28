import PlayerAnimations from '../app/player_animations';
import {LEFT, RIGHT} from '../app/constants';
import _ from 'lodash';

describe('PlayerAnimations', function () {
    let playerAnimations;


    beforeEach(function () {
        playerAnimations = new PlayerAnimations('bub');
    });

    it('should change to tail wag frame after 20 frames have passed', function () {
        expect(playerAnimations.getImageName()).toBe('bubRight');

        nextTickNewAnimation();
        playerAnimations.changeAnimation();
        playerAnimations.changeAnimation();

        expect(playerAnimations.getImageName()).toBe('bubTailRight');
    });

    it('should change remove tail wag frame after 20 more frames have passed', function () {
        nextTickNewAnimation();
        playerAnimations.changeAnimation();

        nextTickNewAnimation();
        playerAnimations.changeAnimation();

        expect(playerAnimations.getImageName()).toBe('bubRight');
    });

    it('can transition to the jumping animation', function () {
        playerAnimations.jump();
        playerAnimations.changeAnimation();
        expect(playerAnimations.getImageName()).toBe('bubJumpRight');

        nextTickNewAnimation();
        expect(playerAnimations.getImageName()).toBe('bubJumpTailRight');
    });

    it('can transition to the falling animation', function () {
        playerAnimations.fall();
        playerAnimations.changeAnimation();
        expect(playerAnimations.getImageName()).toBe('bubFallRight');

        nextTickNewAnimation();
        expect(playerAnimations.getImageName()).toBe('bubFallTailRight');
    });

    it('can transition to the shooting animation', function () {
        playerAnimations.shoot();
        playerAnimations.changeAnimation();
        expect(playerAnimations.getImageName()).toBe('bubShootRight');
    });

    it('can transition to the dieing animation', function () {
        playerAnimations.die();
        playerAnimations.changeAnimation();
        expect(playerAnimations.getImageName()).toBe('bubDie');
    });

    it('knows if a player is going left or right', function () {
        playerAnimations.moveLeft();
        playerAnimations.changeAnimation();
        expect(playerAnimations.direction).toBe(LEFT);

        playerAnimations.moveRight();
        playerAnimations.changeAnimation();
        expect(playerAnimations.direction).toBe(RIGHT);
    });

    it('overides all animations with the shooting animation', function () {
        playerAnimations.shoot();
        playerAnimations.changeAnimation();
        expect(playerAnimations.getImageName()).toBe('bubShootRight');

        playerAnimations.moveRight();
        playerAnimations.changeAnimation();
        expect(playerAnimations.getImageName()).toBe('bubShootRight');
    });

    it('ends the shooting animation after 15 frame', function () {
        playerAnimations.shoot();
        _.times(16, () => playerAnimations.changeAnimation());
        expect(playerAnimations.getImageName()).toBe('bubRight');
    });

    it('should go to the secondary frame when shooting finishes', function () {
        playerAnimations.shoot();
        for (let i = 0; i < 35; i++) {
            if (i === 30) {
                playerAnimations.moveRight();
            }
            playerAnimations.changeAnimation();
        }
        expect(playerAnimations.getImageName()).toBe('bubWalkRight');
    });

    function nextTickNewAnimation() {
        _.times(20, () => {playerAnimations.changeAnimation(); });
    }

});
