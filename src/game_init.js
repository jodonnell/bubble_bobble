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

        var left = $(window).width() / 2 - this.width / 2;
        var top = $(window).height() / 2 - this.height / 2;

        var canvas = '<canvas id="gameCanvas" width="' + this.width + '" height="' + this.height + '"></canvas>';
        $('body').append(canvas);
        $("#gameCanvas").css('position', 'absolute');
        $("#gameCanvas").css('top', top + 'px');
        $("#gameCanvas").css('left', left + 'px');
        // $("#gameCanvas").css('width', '1066px');
        // $("#gameCanvas").css('height', '800px');

        if (this.hide) {
            $("#gameCanvas").css('visibilty', 'hidden');
        }
    },

    destroyCanvas: function () {
        $("#gameCanvas").remove();
    }
});
