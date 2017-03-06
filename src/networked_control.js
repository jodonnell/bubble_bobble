"use strict";

class NetworkedControl extends Control {
    constructor(socket) {
        super();
        this.socket = socket;

        this.socket.on('moveRight', (data) => {
            if (data.moving === 'keyDown') {
                this.right = 1;
            }
            else {
                this.right = 0;
            }
        });

        this.socket.on('moveLeft', (data) => {
            if (data.moving === 'keyDown') {
                this.left = 1;
            }
            else {
                this.left = 0;
            }
        });

        this.socket.on('pressZ', (data) => {
            if (data.moving === 'keyDown') {
                this.z = 1;
            }
            else {
                this.z = 0;
            }
        });

        this.socket.on('pressX', (data) => {
            if (data.moving === 'keyDown') {
                this.x = 1;
            }
            else {
                this.x = 0;
            }
        });

    }
}

if (typeof exports !== 'undefined') {
    exports.NetworkedControl = NetworkedControl;
}
