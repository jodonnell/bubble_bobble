class ImageDrawer {
    static draw(sprite, camera) {
        let image = window.gameImages[sprite.getCurrentImage()];

        const x = camera.relativeX(sprite.x);
        const y = camera.relativeY(sprite.y);
        window.gameContext.drawImage(image, x, y);
    }
}

export default ImageDrawer;
