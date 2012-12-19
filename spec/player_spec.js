"use strict";

describe("Player", function () {
    var player;
    
    beforeEach(function () {
        player = new Player(100, 100);
    });

    it("should have a location", function () {
        expect(player.x).toBe(100);
        expect(player.y).toBe(100);
    });

    it("can move right", sinon.test(function () {
        this.stub(player.control, 'isHoldingRight').returns(true);
        player.respondToControls(new CollisionDetector({}));
        expect(player.x).toBeGreaterThan(100);
    }));

    it("can move left", sinon.test(function () {
        this.stub(player.control, 'isHoldingLeft').returns(true);
        player.respondToControls(new CollisionDetector({}));
        expect(player.x).toBeLessThan(100);
    }));

    it("should fall when nothing is under it", function () {
        player.update({onscreenSprites: new OnscreenSprites({player: player}), collisionDetector: new CollisionDetector({})});
        expect(player.y).toBeGreaterThan(100);
    });

    it("should land on a floor after a jump", sinon.test(function () {
        var i;
        var collisionDetector = new CollisionDetector({player: player, walls: [new Wall(95, player.bottomSide())]});
        var onscreenSprites = new OnscreenSprites({player: player, walls: collisionDetector.walls});

        this.stub(player.control, 'isJumping').returns(true);
        player.update({onscreenSprites: onscreenSprites, collisionDetector: collisionDetector});

        player.control.isJumping.restore();
        this.stub(player.control, 'isJumping').returns(false);

        for (i = 0; i < 100; i++) {
            player.update({onscreenSprites: onscreenSprites, collisionDetector: collisionDetector});
        }
        expect(player.y).toBe(100);
    }));

    it("can jump", sinon.test(function () {
        var collisionDetector = new CollisionDetector({player: player});
        var onscreenSprites = new OnscreenSprites({player: player});

        this.stub(player.control, 'isJumping').returns(true);

        player.update({collisionDetector: collisionDetector, onscreenSprites: onscreenSprites});
        expect(player.y).toBe(96);

        player.update({collisionDetector: collisionDetector, onscreenSprites: onscreenSprites});
        expect(player.y).toBe(92);

        for (var i = 0; i < 50; i++) {
            player.update({ collisionDetector: collisionDetector, onscreenSprites: onscreenSprites});
        }
        
        expect(player.y).toBe(11);
    }));

    // it("cannot jump twice", function () {
    //     player.jump();

    //     for (var i = 0; i < 44; i++) {
    //         player.jump();
    //         player.update(player.falling);
    //     }

    //     var oldY = player.y;
    //     player.update(player.falling);
    //     expect(player.y).toBeGreaterThan(oldY);
    // });

    it("changes to shooting animation", sinon.test(function () {
        var spy = this.spy(player.playerAnimations, 'shoot');
        player.shoot({bubbles: []});
        expect(spy.calledOnce).toBeTruthy();
    }));

    it("should be able to shoot bubbles", sinon.test(function () {
        var onscreenSprites = new OnscreenSprites({});
        this.stub(player.control, 'isShooting').returns(true);

        player.update({onscreenSprites: onscreenSprites, collisionDetector: (new CollisionDetector({}))});
        expect(onscreenSprites.bubbles.length).toBe(1);
    }));

    it("should be able to shoot one bubble every once in a while", sinon.test(function () {
        var onscreenSprites = new OnscreenSprites({});
        this.stub(player.control, 'isShooting').returns(true);

        var args = {onscreenSprites: onscreenSprites, collisionDetector: (new CollisionDetector({}))};

        player.update(args);
        player.update(args);
        expect(onscreenSprites.bubbles.length).toBe(1);

        for (var i = 0; i < 34; i++) {
            player.update(args);
        }

        expect(onscreenSprites.bubbles.length).toBe(2);
    }));

    it("dies if it contacts an enemy", function () {
        var onscreenSprites = new OnscreenSprites({enemies: [new BlueMagoo(100, 100, 0)]});
        var args = {onscreenSprites: onscreenSprites, collisionDetector: (new CollisionDetector({player: player, enemies: onscreenSprites.enemies}))};
        player.update(args);
        expect(player.isDead()).toBeTruthy();
    });
});
