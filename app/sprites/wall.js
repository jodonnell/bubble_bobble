import Sprite from './sprite';

class Wall extends Sprite {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.currentImage = 'wall';
    }
}

export default Wall;
