"use strict";

describe("Player", function () {
    var player, args;
    
    beforeEach(function () {
        player = new Player(100, 100);
        var onscreenSprites = new OnscreenSprites({player: player});
        args = {onscreenSprites: onscreenSprites, collisionDetector: new CollisionDetector()};
    });

    it("should have a location", function () {
        expect(player.x).toBe(100);
        expect(player.y).toBe(100);
    });

    it("can move right", sinon.test(function () {
        this.stub(player.control, 'isHoldingRight').returns(true);
        player.update(args);
        expect(player.x).toBeGreaterThan(100);
    }));

    it("can move left", sinon.test(function () {
        this.stub(player.control, 'isHoldingLeft').returns(true);
        player.update(args);
        expect(player.x).toBeLessThan(100);
    }));

    it("should fall when nothing is under it", function () {
        player.update(args);
        expect(player.y).toBeGreaterThan(100);
    });

    it("should land on a floor after a jump", sinon.test(function () {
        var i;
        args.onscreenSprites.walls = [new Wall(95, player.bottomSide())];

        this.stub(player.control, 'isJumping').returns(true);
        player.update(args);

        player.control.isJumping.restore();
        this.stub(player.control, 'isJumping').returns(false);

        for (i = 0; i < 100; i++) {
            player.update(args);
        }
        expect(player.y).toBe(100);
    }));

    it("can jump", sinon.test(function () {
        this.stub(player.control, 'isJumping').returns(true);

        player.update(args);
        expect(player.y).toBe(96);

        player.update(args);
        expect(player.y).toBe(92);

        for (var i = 0; i < 50; i++) {
            player.update(args);
        }
        
        expect(player.y).toBe(11);
    }));

    it("cannot jump twice", sinon.test(function () {
        this.stub(player.control, 'isShooting').returns(true);

        for (var i = 0; i < 44; i++) {
            player.update(args);
        }

        var oldY = player.y;
        player.update(args);
        expect(player.y).toBeGreaterThan(oldY);
    }));

    it("changes to shooting animation", sinon.test(function () {
        this.stub(player.control, 'isShooting').returns(true);
        var spy = this.spy(player.playerAnimations, 'shoot');
        player.update(args);
        expect(spy.calledOnce).toBeTruthy();
    }));

    it("should be able to shoot bubbles", sinon.test(function () {
        this.stub(player.control, 'isShooting').returns(true);

        player.update(args);
        expect(args.onscreenSprites.bubbles.length).toBe(1);
    }));

    it("should be able to shoot one bubble every once in a while", sinon.test(function () {
        this.stub(player.control, 'isShooting').returns(true);

        player.update(args);
        player.update(args);
        expect(args.onscreenSprites.bubbles.length).toBe(1);

        for (var i = 0; i < 34; i++) {
            player.update(args);
        }

        expect(args.onscreenSprites.bubbles.length).toBe(2);
    }));

    it("dies if it contacts an enemy", function () {
        args.onscreenSprites.enemies = [new BlueMagoo(100, 100, RIGHT)];
        player.update(args);
        expect(player.isDead()).toBeTruthy();
    });

    it("can pop a bubble", sinon.test(function () {
        args.onscreenSprites.bubbles.push(new Bubble(100, player.y - 10, RIGHT));
        args.onscreenSprites.bubbles[0].fullyFormed = true;

        var spy = this.spy(args.onscreenSprites.bubbles[0], 'pop');
        this.stub(player.control, 'isJumping').returns(true);

        player.update(args);
        expect(spy.calledWith(args.onscreenSprites, RIGHT)).toBeTruthy();
    }));

    it("can pop a bubble and send it to the left", sinon.test(function () {
        args.onscreenSprites.bubbles.push(new Bubble(100, player.y - 10, RIGHT));
        args.onscreenSprites.bubbles[0].x -= args.onscreenSprites.bubbles[0].width() / 2;
        args.onscreenSprites.bubbles[0].fullyFormed = true;

        var spy = this.spy(args.onscreenSprites.bubbles[0], 'pop');
        this.stub(player.control, 'isJumping').returns(true);

        player.update(args);
        expect(spy.calledWith(args.onscreenSprites, LEFT)).toBeTruthy();
    }));

    it("can pop a bubble by falling on it", sinon.test(function () {
        args.onscreenSprites.bubbles.push(new Bubble(100, player.bottomSide() + 1, RIGHT));
        args.onscreenSprites.bubbles[0].fullyFormed = true;

        var spy = this.spy(args.onscreenSprites.bubbles[0], 'pop');

        player.update(args);
        expect(spy.calledWith(args.onscreenSprites, RIGHT)).toBeTruthy();
    }));

    it("starts the death animation", sinon.test(function () {
        var spy = this.spy(player.playerAnimations, 'die');
        args.onscreenSprites.enemies = [new BlueMagoo(100, 100, RIGHT)];
        player.update(args);
        expect(player.isDead()).toBeTruthy();
        expect(spy.calledOnce).toBeTruthy();
    }));

    it("comes back from the dead after some time", function () {
        player.x = 200;
        var magoo = new BlueMagoo(200, 100, RIGHT);
        args.onscreenSprites.enemies.push(magoo);
        player.update(args);
        args.onscreenSprites.enemies.remove(magoo);
        
        for (var i=0; i < 80; i++) {
            player.update(args);
        }
        expect(player.isDead()).toBeFalsy();
        expect(player.x).toBe(100);
        expect(player.isInvincible()).toBeTruthy();
    });

    it("when invincible cannot be hit by enemies", function () {
        player.invincible = true;
        args.onscreenSprites.enemies.push(new BlueMagoo(100, 100, RIGHT));

        player.update(args);
        expect(player.isDead()).toBeFalsy();
    });

    it("invinciblity wears off", function () {
        player.invincible = true;
        for (var i=0; i < 200; i++) {
            player.update(args);
        }
        expect(player.isInvincible()).toBeFalsy();
    });

    it("should blink if invincible", function () {
        player.invincible = true;
        for (var i=0; i < 200; i++) {
            player.update(args);
        }
        expect(player.isInvincible()).toBeFalsy();
    });

    it("should be able to collect collectibles", function () {
        args.onscreenSprites.collectibles.push(new Pepper(100, 100));
        player.update(args);
        expect(args.onscreenSprites.collectibles.length).toBe(0);
        expect(player.score).toBe(3000);
    });

});
