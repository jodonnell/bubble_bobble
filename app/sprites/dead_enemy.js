import Sprite from './sprite';
import Pepper from './pepper';
import LinearAnimation from '../animations/linear_animation';
import {LEFT, RIGHT, LEFT_BOUND, RIGHT_BOUND} from '../constants';
import CollisionDetector from '../collision_detector';

class DeadEnemy extends Sprite {
    constructor(x, y, direction) {
        super();
        this.x = x;
        this.y = y;
        this.direction = direction;

        this.originalY = y;

        this.currentImage = 'deadEnemyRight';
        this.timer = 0;
        this.parabolaTimer = 0;

        this.animation = new LinearAnimation(3, ['deadEnemyRight', 'deadEnemyBottom', 'deadEnemyLeft', 'deadEnemyTop']);
    }

    update(args) {
        this.switchDirectionIfHitWall();
        this.move();
        this.changeAnimation();
        this.changeToFruit(args.onscreenSprites);
    }

    move() {
        this.parabolaTimer += 2;

        //a(x - h)^2 + k
        const a = -0.005;
        const x = this.parabolaTimer;
        const h = 200;
        const k = 200;

        const y = Math.round(a * Math.pow(x - h, 2) + k);
        this.y = y + this.originalY;

        if (this.direction === RIGHT) {
            this.x += 2;
        }
        else {
            this.x -= 2;
        }
    }

    switchDirectionIfHitWall() {
        if (this.rightSide() >= RIGHT_BOUND) {
            this.direction = LEFT;
        }
        else if (this.x <= LEFT_BOUND) {
            this.direction = RIGHT;
        }
    }

    changeAnimation() {
        this.animation.update();
        this.currentImage = this.animation.currentImage;
    }

    changeToFruit(onscreenSprites) {
        if (this.y <= this.originalY) {
            if (CollisionDetector.isStandingOnObjects(this, onscreenSprites.walls)) {
                onscreenSprites.collectibles.push(new Pepper(this.x, this.y));
                onscreenSprites.deadEnemies.remove(this);
            }
        }
    }
}

export default DeadEnemy;
