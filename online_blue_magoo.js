"use strict";

var OnlineBlueMagoo = Sprite.extend({
    JUMP_HEIGHT: 100,

    init: function (id, x, y, direction) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.jumping = 0;

        this._coords = [];

        this.currentImage = 'blueMagooWalk';
        this.timer = 0;
    },

    update: function (args) {
        if (this._coords.length) {
            if (this._coords.length > 1) {
                this._coords.shift();
            }

            if (this._coords[0].x > this.x) {
                this.moveRight(this._coords[0].x);
            }
            else if (this._coords[0].x < this.x) {
                this.moveLeft(this._coords[0].x);
            }
            
            if (this._coords[0].y < this.y) {
                this.jump();
            }
            else if (this._shouldFall()) {
                this.fall();
            }

            if (this._coords[0].x === this.x && this._coords[0].y === this.y) {
                this._coords.shift();
            }
        }
       
        this.timer++;

        this.changeAnimation();
    },


    addCoords: function (coordinate) {
        this._coords.push(coordinate);
    },

    changeAnimation: function () {
        if (this.timer !== 10) {
            return;
        }

        if (this.currentImage === 'blueMagooWalk') {
            this.currentImage = 'blueMagooWalkLeg';
        }
        else if (this.currentImage === 'blueMagooWalkLeg') {
            this.currentImage = 'blueMagooWalk';
        }
        else if (this.currentImage === 'blueMagooTrapped') {
            this.switchDirection();
        }
        this.timer = 0;
    },


    moveRight: function (moveTo) {
        this.direction = RIGHT;
        
        if (this.x + 4 > moveTo) {
            this.x = moveTo;
        }
        else {
            this.x += 4;
        }
    },

    moveLeft: function(moveTo) {
        this.direction = LEFT;
        if (this.x - 4 < moveTo) {
            this.x = moveTo;
        }
        else {
            this.x -= 4;
        }

    },

    jump: function() {
        var diff = this.y - this._coords[0].y;
        if (diff < 4) {
            this.y = this._coords[0].y;
        }
        else {
            this.y -= 4;
        }
    },

    fall: function () {
        var diff = this._coords[0].y - this.y;
        if (diff < 4) {
            this.y = this._coords[0].y;
        }
        else {
            this.y += 4;
        }
    },

    getCurrentImage: function () {
        var imageName = this.currentImage;
        if (this.direction === LEFT) {
            imageName += 'Left';
        }
        else {
            imageName += 'Right';
        }
        return imageName;
    },

    isJumping: function () {
        return this.jumping;
    },

    isTrapped: function () {
        return this.trapped;
    },

    _shouldFall: function() {
        return this._coords[0].y > this.y;
    }

});

if (typeof exports !== 'undefined') {
    exports.OnlineBlueMagoo = OnlineBlueMagoo;
}
