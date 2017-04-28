import GameInit from '../game_init';

class TextDrawer {
    static draw(sprite, camera) {
        const y = GameInit.height - sprite.y;

        window.gameContext.font = 'bold 25px Comic Sans MS';
        window.gameContext.fillStyle = 'green';
        window.gameContext.fillText(sprite.text, sprite.x, y);
    }
}

export default TextDrawer;
