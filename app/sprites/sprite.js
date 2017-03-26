class Sprite {
    draw() {
        var image = window.gameImages[this.getCurrentImage()];
        window.gameContext.drawImage(image, this.x, this.y);
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
        return this.y + this.height();
    }

    update() {

    }
}

export default Sprite;
