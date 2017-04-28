class TextDrawer {
    static draw(sprite, camera) {
        const x = camera.relativeX(sprite.x);
        const y = camera.relativeY(sprite.y);

        window.gameContext.font = 'bold 25px Comic Sans MS';
        window.gameContext.fillStyle = 'green';
        window.gameContext.fillText(sprite.text, x, y);
    }
}

export default TextDrawer;
