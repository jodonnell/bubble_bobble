import Sprite from './sprite';

class Pepper extends Sprite {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.currentImage = 'pepper';
        this.points = 3000;
    }
}

export default Pepper;
