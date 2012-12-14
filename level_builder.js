"use strict";

var LevelBuilder = Class.extend({
    init: function () {
        this.walls = [];
        this.buildLevel1();
    },

    buildLevel1: function () {
        var i;
        var k;
        for (i = 0; i < 2; i++) {
            for (k = 0; k < 27; k++)  {
                if (i === 0) {
                    this.walls.push(new Wall(0, k * 23));
                }
                else {
                    this.walls.push(new Wall(755, k * 23));
                }
            }
        }

        for (i = 0; i < 18; i++) {
            for (k = 0; k < 2; k++)  {
                if (k === 0) {
                    this.walls.push(new Wall(i * 45, 0));
                }
                else {
                    this.walls.push(new Wall(i * 45, 577));
                }
            }
        }


        for (i = 1; i < 17; i++) {
            if (i === 2 || i === 3 || i === 14 || i === 15) {
                continue;
            }
            for (k = 1; k < 4; k++)  {
                this.walls.push(new Wall(i * 45, k * 120 + 90));
            }
        }
    }

});
