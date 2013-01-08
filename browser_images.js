"use strict";

var BrowserImages = Images.extend({
    _loadImage: function (prop, imageFile) {
        this[prop] = new Image();
        this[prop].src = "assets/" + imageFile;
    }
});
