import Sprite from './sprite';
import LinearAnimation from '../animations/linear_animation';
import {LEFT, RIGHT} from '../constants';
import CollisionDetector from '../collision_detector';

class BlueMagoo extends Sprite {
    get JUMP_HEIGHT() {
        return 100;
    }

    constructor(x, y, direction) {
        super();
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.jumping = 0;

        this.currentImage = 'blueMagooWalk';
        this.animation = new LinearAnimation(10, ['blueMagooWalk', 'blueMagooWalkLeg']);
    }

    update(args) {
        let followX = args.onscreenSprites.players[0].x;
        let followY = args.onscreenSprites.players[0].y;
        let onscreenSprites = args.onscreenSprites;

        this.currentImage = this.animation.update();

        if (this.isJumping()) {
            this.y -= 3;
            this.jumping++;
            if (this.jumping > 50) {
                this.jumping = 0;
            }
        }
        else if (CollisionDetector.isStandingOnObjects(this, onscreenSprites.walls)) {
            this.move(followX, followY, onscreenSprites.walls);
        }
        else {
            this.y += 3;
        }
    }

    shouldTrack() {
        return Math.random() > 0.99;
    }

    move(followX, followY, walls) {
        if (this.shouldTrack())  {
            this.track(followX, followY, walls);
        }
        else {
            this.moveInCurrentDirection();
            this.boundaryCheck();
        }
    }

    moveInCurrentDirection() {
        if (this.direction === RIGHT) {
            this.x += 3;
        }
        else {
            this.x -= 3;
        }
    }

    track(followX, followY, walls) {
        if (this.y > followY) {
            if (CollisionDetector.areSpritesAboveWithin(this, walls, 150)) {
                this.jumping = 1;
                return;
            }
        }

        if (followX !== this.x) {
            if (followX > this.x) {
                this.direction = RIGHT;
                this.x += 3;
            }
            else {
                this.direction = LEFT;
                this.x -= 3;
            }
        }
    }

    getCurrentImage() {
        let imageName = this.currentImage;
        if (this.direction === LEFT) {
            imageName += 'Left';
        }
        else {
            imageName += 'Right';
        }
        return imageName;
    }

    boundaryCheck() {
        this.moveSpeed = 0;
        if (!CollisionDetector.noWallToRight(this)) {
            this.direction = LEFT;
        }
        if (!CollisionDetector.noWallToLeft(this)) {
            this.direction = RIGHT;
        }
    }

    isJumping() {
        return this.jumping;
    }

    isTrapped() {
        return this.trapped;
    }

    switchDirection() {
        if (this.direction === RIGHT) {
            this.direction = LEFT;
        }
        else {
            this.direction = RIGHT;
        }
    }
}

export default BlueMagoo;
