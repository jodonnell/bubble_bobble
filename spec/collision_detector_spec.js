import Player from '../app/sprites/player';
import Wall from '../app/sprites/wall';
import Bubble from '../app/sprites/bubble';
import CollisionDetector from '../app/collision_detector';
import {RIGHT} from '../app/constants';

describe('CollisionDetector', function () {
    let player;

    beforeEach(function () {
        player = new Player(100, 100, 'bub');
    });

    it('should be able to stand on an object', function () {
        let walls = [new Wall(100, player.y + player.height())];
        expect(CollisionDetector.isStandingOnObjects(player, walls)).toBeTruthy();
    });

    it('should fall at the right boundary', function () {
        let walls = [new Wall(100 + player.width() + 1, player.y + player.height())];
        expect(CollisionDetector.isStandingOnObjects(player, walls)).toBeFalsy();
    });

    it('should fall at the left boundary', function () {
        let walls = [new Wall(0, player.y + player.height())];
        walls[0].x = 100 - walls[0].width() - 1;
        expect(CollisionDetector.isStandingOnObjects(player, walls)).toBeFalsy();
    });

    it('cannot run through left wall', function () {
        player.x = 45;
        expect(CollisionDetector.noWallToLeft(player)).toBeFalsy();
        expect(player.x).toBe(46);
    });

    it('cannot run through right wall', function () {
        player.x = 753;
        expect(CollisionDetector.noWallToRight(player)).toBeFalsy();
        expect(player.x).toBe(754 - player.width());
    });

    it('should land on a platform and move the player to make sure there are no missing pixels', function () {
        let walls = [new Wall(100, player.y + player.height() - 2)];
        expect(player.y).toBe(100);
        expect(CollisionDetector.isStandingOnObjects(player, walls)).toBeTruthy();
        expect(player.y).toBe(98);

    });

    it('should not find a match if the sprite it finds is itself', function () {
        let bubbles = [new Bubble(100, 100, RIGHT)];
        expect(CollisionDetector.doesCollideWithSprites(bubbles[0], bubbles)).toBeFalsy();

        bubbles.push(new Bubble(100, 100, RIGHT));
        expect(CollisionDetector.doesCollideWithSprites(bubbles[0], bubbles)).toBeTruthy();
    });

});
