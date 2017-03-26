import Control from './control';

class InputControl extends Control {
    constructor(socket) {
        super();
        this._socket = socket;
        this.getKey();
    }

    get LEFT_KEY() {
        return 37;
    }

    get RIGHT_KEY() {
        return 39;
    }

    get UP_KEY() {
        return 38;
    }

    get DOWN_KEY() {
        return 40;
    }

    get Z_KEY() {
        return 90;
    }

    get DVORAK_Z_KEY() {
        return 186;
    }

    get DVORAK_Z_KEY_FIREFOX() {
        return 59;
    }

    get X_KEY() {
        return 88;
    }

    get DVORAK_X_KEY() {
        return 81;
    }

    getKey() {
        document.addEventListener('touchstart', (e) => {
            e.preventDefault();
            var touch = e.touches[0];

            if (touch.pageX < 100) {
                this.pressLeft();
            }
            else if (touch.pageX >= 100 && touch.pageX < 400) {
                this.pressRight();
            }
            else if (touch.pageX >= 400 && touch.pageX < 850) {
                this.pressJump();
            }
            else if (touch.pageX >= 850) {
                this.pressBubble();
            }
        }, false);

        var touchEnd = (e) => {
            e.preventDefault();

            this.releaseLeft();
            this.releaseRight();
            this.releaseJump();
            this.releaseBubble();
        };

        document.addEventListener('touchend', touchEnd, false);
        document.addEventListener('touchcancel', touchEnd, false);

        var keydown = (event) => {
            switch (event.which) {
            case this.LEFT_KEY:
                this.pressLeft();
                break;
            case this.RIGHT_KEY:
                this.pressRight();
                break;
            case this.UP_KEY:
                this.pressUp();
                break;
            case this.DOWN_KEY:
                this.pressDown();
                break;
            case this.Z_KEY:
                this.pressJump();
                break;
            case this.DVORAK_Z_KEY:
                this.pressJump();
                break;
            case this.DVORAK_Z_KEY_FIREFOX:
                this.pressJump();
                break;
            case this.X_KEY:
                this.pressBubble();
                break;
            case this.DVORAK_X_KEY:
                this.pressBubble();
                break;
            }
        };

        var keyup = (event) => {
            switch (event.which) {
            case this.LEFT_KEY:
                this.releaseLeft();
                break;
            case this.RIGHT_KEY:
                this.releaseRight();
                break;
            case this.DOWN_KEY:
                this.releaseDown();
                break;
            case this.UP_KEY:
                this.releaseUp();
                break;
            case this.Z_KEY:
                this.releaseJump();
                break;
            case this.DVORAK_Z_KEY:
                this.releaseJump();
                break;
            case this.DVORAK_Z_KEY_FIREFOX:
                this.releaseJump();
                break;
            case this.X_KEY:
                this.releaseBubble();
                break;
            case this.DVORAK_X_KEY:
                this.releaseBubble();
                break;
            }
        };

        document.addEventListener('keydown', keydown, false);
        document.addEventListener('keyup', keyup, false);
    }

    pressLeft() {
        if (this.left === 0) {
            this.socket().emit('moveLeft', {moving: 'keyDown'});
        }
        this.left = 1;
    }

    pressRight() {
        if (this.right === 0) {
            this.socket().emit('moveRight', {moving: 'keyDown'});
        }
        this.right = 1;
    }

    pressUp() {
        this.up = 1;
    }

    pressDown() {
        this.down = 1;
    }

    pressJump() {
        if (this.z === 0) {
            this.socket().emit('pressZ', {moving: 'keyDown'});
        }

        this.z = 1;
    }

    pressBubble() {
        if (this.x === 0) {
            this.socket().emit('pressX', {moving: 'keyDown'});
        }
        this.x = 1;
    }

    releaseLeft() {
        if (this.left === 1) {
            this.socket().emit('moveLeft', {moving: 'keyUp'});
        }
        this.left = 0;
    }

    releaseRight() {
        if (this.right === 1) {
            this.socket().emit('moveRight', {moving: 'keyUp'});
        }
        this.right = 0;
    }

    releaseDown() {
        this.down = 0;
    }

    releaseUp() {
        this.up = 0;
    }

    releaseJump() {
        if (this.z === 1) {
            this.socket().emit('pressZ', {moving: 'keyUp'});
        }
        this.z = 0;
    }

    releaseBubble() {
        if (this.x === 1) {
            this.socket().emit('pressX', {moving: 'keyUp'});
        }
        this.x = 0;
    }

    socket() {
        if (this._socket) {
            return this._socket;
        }
        return {emit: function() {}};
    }
}

export default InputControl;
