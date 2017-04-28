import DeadEnemy from '../../app/sprites/dead_enemy';
import Wall from '../../app/sprites/wall';
import OnscreenSprites from '../../app/onscreen_sprites';
import {LEFT, RIGHT, RIGHT_BOUND} from '../../app/constants';

describe('Dead Enemy', function () {
    let args, deadEnemy;

    beforeEach(function () {
        deadEnemy = new DeadEnemy(100, 100, RIGHT);
        args = {onscreenSprites: new OnscreenSprites({deadEnemies: [deadEnemy]})};
    });

    it('should animate correctly', function () {
        expect(deadEnemy.currentImage).toBe('deadEnemyRight');
        nextFrame();
        expect(deadEnemy.currentImage).toBe('deadEnemyBottom');
        nextFrame();
        expect(deadEnemy.currentImage).toBe('deadEnemyLeft');
        nextFrame();
        expect(deadEnemy.currentImage).toBe('deadEnemyTop');
        nextFrame();
        expect(deadEnemy.currentImage).toBe('deadEnemyRight');
    });

    it('should travel in a parabola', function () {
        deadEnemy.update(args);
        expect(deadEnemy.x).toBe(102);
        expect(deadEnemy.y).toBe(104);

        deadEnemy.update(args);
        expect(deadEnemy.x).toBe(104);
        expect(deadEnemy.y).toBe(108);
    });

    it('should be able to fly left too', function () {
        deadEnemy.direction = LEFT;
        deadEnemy.update(args);
        expect(deadEnemy.x).toBe(98);
        expect(deadEnemy.y).toBe(104);

        deadEnemy.update(args);
        expect(deadEnemy.x).toBe(96);
        expect(deadEnemy.y).toBe(108);
    });

    it('should bounce off a wall', function () {
        deadEnemy.x = RIGHT_BOUND;
        deadEnemy.update(args);
        expect(deadEnemy.x).toBe(RIGHT_BOUND - 2);
        expect(deadEnemy.y).toBe(104);

        deadEnemy.update(args);
        expect(deadEnemy.x).toBe(RIGHT_BOUND - 4);
        expect(deadEnemy.y).toBe(108);
    });

    it('should become a fruit when it hits the ground', function () {
        for (let i = 0; i < 300; i++) {
            if (args.onscreenSprites.deadEnemies.length === 0) {
                break;
            }

            deadEnemy.update(args);
            if (deadEnemy.y < 100) {
                args.onscreenSprites.walls.push(new Wall(deadEnemy.x, deadEnemy.bottomSide() - 10));
            }
        }

        expect(args.onscreenSprites.collectibles.length).toBe(1);
        expect(args.onscreenSprites.deadEnemies.length).toBe(0);
    });

    function nextFrame() {
        for (let i = 0; i < 3; i++) {
            deadEnemy.update(args);
        }
    }
});
