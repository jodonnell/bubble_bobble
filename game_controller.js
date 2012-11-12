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

        this.bub.update();

        if (this.control.isHoldingRight())
            this.bub.moveRight();

        if (this.control.isHoldingLeft())
            this.bub.moveLeft();

        if (!this.control.isHoldingLeft() && !this.control.isHoldingRight())
            this.bub.setAction('standing');

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
