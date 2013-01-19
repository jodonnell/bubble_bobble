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
                this.moveRight();
            }
            else if (this._coords[0].x < this.x) {
                this.moveLeft();
            }
            
            if (this._coords[0].y < this.y && !this.isJumping()) {
                this.jumping = 1;
            }
            else if (this._coords[0].y > this.y && !this.isJumping()) {
                this.y += 3;
            }



            if (this._coords[0].x === this.x && this._coords[0].y === this.y) {
                this._coords.shift();
            }
        }
       
        this.timer++;

        this.changeAnimation();

        if (this.isJumping()) {
            this.y -= 3;
            this.jumping++;
            if (this.jumping > 50) {
                this.jumping = 0;
            }
        }
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


    moveRight: function () {
        this.direction = RIGHT;
        this.x += 3;
    },

    moveLeft: function() {
        this.direction = LEFT;
        this.x -= 3;
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

});

if (typeof exports !== 'undefined') {
    exports.OnlineBlueMagoo = OnlineBlueMagoo;
}
