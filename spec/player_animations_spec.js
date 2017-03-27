import PlayerAnimations from '../app/player_animations';
import {LEFT, RIGHT} from '../app/constants';

describe('PlayerAnimations', function () {
    var playerAnimations;


    beforeEach(function () {
        playerAnimations = new PlayerAnimations('bub');
    });

    it('should change to tail wag frame after 20 frames have passed', function () {
        expect(playerAnimations.getImageName()).toBe('bubRight');

        nextTickNewAnimation();
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
        expect(playerAnimations.getImageName()).toBe('bubJumpRight');

        nextTickNewAnimation();
        playerAnimations.changeAnimation();

        expect(playerAnimations.getImageName()).toBe('bubJumpTailRight');
    });

    it('can transition to the falling animation', function () {
        playerAnimations.fall();
        expect(playerAnimations.getImageName()).toBe('bubFallRight');

        nextTickNewAnimation();
        playerAnimations.changeAnimation();

        expect(playerAnimations.getImageName()).toBe('bubFallTailRight');
    });

    it('can transition to the shooting animation', function () {
        playerAnimations.shoot();
        expect(playerAnimations.getImageName()).toBe('bubShootRight');
    });

    it('can transition to the dieing animation', function () {
        playerAnimations.die();
        expect(playerAnimations.getImageName()).toBe('bubDie');
    });

    it('knows if a player is going left or right', function () {
        playerAnimations.moveLeft();
        expect(playerAnimations.direction).toBe(LEFT);

        playerAnimations.moveRight();
        expect(playerAnimations.direction).toBe(RIGHT);
    });

    it('overides all animations with the shooting animation', function () {
        playerAnimations.shoot();
        expect(playerAnimations.getImageName()).toBe('bubShootRight');

        playerAnimations.moveRight();
        expect(playerAnimations.getImageName()).toBe('bubShootRight');
    });

    it('ends the shooting animation after 15 frame', function () {
        playerAnimations.shoot();
        for (var i = 0; i < 15; i++) {
            playerAnimations.changeAnimation();
        }

        expect(playerAnimations.getImageName()).toBe('bubRight');
    });

    it('should go to the secondary frame when shooting finishes', function () {
        playerAnimations.shoot();
        for (var i = 0; i < 35; i++) {
            if (i === 30) {
                playerAnimations.moveRight();
            }
            playerAnimations.changeAnimation();
        }
        expect(playerAnimations.getImageName()).toBe('bubWalkRight');
    });

    function nextTickNewAnimation() {
        playerAnimations.timer = playerAnimations.ANIMATION_LENGTH - 1;
    }

});
