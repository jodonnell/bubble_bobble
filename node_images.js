"use strict";

var NodeImages = Images.extend({
    _loadImage: function (prop, imageFile) {
        this[prop] = {};
        var im = require('imagemagick');
        var imagePath = "assets/" + imageFile;
        im.identify(imagePath, $.proxy(function(err, features){
            if (err) throw err
            this[prop].width = features.width;
            this[prop].height = features.height;

            if (this[prop].onload)
                this[prop].onload();
        }, this));

    }
});

root = exports ? exports : this;
root.NodeImages = NodeImages;
