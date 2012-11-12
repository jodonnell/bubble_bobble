var Images = Class.extend({
    init: function(callback) {
        this.bub = new Image();
        this.bub.src = "assets/bub.png";
        this.bub.onload = callback;
    },

});
