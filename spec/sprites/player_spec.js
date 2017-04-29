import Player from '../../app/sprites/player';
import Wall from '../../app/sprites/wall';
import BlueMagoo from '../../app/sprites/blue_magoo';
import Pepper from '../../app/sprites/pepper';
import Bubble from '../../app/sprites/bubble';
import Control from '../../app/control';
import OnscreenSprites from '../../app/onscreen_sprites';
import {RIGHT, LEFT} from '../../app/constants';

describe('Player', function () {
    let player, args;

    beforeEach(function () {
        player = new Player(100, 100, 'bub', new Control());
        let onscreenSprites = new OnscreenSprites({players: [player]});
        args = {onscreenSprites: onscreenSprites};
    });

    it('should have a location', function () {
        expect(player.x).toBe(100);
        expect(player.y).toBe(100);
    });

    it('can move right', function () {
        spyOn(player._control, 'isHoldingRight').and.returnValue(true);
        player.update(args);
        expect(player.x).toBeGreaterThan(100);
    });

    it('can move left', function () {
        spyOn(player._control, 'isHoldingLeft').and.returnValue(true);
        player.update(args);
        expect(player.x).toBeLessThan(100);
    });

    it('should fall when nothing is under it', function () {
        player.update(args);
        expect(player.y).toBeLessThan(100);
    });

    it('should land on a floor after a jump', function () {
        args.onscreenSprites.walls = [new Wall(95, player.bottomSide())];

        spyOn(player._control, 'isJumping').and.returnValues(true, false);

        for (let i = 0; i < 100; i++) {
            player.update(args);
        }
        expect(player.y).toBe(100);
    });

    it('can jump', function () {
        spyOn(player._control, 'isJumping').and.returnValue(true);

        player.update(args);
        expect(player.y).toBe(104);

        player.update(args);
        expect(player.y).toBe(108);

        for (let i = 0; i < 50; i++) {
            player.update(args);
        }

        expect(player.y).toBe(189);
    });

    it('cannot jump twice', function () {
        spyOn(player._control, 'isJumping').and.returnValue(true);

        for (let i = 0; i < 44; i++) {
            player.update(args);
        }

        let oldY = player.y;
        player.update(args);
        expect(player.y).toBeLessThan(oldY);
    });

    it('changes to shooting animation', function () {
        spyOn(player._control, 'isShooting').and.returnValue(true);
        let spy = spyOn(player._playerAnimations, 'shoot');
        player.update(args);
        expect(spy).toHaveBeenCalled();
    });

    it('should be able to shoot bubbles', function () {
        spyOn(player._control, 'isShooting').and.returnValue(true);

        player.update(args);
        expect(args.onscreenSprites.bubbles.length).toBe(1);
    });

    it('should be able to shoot one bubble every once in a while', function () {
        spyOn(player._control, 'isShooting').and.returnValue(true);

        player.update(args);
        player.update(args);
        expect(args.onscreenSprites.bubbles.length).toBe(1);

        for (let i = 0; i < 34; i++) {
            player.update(args);
        }

        expect(args.onscreenSprites.bubbles.length).toBe(2);
    });

    it('dies if it contacts an enemy', function () {
        args.onscreenSprites.enemies = [new BlueMagoo(100, 100, RIGHT)];
        player.update(args);
        expect(player.isDead()).toBeTruthy();
    });

    it('can pop a bubble', function () {
        args.onscreenSprites.bubbles.push(new Bubble(100, player.y - 10, RIGHT));
        args.onscreenSprites.bubbles[0].fullyFormed = true;

        const spy = spyOn(args.onscreenSprites.bubbles[0], 'pop');

        player.update(args);
        expect(spy).toHaveBeenCalledWith(args.onscreenSprites, RIGHT);
    });

    it('can pop a bubble and send it to the left', function () {
        args.onscreenSprites.bubbles.push(new Bubble(player.x, player.y - 10, RIGHT));
        args.onscreenSprites.bubbles[0].x -= args.onscreenSprites.bubbles[0].width() / 2;
        args.onscreenSprites.bubbles[0].fullyFormed = true;

        const spy = spyOn(args.onscreenSprites.bubbles[0], 'pop');

        player.update(args);
        expect(spy).toHaveBeenCalledWith(args.onscreenSprites, LEFT);
    });

    it('can pop a bubble by falling on it', function () {
        args.onscreenSprites.bubbles.push(new Bubble(100, player.bottomSide() + 1, RIGHT));
        args.onscreenSprites.bubbles[0].fullyFormed = true;

        let spy = spyOn(args.onscreenSprites.bubbles[0], 'pop');

        player.update(args);
        expect(spy).toHaveBeenCalledWith(args.onscreenSprites, RIGHT);
    });

    it('does not pop a bubble if colliding with it from the right side', function () {
        let bubble = new Bubble(player.rightSide() + 1, player.y, RIGHT);
        args.onscreenSprites.bubbles.push(bubble);
        bubble.fullyFormed = true;

        spyOn(player._control, 'isHoldingRight').and.returnValue(true);
        let spy = spyOn(bubble, 'pop');

        player.update(args);
        expect(spy).not.toHaveBeenCalledWith(args.onscreenSprites, RIGHT);
        expect(bubble.x).toBe(player.rightSide() + 1);
    });

    it('does not pop a bubble if colliding with it from the left side', function () {
        let bubble = new Bubble(player.x, player.y, LEFT);
        args.onscreenSprites.bubbles.push(bubble);
        bubble.x -= bubble.width() - 1;
        bubble.fullyFormed = true;

        let oldX = bubble.x;

        spyOn(player._control, 'isHoldingLeft').and.returnValue(true);
        let spy = spyOn(bubble, 'pop');

        player.update(args);
        expect(spy).not.toHaveBeenCalledWith(args.onscreenSprites, LEFT);
        expect(bubble.x).toBe(oldX - 4);

    });

    it('starts the death animation', function () {
        let spy = spyOn(player._playerAnimations, 'die');
        args.onscreenSprites.enemies = [new BlueMagoo(100, 100, RIGHT)];
        player.update(args);
        expect(player.isDead()).toBeTruthy();
        expect(spy).toHaveBeenCalled();
    });

    it('comes back from the dead after some time', function () {
        player.x = 200;
        let magoo = new BlueMagoo(200, 100, RIGHT);
        args.onscreenSprites.enemies.push(magoo);
        player.update(args);
        args.onscreenSprites.enemies.remove(magoo);

        for (let i=0; i < 80; i++) {
            player.update(args);
        }
        expect(player.isDead()).toBeFalsy();
        expect(player.x).toBe(100);
        expect(player.isInvincible()).toBeTruthy();
    });

    it('when invincible cannot be hit by enemies', function () {
        player._invincible = true;
        args.onscreenSprites.enemies.push(new BlueMagoo(100, 100, RIGHT));

        player.update(args);
        expect(player.isDead()).toBeFalsy();
    });

    it('invinciblity wears off', function () {
        player.invincible = true;
        for (let i=0; i < 200; i++) {
            player.update(args);
        }
        expect(player.isInvincible()).toBeFalsy();
    });

    it('should blink if invincible', function () {
        player.invincible = true;
        for (let i=0; i < 200; i++) {
            player.update(args);
        }
        expect(player.isInvincible()).toBeFalsy();
    });

    it('should be able to collect collectibles', function () {
        args.onscreenSprites.collectibles.push(new Pepper(100, 100));
        player.update(args);
        expect(args.onscreenSprites.collectibles.length).toBe(0);
        expect(player.getScore()).toBe(30);
    });

});
