var GameController = Class.extend({
    init: function(gameInit) {
        this.gameInit = gameInit;
        this.control = new Control();
        this.clearScreen();
        this.bub = new Player();
        this.images = new Images();
        this.context = $('#gameCanvas').get(0).getContext("2d");
        this.walls = [new Wall(100, 200)];
    },

    draw: function() {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.gameInit.width, this.gameInit.height);

        for (var i = 0; i < this.walls.length; i++)
            this.walls[i].draw(this.images, this.context);

        this.bub.draw(this.images, this.context);
    },

    update: function() {

        this.bub.update(!this.isStandingOnFloor());

        if (this.control.isHoldingRight())
            this.bub.moveRight();

        if (this.control.isHoldingLeft())
            this.bub.moveLeft();

        if (this.control.notHoldingRightOrLeft())
            this.bub.setAction('standing');

        if (this.control.isJumping())
            this.bub.jump();
    },

    clearScreen: function() {
        $('#gameCanvas').get(0).width = $('#gameCanvas').get(0).width;
    },

    updateWithTime: function() {
        var startTime = new Date().getTime();
        this.update();
        return new Date().getTime() - startTime;
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
    }
});
