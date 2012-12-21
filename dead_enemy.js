"use strict";

var DeadEnemy = Sprite.extend({
    init: function (x, y) {
        this.x = x;
        this.y = y;

        this.currentImage = 'deadEnemyRight';
        this.timer = 0;
    },

    update: function(args) {
        this.timer++;

        if (this.timer === 3) {
            this.timer = 0;
            if (this.currentImage === 'deadEnemyRight') {
                this.currentImage = 'deadEnemyBottom';
            }
            else if (this.currentImage === 'deadEnemyBottom') {
                this.currentImage = 'deadEnemyLeft';
            }
            else if (this.currentImage === 'deadEnemyLeft') {
                this.currentImage = 'deadEnemyTop';
            }
            else if (this.currentImage === 'deadEnemyTop') {
                this.currentImage = 'deadEnemyRight';
            }

        }


    }
});
