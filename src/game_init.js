"use strict";

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

    createCanvas() {
        this.width = 800;
        this.height = 600;

        var left = this.viewportWidth() / 2 - this.width / 2;
        var top = this.viewportHeight() / 2 - this.height / 2;

        var canvas = document.createElement('canvas');
        canvas.id = 'gameCanvas';
        canvas.width = this.width;
        canvas.height = this.height;
        document.body.appendChild(canvas);

        canvas.style.position = 'absolute';
        canvas.style.top = top + 'px';
        canvas.style.left = left + 'px';
        // canvas.style.width = '1066px';
        // canvas.style.height = '800px';

        if (this.hide) {
            canvas.style.visibilty = 'hidden';
        }
    }

    viewportWidth() {
        var w = window,
            e = document.documentElement,
            g = document.getElementsByTagName('body')[0];

        return w.innerWidth || e.clientWidth || g.clientWidth;
    }

    viewportHeight() {
        var w = window,
            e = document.documentElement,
            g = document.getElementsByTagName('body')[0];

        return w.innerHeight|| e.clientHeight|| g.clientHeight;
    }

    destroyCanvas() {
        var canvas = document.getElementById('gameCanvas');
        document.body.removeChild(canvas);
    }
}
