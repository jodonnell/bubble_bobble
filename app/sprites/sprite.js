import ImageDrawer from '../drawers/image_drawer';

class Sprite {
    draw(camera) {
        ImageDrawer.draw(this, camera);
    }

    height() {
        return window.gameImages[this.getCurrentImage()].height;
    }

    width() {
        return window.gameImages[this.getCurrentImage()].width;
    }

    getCurrentImage() {
        return this.currentImage;
    }

    rightSide() {
        return this.x + this.width();
    }

    bottomSide() {
        return this.y - this.height();
    }

    update() {

    }
}

export default Sprite;
