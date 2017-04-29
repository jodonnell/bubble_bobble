import Bubble from '../../app/sprites/bubble';
import BlueMagoo from '../../app/sprites/blue_magoo';
import OnscreenSprites from '../../app/onscreen_sprites';
import {RIGHT, LEFT, RIGHT_BOUND} from '../../app/constants';
import _ from 'lodash';

describe('Bubble', function () {
    let args, bubble;

    beforeEach(function () {
        bubble = new Bubble(100, 100, RIGHT);
        let onscreenSprites = new OnscreenSprites({bubbles: [bubble]});
        args = {onscreenSprites: onscreenSprites};
    });

    it('should go the right way', function () {
        bubble.update(args);
        expect(bubble.x).toBeGreaterThan(100);

        bubble = new Bubble(100, 100, LEFT);
        bubble.update(args);
        expect(bubble.x).toBeLessThan(100);
    });

    it('will go up after it is fully formed', function () {
        while (!bubble.isFullyFormed()) {
            bubble.update(args);
        }

        bubble.update(args);
        expect(bubble.y).toBeGreaterThan(100);
    });

    it('should move to the top middle of the screen', function () {
        bubble.fullyFormed = true;

        _.times(500, () => { bubble.update(args); });

        expect(bubble.x).toBe(400);
        expect(bubble.y).toBe(500);
    });

    it('should get trapped when hit by a bubble', function () {
        args.onscreenSprites.enemies.push(new BlueMagoo(100, 100, RIGHT));
        bubble.update(args);
        bubble.update(args);
        expect(bubble.hasEnemy()).toBeTruthy();
        expect(bubble.getCurrentImage()).toBe('blueMagooTrappedRight');
        expect(bubble.isFullyFormed()).toBeTruthy();
        expect(args.onscreenSprites.enemies.length).toBe(0);
    });

    it('should only trap enemies if the bubble is empty', function () {
        args.onscreenSprites.enemies.push(new BlueMagoo(100, 100, RIGHT), new BlueMagoo(100, 100, RIGHT));
        bubble.update(args);
        bubble.update(args);
        expect(args.onscreenSprites.enemies.length).toBe(1);
    });

    it('should move to the trapped enemies position', function () {
        args.onscreenSprites.enemies.push(new BlueMagoo(105, 105, RIGHT));
        bubble.update(args);
        expect(bubble.x).toBe(105);
        expect(bubble.y).toBe(105);
    });

    it('should animate a trapped enemy', function () {
        args.onscreenSprites.enemies.push(new BlueMagoo(1, 110, 110, RIGHT));
        bubble.trap(args.onscreenSprites, args.onscreenSprites.enemies[0]);

        bubble.update(args);
        expect(bubble.getCurrentImage()).toBe('blueMagooTrappedRight');
        for (let i = 0; i < 15; i++) {
            bubble.update(args);
        }

        expect(bubble.getCurrentImage()).toBe('blueMagooTrappedLeft');
    });

    it('should be able to pop', function () {
        bubble.pop(args.onscreenSprites);
        expect(args.onscreenSprites.bubbles.length).toBe(0);
    });

    it('should turn a trapped popped bubble into dead enemy', function () {
        args.onscreenSprites.enemies.push(new BlueMagoo(100, 100, RIGHT));
        bubble.trap(args.onscreenSprites, args.onscreenSprites.enemies[0]);
        bubble.pop(args.onscreenSprites);
        expect(args.onscreenSprites.deadEnemies.length).toBe(1);
        expect(args.onscreenSprites.deadEnemies[0].x).toBe(100);
        expect(args.onscreenSprites.deadEnemies[0].y).toBe(100);
    });

    it('should be blocked by walls', function () {
        bubble.x = RIGHT_BOUND - bubble.width();
        bubble.update(args);
        expect(bubble.x).toBe(RIGHT_BOUND - bubble.width());
    });

    it('bubbles should repel each other', function () {
        bubble.fullyFormed = true;
        bubble.x = 400;
        bubble.y = 550;

        let secondBubble = new Bubble(bubble.x - 1, bubble.y);
        secondBubble.fullyFormed = true;
        args.onscreenSprites.bubbles.push(secondBubble);
        bubble.update(args);
        expect(bubble.x).toBeGreaterThan(400);
        expect(bubble.y).not.toBe(550);
    });

    it('pops after a while', function () {
        bubble.fullyFormed = true;

        _.times(1000, () => bubble.update(args));
        expect(args.onscreenSprites.bubbles.length).toBe(0);
    });
});
