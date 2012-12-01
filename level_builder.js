var LevelBuilder = Class.extend({
    init: function() {
        this.walls = [];
        this.buildLevel1();
    },

    buildLevel1: function() {
        for (var i = 0; i < 2; i++) {
            for (var k = 0; k < 27; k++)  {
                if (i == 0)
                    this.walls.push(new Wall(0, k * 23));
                else
                    this.walls.push(new Wall(755, k * 23));
            }
        }

        for (var i = 0; i < 18; i++) {
            for (var k = 0; k < 2; k++)  {
                if (k == 0)
                    this.walls.push(new Wall(i * 45, 0));
                else
                    this.walls.push(new Wall(i * 45, 577));
            }
        }


        for (var i = 1; i < 17; i++) {
            if (i == 2 || i == 3 || i == 14 || i == 15)
                continue;
            for (var k = 1; k < 4; k++)  {
                this.walls.push(new Wall(i * 45, k * 120 + 90));
            }
        }
    }

})
