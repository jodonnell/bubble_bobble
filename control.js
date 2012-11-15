var Control = Class.extend({
    LEFT_KEY: 37,
    RIGHT_KEY: 39,
    Z_KEY: 90,


    init: function() {
        this.left = 0;
        this.right = 0;
        this.z = 0;
        this.getKey();
    },

    getKey: function() {
        $(document).keydown( $.proxy( function(event) {
            switch (event.keyCode) {
            case this.LEFT_KEY: this.left = 1; break;
            case this.RIGHT_KEY: this.right = 1; break;
            case this.Z_KEY: this.z = 1; break;
            }
        }, this));
        $(document).keyup( $.proxy( function(event) {
            switch (event.keyCode) {
            case this.LEFT_KEY: this.left = 0; break;
            case this.RIGHT_KEY: this.right = 0; break;
            case this.Z_KEY: this.z = 0; break;
            }
        }, this));
    },

    isHoldingRight: function() {
        return this.right;
    },

    isHoldingLeft: function() {
        return this.left;
    },

    isJumping: function() {
        return this.z;
    },

    notHoldingRightOrLeft: function() {
        return !this.isHoldingLeft() && !this.isHoldingRight();
    }
});
