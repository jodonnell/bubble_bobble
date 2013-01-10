"use strict";

var Control = Class.extend({
    init: function () {
        this.left = 0;
        this.right = 0;
        this.x = 0;
        this.z = 0;
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

if (typeof exports !== 'undefined') {
    exports.Control = Control;
}

