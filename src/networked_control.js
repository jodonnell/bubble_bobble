"use strict";

var NetworkedControl = Control.extend({
    init: function (socket) {
        this._super();
        this.socket = socket;

        this.socket.on('moveRight', $.proxy(function (data) {
            if (data.moving === 'keyDown') {
                this.right = 1;
            }
            else {
                this.right = 0;
            }
        }, this));

        this.socket.on('moveLeft', $.proxy(function (data) {
            if (data.moving === 'keyDown') {
                this.left = 1;
            }
            else {
                this.left = 0;
            }
        }, this));

        this.socket.on('pressZ', $.proxy(function (data) {
            if (data.moving === 'keyDown') {
                this.z = 1;
            }
            else {
                this.z = 0;
            }
        }, this));

        this.socket.on('pressX', $.proxy(function (data) {
            if (data.moving === 'keyDown') {
                this.x = 1;
            }
            else {
                this.x = 0;
            }
        }, this));

    }
});

if (typeof exports !== 'undefined') {
    exports.NetworkedControl = NetworkedControl;
}
