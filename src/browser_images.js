class BrowserImages extends Images {
    _loadImage(prop, imageFile) {
        this._props.push(prop);
        this[prop] = {ready: false};

        this[prop] = new Image();
        this[prop].src = 'assets/' + imageFile;
        if (prop === 'bubRight')
            this[prop].onload = this._callback;
    }
}
