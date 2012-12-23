"use strict";

var GameInit = Class.extend({
    init: function (hide) {
        this.createCanvas();
        if (hide) {
            this.hide = true;
        }
    },

    createCanvas: function () {
        this.width = 800;
        this.height = 600;

        var canvas = '<canvas id="gameCanvas" width="' + this.width + '" height="' + this.height + '"></canvas>';
        $('body').append(canvas);
        $("#gameCanvas").css('position', 'absolute');
        $("#gameCanvas").css('top', '0px');
        $("#gameCanvas").css('left', '0px');
        $("#gameCanvas").css('width', '1066px');
        $("#gameCanvas").css('height', '800px');

        if (this.hide) {
            $("#gameCanvas").css('visibilty', 'hidden');
        }
    },

    destroyCanvas: function () {
        $("#gameCanvas").remove();
    }
});
