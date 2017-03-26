class Images {
    constructor(callback) {
        this._props = [];
        this._callback = callback;
        this._numImages = 61;

        this.bub();
        this.bob();
        this.bubbles();
        this.enemies();
        this.deadEnemies();
        this.collectibles();
        this.walls();

        this._loadImage('bubRight', 'bub.png');
        //this.bubRight.onload = callback;
    }

    collectibles() {
        this._loadImage('pepper', 'pepper.png');
    }

    deadEnemies() {
        this._loadImage('deadEnemyRight', 'blue_magoo_dead.png');
        this._loadImage('deadEnemyBottom', 'blue_magoo_dead_vertical.png');
        this._loadImage('deadEnemyLeft', 'blue_magoo_dead_left.png');
        this._loadImage('deadEnemyTop', 'blue_magoo_dead_vertical_left.png');
    }

    enemies() {
        this._loadImage('blueMagooWalkLeft', 'blue_magoo_walk_left.png');
        this._loadImage('blueMagooWalkLegLeft', 'blue_magoo_walk_leg_left.png');
        this._loadImage('blueMagooWalkRight', 'blue_magoo_walk.png');
        this._loadImage('blueMagooWalkLegRight', 'blue_magoo_walk_leg.png');
        this._loadImage('blueMagooTrappedRight', 'blue_magoo_trapped.png');
        this._loadImage('blueMagooTrappedLeft', 'blue_magoo_trapped_left.png');
    }

    bubbles() {
        this._loadImage('smallestBubble', 'smallest_bubble.png');
        this._loadImage('smallBubble', 'small_bubble.png');
        this._loadImage('mediumBubble', 'medium_bubble.png');
        this._loadImage('bigBubble', 'big_bubble.png');

        this._loadImage('smallestBobble', 'smallest_bobble.png');
        this._loadImage('smallBobble', 'small_bobble.png');
        this._loadImage('mediumBobble', 'medium_bobble.png');
        this._loadImage('bigBobble', 'big_bobble.png');
    }

    bub() {
        this._loadImage('bubTailRight', 'bub_tail.png');
        this._loadImage('bubTailLeft', 'bub_tail_left.png');
        this._loadImage('bubWalkRight', 'bub_walk.png');
        this._loadImage('bubWalkLeft', 'bub_walk_left.png');
        this._loadImage('bubWalkTailRight', 'bub_walk_tail.png');
        this._loadImage('bubWalkTailLeft', 'bub_walk_tail_left.png');
        this._loadImage('bubJumpRight', 'bub_jump.png');
        this._loadImage('bubJumpTailRight', 'bub_jump_tail.png');
        this._loadImage('bubJumpLeft', 'bub_jump_left.png');
        this._loadImage('bubJumpTailLeft', 'bub_jump_tail_left.png');
        this._loadImage('bubFallRight', 'bub_fall.png');
        this._loadImage('bubFallTailRight', 'bub_fall_tail.png');
        this._loadImage('bubFallLeft', 'bub_fall_left.png');
        this._loadImage('bubFallTailLeft', 'bub_fall_tail_left.png');
        this._loadImage('bubShootLeft', 'bub_shoot_left.png');
        this._loadImage('bubShootRight', 'bub_shoot.png');
        this._loadImage('bubLeft', 'bub_left.png');
        this._loadImage('bubDie', 'bub_die.png');
        this._loadImage('bubDie90', 'bub_die_90.png');
        this._loadImage('bubDie180', 'bub_die_180.png');
        this._loadImage('bubDie270', 'bub_die_270.png');
    }

    bob() {
        this._loadImage('bobRight', 'bob.png');
        this._loadImage('bobTailRight', 'bob_tail.png');
        this._loadImage('bobTailLeft', 'bob_tail_left.png');
        this._loadImage('bobWalkRight', 'bob_walk.png');
        this._loadImage('bobWalkLeft', 'bob_walk_left.png');
        this._loadImage('bobWalkTailRight', 'bob_walk_tail.png');
        this._loadImage('bobWalkTailLeft', 'bob_walk_tail_left.png');
        this._loadImage('bobJumpRight', 'bob_jump.png');
        this._loadImage('bobJumpTailRight', 'bob_jump_tail.png');
        this._loadImage('bobJumpLeft', 'bob_jump_left.png');
        this._loadImage('bobJumpTailLeft', 'bob_jump_tail_left.png');
        this._loadImage('bobFallRight', 'bob_fall.png');
        this._loadImage('bobFallTailRight', 'bob_fall_tail.png');
        this._loadImage('bobFallLeft', 'bob_fall_left.png');
        this._loadImage('bobFallTailLeft', 'bob_fall_tail_left.png');
        this._loadImage('bobShootLeft', 'bob_shoot_left.png');
        this._loadImage('bobShootRight', 'bob_shoot.png');
        this._loadImage('wall', 'wall.png');
        this._loadImage('bobLeft', 'bob_left.png');
        this._loadImage('bobDie', 'bob_die.png');
        this._loadImage('bobDie90', 'bob_die_90.png');
        this._loadImage('bobDie180', 'bob_die_180.png');
        this._loadImage('bobDie270', 'bob_die_270.png');
    }

    walls() {
        this._loadImage('wall', 'wall.png');
    }

    _loadImage() {
    }
}

export default Images;
