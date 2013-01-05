"use strict";

var Control = Class.extend({
    LEFT_KEY: 37,
    RIGHT_KEY: 39,
    Z_KEY: 90,
    DVORAK_Z_KEY: 186,
    X_KEY: 88,
    DVORAK_X_KEY: 81,

    init: function () {
        this.left = 0;
        this.right = 0;
        this.x = 0;
        this.z = 0;
        this.getKey();
        this.socket = io.connect('http://localhost:3000');
    },

    getKey: function () {
        $(document).keydown($.proxy(function (event) {
            switch (event.which) {
            case this.LEFT_KEY:
                this.left = 1;
                break;
            case this.RIGHT_KEY:
                if (this.right === 0) {
                    this.socket.emit('moveRight', {moving: 'keyDown'});
                }
                this.right = 1;
                break;
            case this.Z_KEY:
                this.z = 1;
                break;
            case this.DVORAK_Z_KEY:
                this.z = 1;
                break;
            case this.X_KEY:
                this.x = 1;
                break;
            case this.DVORAK_X_KEY:
                this.x = 1;
                break;
            }
        }, this));
        $(document).keyup($.proxy(function (event) {
            switch (event.which) {
            case this.LEFT_KEY:
                this.left = 0;
                break;
            case this.RIGHT_KEY:
                if (this.right === 1) {
                    this.socket.emit('moveRight', {moving: 'keyUp'});
                }
                this.right = 0;
                break;
            case this.Z_KEY:
                this.z = 0;
                break;
            case this.DVORAK_Z_KEY:
                this.z = 0;
                break;
            case this.X_KEY:
                this.x = 0;
                break;
            case this.DVORAK_X_KEY:
                this.x = 0;
                break;
            }
        }, this));
    },

    isHoldingRight: function () {
        return this.right;
    },

    isHoldingLeft: function () {
        return this.left;
    },

    isJumping: function () {
        return this.z;
    },

    isShooting: function () {
        return this.x;
    },

    notHoldingRightOrLeft: function () {
        return !this.isHoldingLeft() && !this.isHoldingRight();
    }
});
