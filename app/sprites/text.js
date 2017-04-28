import TextDrawer from '../drawers/text_drawer';
import Sprite from './sprite';

class Text extends Sprite {
    constructor(x, y, text) {
        super();
        this.x = x;
        this.y = y;
        this.text = text;
        this.timer = 0;
    }

    draw(camera) {
        TextDrawer.draw(this, camera);
    }

    update(args) {
        this.y += 1;
        this.timer++;

        if (this.timer > 40) {
            args.onscreenSprites.texts.remove(this);
        }
    }
}

export default Text;
