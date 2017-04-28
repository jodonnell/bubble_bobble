class GameInit {
    constructor(hide) {
        this.createCanvas();
        if (hide) {
            this.hide = true;
        }
    }

    static get width() {
        return 800;
    }

    static get height() {
        return 600;
    }

    static get centerY() {
        return this.height / 2;
    }

    createCanvas() {
        this.width = 800;
        this.height = 600;

        let left = this.viewportWidth() / 2 - this.width / 2;
        let top = this.viewportHeight() / 2 - this.height / 2;

        let canvas = document.createElement('canvas');
        canvas.id = 'gameCanvas';
        canvas.width = this.width;
        canvas.height = this.height;
        document.body.appendChild(canvas);

        canvas.style.position = 'absolute';
        canvas.style.top = top + 'px';
        canvas.style.left = left + 'px';

        if (this.hide) {
            canvas.style.visibilty = 'hidden';
        }
    }

    viewportWidth() {
        let w = window,
            e = document.documentElement,
            g = document.getElementsByTagName('body')[0];

        return w.innerWidth || e.clientWidth || g.clientWidth;
    }

    viewportHeight() {
        let w = window,
            e = document.documentElement,
            g = document.getElementsByTagName('body')[0];

        return w.innerHeight|| e.clientHeight|| g.clientHeight;
    }

    destroyCanvas() {
        let canvas = document.getElementById('gameCanvas');
        document.body.removeChild(canvas);
    }
}

export default GameInit;
