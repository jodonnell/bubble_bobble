var GameController = Class.extend({
    init: function(gameInit) {
        this.gameInit = gameInit;
        this.control = new Control();
        this.clearScreen();
        this.bub = new Player(200, 100);
        this.images = new Images();
        this.context = $('#gameCanvas').get(0).getContext("2d");

        this.walls = [new Wall(100, 200)];

        // this.walls=[];
        // for (var i = 0; i < 100; i++) {
        //     var randomX=Math.floor(Math.random()*811)
        //     var randomY=Math.floor(Math.random()*611)
        //     this.walls.push(new Wall(randomX, randomY));
        // }
    },

    draw: function() {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.gameInit.width, this.gameInit.height);

        for (var i = 0; i < this.walls.length; i++)
            this.walls[i].draw(this.images, this.context);

        this.bub.draw(this.images, this.context);
    },

    update: function() {
        var options = {isOnPlatform: this.isStandingOnFloor(), isJumping: this.control.isJumping(), isHoldingLeft: this.control.isHoldingLeft(), isHoldingRight: this.control.isHoldingRight()};
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
    }
});
