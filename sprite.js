var Sprite = Class.extend({
    draw: function() {
        var image = gameImages[this.getCurrentImage()];
        gameContext.drawImage(image, this.x, this.y);
    },

    height: function() {
        return gameImages[this.getCurrentImage()].height;
    },

    width: function(images) {
        return gameImages[this.getCurrentImage()].width;
    },

    getCurrentImage: function() {
        return this.currentImage;
    }
})
