var Wall = Class.extend({
    init: function(x, y) {
        this.x = x;
        this.y = y;
        this.currentImage = 'wall';
    },

    draw: function(images, context) {
        var image = images[this.currentImage];
        context.drawImage(image, this.x, this.y);
    },

    height: function(images) {
        return images[this.currentImage].height;
    },

    width: function(images) {
        return images[this.currentImage].width;
    }


});
