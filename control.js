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
        this.socket = io.connect('http://192.168.0.105:3000');

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

    },

    getKey: function () {
        document.addEventListener('touchstart', $.proxy(function(e) {
            e.preventDefault();
            var touch = e.touches[0];

            if (touch.pageX < 100) {
                this.pressLeft();
            }
            else if (touch.pageX >= 100 && touch.pageX < 400) {
                this.pressRight();
            }
            else if (touch.pageX >= 400 && touch.pageX < 850) {
                this.pressJump();
            }
            else if (touch.pageX >= 850) {
                this.pressBubble();
            }
        }, this), false);

        var touchEnd = function(e) {
            e.preventDefault();

            this.releaseLeft();
            this.releaseRight();
            this.releaseJump();
            this.releaseBubble();

        };
        document.addEventListener('touchend', $.proxy(touchEnd, this), false);
        document.addEventListener('touchcancel', $.proxy(touchEnd, this), false);

        $(document).keydown($.proxy(function (event) {
            switch (event.which) {
            case this.LEFT_KEY:
                this.pressLeft();
                break;
            case this.RIGHT_KEY:
                this.pressRight();
                break;
            case this.Z_KEY:
                this.pressJump();
                break;
            case this.DVORAK_Z_KEY:
                this.pressJump();
                break;
            case this.X_KEY:
                this.pressBubble();
                break;
            case this.DVORAK_X_KEY:
                this.pressBubble();
                break;
            }
        }, this));
        $(document).keyup($.proxy(function (event) {
            switch (event.which) {
            case this.LEFT_KEY:
                this.releaseLeft();
                break;
            case this.RIGHT_KEY:
                this.releaseRight();
                break;
            case this.Z_KEY:
                this.releaseJump();
                break;
            case this.DVORAK_Z_KEY:
                this.releaseJump();
                break;
            case this.X_KEY:
                this.releaseBubble();
                break;
            case this.DVORAK_X_KEY:
                this.releaseBubble();
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

    pressLeft: function () {
        if (this.left === 0) {
            this.socket.emit('moveLeft', {moving: 'keyDown'});
        }
        this.left = 1;
    },

    pressRight: function () {
        if (this.right === 0) {
            this.socket.emit('moveRight', {moving: 'keyDown'});
        }
        this.right = 1;
    },

    pressJump: function () {
        if (this.z === 0) {
            this.socket.emit('pressZ', {moving: 'keyDown'});
        }

        this.z = 1;
    },

    pressBubble: function () {
        if (this.x === 0) {
            this.socket.emit('pressX', {moving: 'keyDown'});
        }
        this.x = 1;
    },

    releaseLeft: function () {
        if (this.left === 1) {
            this.socket.emit('moveLeft', {moving: 'keyUp'});
        }
        this.left = 0;
    },

    releaseRight: function () {
        if (this.right === 1) {
            this.socket.emit('moveRight', {moving: 'keyUp'});
        }
        this.right = 0;
    },

    releaseJump: function () {
        if (this.z === 1) {
            this.socket.emit('pressZ', {moving: 'keyUp'});
        }
        this.z = 0;
    },

    releaseBubble: function () {
        if (this.x === 1) {
            this.socket.emit('pressX', {moving: 'keyUp'});
        }
        this.x = 0;
    },

    notHoldingRightOrLeft: function () {
        return !this.isHoldingLeft() && !this.isHoldingRight();
    }
});
