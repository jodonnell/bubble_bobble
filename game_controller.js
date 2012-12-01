var GameController = Class.extend({
    init: function(gameInit) {
        this.gameInit = gameInit;
        this.control = new Control();

        this.bub = new Player(200, 100);
        this.images = new Images();
        this.context = $('#gameCanvas').get(0).getContext("2d");

        this.walls = (new LevelBuilder(this.walls)).walls;

        this.bubbles = [];
        this.enemies = [new BlueMagoo(370, 20, LEFT), new BlueMagoo(370, 70, LEFT), new BlueMagoo(370, 120, LEFT)];

        this.collisionDetector = new CollisionDetector(this.bub, this.enemies, this.bubbles, this.walls);

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

        for (var i = 0; i < this.enemies.length; i++)
            this.enemies[i].draw();

        this.bub.draw();
    },

    update: function() {
        this.bub.update(this.control, this.collisionDetector);

        for (var i = 0; i < this.bubbles.length; i++)
            this.bubbles[i].update();

        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update(this.collisionDetector, this.bub.x, this.bub.y);
        }
    }
});
