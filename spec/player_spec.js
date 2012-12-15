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

    it("can move right", function () {
        player.moveRight();
        expect(player.x).toBeGreaterThan(100);
    });

    it("can move left", function () {
        player.moveLeft();
        expect(player.x).toBeLessThan(100);
    });

    it("can jump", sinon.test(function () {
        var collisionDetector = new CollisionDetector({bub: player});

        var control = new Control();
        this.stub(control, 'isJumping').returns(true);

        player.update({control: control, collisionDetector: collisionDetector});
        expect(player.y).toBe(96);

        player.update({control: control, collisionDetector: collisionDetector});
        expect(player.y).toBe(92);

        for (var i = 0; i < 50; i++) {
            player.update({control: control, collisionDetector: collisionDetector});
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
        player.shoot();
        expect(spy.calledOnce).toBeTruthy();
    }));

});
