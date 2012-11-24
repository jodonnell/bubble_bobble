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

        $(document).on('shootBubble', $.proxy(this.createBubble, this));
        $(document).on('removeBubble', $.proxy(this.removeBubble, this));

    },

    removeBubble: function(e, bubble) {
        var remove = -1;
        for (var i = 0; i < this.bubbles.length; i++)
            if (this.bubbles[i] == bubble)
                remove = i;
        
        this.bubbles.splice(remove, 1);
    },

    createBubble: function(e, direction) {
        if (direction == RIGHT)
            var x = this.bub.x + this.bub.width(this.images) / 2;
        else
            var x = this.bub.x - this.bub.width(this.images) / 2;
        this.bubbles.push(new Bubble(x, this.bub.y, direction));
    },

    draw: function() {
        this.context.fillStyle = "#010000";
        this.context.fillRect(0, 0, this.gameInit.width, this.gameInit.height);

        for (var i = 0; i < this.walls.length; i++)
            this.walls[i].draw();

        for (var i = 0; i < this.bubbles.length; i++)
            this.bubbles[i].draw();

        this.bub.draw();
    },

    update: function() {
        var options = {isOnPlatform: this.isStandingOnFloor() || this.isStandingOnBubble(), isJumping: this.control.isJumping(), 
                       isHoldingLeft: this.control.isHoldingLeft() && this.noWallToLeft(), isHoldingRight: this.control.isHoldingRight() && this.noWallToRight(), 
                       isShooting: this.control.isShooting()};
        this.bub.update(options);

        for (var i = 0; i < this.bubbles.length; i++)
            this.bubbles[i].update();
    },

    noWallToRight: function() {
        if (this.bub.x + this.bub.width() + this.bub.moveSpeed >= 754) {
            this.bub.x = 754 - this.bub.width();
            return false;
        }
        return true;
    },

    noWallToLeft: function() {
        if (this.bub.x - this.bub.moveSpeed <= 46) {
            this.bub.x = 46;
            return false;
        }
        return true;
        // for (var i = 0; i < this.walls.length; i++) {
        //     var leftSideOfWall = this.walls[i].x + this.walls[i].width();
        //     var bottomOfWall = this.walls[i].y + this.walls[i].height();
        //     if (leftSideOfWall >= this.bub.x &&
        //         leftSideOfWall <= this.bub.x + 4 &&
        //         this.bub.y > this.walls[i].y && this.bub.y < bottomOfWall
        //        ) {
        //         return false;
        //     }
        // }
        // return true;
        
    },

    clearScreen: function() {
        $('#gameCanvas').get(0).width = $('#gameCanvas').get(0).width;
    },

    isStandingOnFloor: function() {
        return this.isStandingOnObjects(this.walls);
    },

    isStandingOnBubble: function() {
        var onBubble = this.isStandingOnObjects(this.bubbles);
        if (onBubble)
            this.bub.y -= 2;
        return onBubble;
    },

    isStandingOnObjects: function(objects) {
        for (var i = 0; i < objects.length; i++) {
            if (this.doesBottomCollide(objects[i]) && this.xMatchUp(objects[i])) {
                return true;
            }
        }
        return false;
    },

    doesBottomCollide: function(object) {
        return object.y == this.bub.y + this.bub.height() ||
            object.y + 1 == this.bub.y + this.bub.height() ||
            object.y + 2 == this.bub.y + this.bub.height();
    },

    xMatchUp: function(object) {
        return object.x <= this.bub.x + this.bub.width() && object.x + object.width() >= this.bub.x;
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
