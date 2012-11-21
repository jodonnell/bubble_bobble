var GameController = Class.extend({
    init: function(gameInit) {
        this.gameInit = gameInit;
        this.control = new Control();
        this.clearScreen();
        this.bub = new Player(200, 100);
        this.images = new Images();
        this.context = $('#gameCanvas').get(0).getContext("2d");

        this.walls = [];
        this.buildLevel1();

        this.bubbles = [];
    },

    draw: function() {
        this.context.fillStyle = "#010000";
        this.context.fillRect(0, 0, this.gameInit.width, this.gameInit.height);

        for (var i = 0; i < this.walls.length; i++)
            this.walls[i].draw(this.images, this.context);

        this.bub.draw(this.images, this.context);
    },

    update: function() {
        var options = {isOnPlatform: this.isStandingOnFloor(), isJumping: this.control.isJumping(), 
                       isHoldingLeft: this.control.isHoldingLeft(), isHoldingRight: this.control.isHoldingRight(), 
                       isShooting: this.control.isShooting()};
        this.bub.update(options);
    },

    clearScreen: function() {
        $('#gameCanvas').get(0).width = $('#gameCanvas').get(0).width;
    },

    isStandingOnFloor: function() {
        for (var i = 0; i < this.walls.length; i++) {
            if (this.doesBottomCollide(this.walls[i]) && this.xMatchUp(this.walls[i])) {
                return true;
            }
        }
        return false;
    },

    doesBottomCollide: function(wall) {
        return wall.y == this.bub.y + this.bub.height(this.images) ||
            wall.y + 1 == this.bub.y + this.bub.height(this.images) ||
            wall.y + 2 == this.bub.y + this.bub.height(this.images);
    },

    xMatchUp: function(wall) {
        return wall.x <= this.bub.x + this.bub.width(this.images) && wall.x + wall.width(this.images) >= this.bub.x;
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
});
