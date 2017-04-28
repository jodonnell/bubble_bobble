import GameInit from './game_init';

class Camera {
    constructor() {
        this.y = 0;
    }

    relativeX(absoluteX) {
        return absoluteX;
    }

    relativeY(absoluteY) {
        let y = this.y;
        if (this.y < GameInit.centerY) {
            y = 300;
        }

        return GameInit.height - (absoluteY - y) - GameInit.centerY;
    }

    moveTo(adjustY) {
        this.y = adjustY;
    }
}

export default Camera;
