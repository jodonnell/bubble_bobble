var GameInit = Class.extend({
    init: function(hide) {
        this.createCanvas();
        if (hide)
            this.hide = true;
    },

    createCanvas: function() {
        this.width = $(document).width();
        this.height = $(document).height() - 40;

        var canvas = '<canvas id="gameCanvas" width="' + this.width + '" height="' + this.height + '"></canvas>';
        $('body').append(canvas);
        $("#gameCanvas").css('position', 'absolute');
        $("#gameCanvas").css('top', '40px');
        $("#gameCanvas").css('left', '0px');
        if (this.hide)
            $("#gameCanvas").css('visibilty', 'hidden');
    },

    destroyCanvas: function() {
        $("#gameCanvas").remove();
    }
});
