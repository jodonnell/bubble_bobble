"use strict";

describe("CollisionDetector", function () {
    var enemies, player, collisionDetector;

    beforeEach(function () {
        player = new Player(100, 100);
        enemies = [new BlueMagoo(370, 20, LEFT)];
        collisionDetector = new CollisionDetector({player: player, enemies: enemies});
    });

    it("should be able to stand on an object", function () {
        var walls = [new Wall(100, collisionDetector.player.y + collisionDetector.player.height())];
        expect(collisionDetector.isStandingOnObjects(player, walls)).toBeTruthy();
    });

    it("should fall at the right boundary", function () {
        var walls = [new Wall(100 + collisionDetector.player.width() + 1, collisionDetector.player.y + collisionDetector.player.height())];
        expect(collisionDetector.isStandingOnObjects(player, walls)).toBeFalsy();
    });

    it("should fall at the left boundary", function () {
        var walls = [new Wall(0, collisionDetector.player.y + collisionDetector.player.height())];
        walls[0].x = 100 - walls[0].width() - 1;
        expect(collisionDetector.isStandingOnObjects(player, walls)).toBeFalsy();
    });

    it("cannot run through left wall", sinon.test(function () {
        player.x = 45;
        expect(collisionDetector.noWallToLeft(player)).toBeFalsy();
        expect(player.x).toBe(46);
    }));

    it("cannot run through right wall", sinon.test(function () {
        player.x = 753;
        expect(collisionDetector.noWallToRight(player)).toBeFalsy();
        expect(player.x).toBe(754 - player.width());
    }));

    it("should land on a platform and move the player to make sure there are no missing pixels", function () {
        var walls = [new Wall(100, collisionDetector.player.y + collisionDetector.player.height() - 2)];
        expect(collisionDetector.player.y).toBe(100);
        expect(collisionDetector.isStandingOnObjects(player, walls)).toBeTruthy();
        expect(collisionDetector.player.y).toBe(98);
        
    });

});
