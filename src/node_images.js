"use strict";

class NodeImages extends Images {
    _loadImage(prop, imageFile) {
        this._props.push(prop);
        this[prop] = {ready: false};
        var im = require('imagemagick');
        var imagePath = "assets/" + imageFile;

        im.identify(imagePath, (err, features) => {
            if (err) throw err
            this[prop].width = features.width;
            this[prop].height = features.height;
            this[prop].ready = true;

            if (this._props.length === this._numImages) {
                var allLoaded = true;
                for (var i = 0; i < this._props.length; i++) {
                    if (this[this._props[i]].ready === false)
                        allLoaded = false;
                }
                if (allLoaded) {
                    this._callback();
                }

            }

        });
    }
}

root = exports ? exports : this;
root.NodeImages = NodeImages;
