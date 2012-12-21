"use strict";

var DeadEnemy = Sprite.extend({
    init: function (x, y) {
        this.x = x;
        this.y = y;

        this.originalY = y;

        this.currentImage = 'deadEnemyRight';
        this.timer = 0;
        this.parabolaTimer = 0;
    },

    update: function(args) {
        this.timer++;

        this.parabolaTimer += 2;
        this.y = this.originalY - Math.round(-0.005 * Math.pow(this.parabolaTimer - 200, 2) + 200);
        this.x += 2;

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
