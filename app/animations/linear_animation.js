class LinearAnimation {
    constructor(speed, frames, runTimes) {
        this.speed = speed;
        this.frames = frames;
        this.currentFrame = 0;

        this.runTimes = runTimes || null;
        this.tick = 0;
    }

    get currentImage() {
        if (this.runTimes === 0) {
            this.currentFrame = this.frames.length - 1;
        }

        return this.frames[this.currentFrame];
    }

    animationEnded() {
        this.currentFrame = 0;
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
            return this.currentImage;
        }

        this.tick++;
        if (this.tick !== this.speed) {
            return this.currentImage;
        }

        this.tick = 0;
        this.nextFrame();
        return this.currentImage;
    }

    isOver() {
        if (this.runTimes === null) {
            return false;
        }

        return this.runTimes === 0;
    }
}

export default LinearAnimation;
