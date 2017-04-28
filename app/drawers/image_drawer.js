import GameInit from '../game_init';

class ImageDrawer {
    static draw(sprite, camera) {
        let image = window.gameImages[sprite.getCurrentImage()];

        const y = GameInit.height - sprite.y;
        window.gameContext.drawImage(image, sprite.x, y);
    }
}

export default ImageDrawer;
