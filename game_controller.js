var GameController = Class.extend({
    init: function(gameInit) {
        this.gameInit = gameInit;
        this.control = new Control();
        this.clearScreen();
        this.bub = new Player();
        this.images = new Images();

        this.context = $('#gameCanvas').get(0).getContext("2d");
    },

    update: function() {
        this.clearScreen();
        if (this.control.isMovingRight())
            this.bub.moveRight();

        if (this.control.isMovingLeft())
            this.bub.moveLeft();

        this.bub.draw(this.images, this.context);
    },

    clearScreen: function() {
        $('#gameCanvas').get(0).width = $('#gameCanvas').get(0).width;
    },

    updateWithTime: function() {
        var startTime = new Date().getTime();
        this.update();
        return new Date().getTime() - startTime;
    }
});
