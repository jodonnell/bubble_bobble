class Control {
    constructor() {
        this.left = 0;
        this.right = 0;
        this.down = 0;
        this.up = 0;
        this.x = 0;
        this.z = 0;
    }

    isHoldingRight() {
        return this.right;
    }

    isHoldingLeft() {
        return this.left;
    }

    isJumping() {
        return this.z;
    }

    isShooting() {
        return this.x;
    }

    isHoldingDown() {
        return this.down;
    }

    isHoldingUp() {
        return this.up;
    }

    notHoldingRightOrLeft() {
        return !this.isHoldingLeft() && !this.isHoldingRight();
    }
}

export default Control;
