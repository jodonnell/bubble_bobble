class LinearAnimation {
    constructor(speed, frames, runTimes) {
        this.speed = speed;
        this.frames = frames;
        this.currentFrame = 0;

        this.runTimes = runTimes || null;
        this.tick = 0;
    }

    get currentImage() {
        return this.frames[this.currentFrame];
    }

    animationEnded() {
        this.currentFrame = 0;
        debugger
        if (this.runTimes !== null) {
            this.runTimes--;
        }
    }

    nextFrame() {
        this.currentFrame += 1;

        if (this.currentFrame >= this.frames.length) {
            this.animationEnded();
        }
    }

    update() {
        if (this.runTimes === 0) {
            return;
        }

        this.tick++;
        if (this.tick !== this.speed) {
            return;
        }

        this.tick = 0;
        this.nextFrame();

    }

    isOver() {
        if (this.runTimes === null) {
            throw "You cannot call isOver on an infinite animation";
        }

        return this.runTimes === 0;
    }
}
