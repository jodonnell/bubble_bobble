class Wall extends Sprite {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.currentImage = 'wall';
    }
}

if (typeof exports !== 'undefined') {
    exports.Wall = Wall;
}
