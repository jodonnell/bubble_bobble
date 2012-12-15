"use strict";

describe("CollisionDetector", function () {
    var enemies, bub, collisionDetector;

    beforeEach(function () {
        bub = new Player(100, 100);
        enemies = [new BlueMagoo(370, 20, LEFT)];
        collisionDetector = new CollisionDetector({bub: bub, enemies: enemies});
    });

    it("should be able to stand on an object", function () {
        collisionDetector.walls = [new Wall(100, collisionDetector.bub.y + collisionDetector.bub.height())];
        expect(collisionDetector.isBubStandingOnFloor()).toBeTruthy();
    });

    it("should fall at the right boundary", function () {
        collisionDetector.walls = [new Wall(100 + collisionDetector.bub.width() + 1, collisionDetector.bub.y + collisionDetector.bub.height())];
        expect(collisionDetector.isBubStandingOnFloor()).toBeFalsy();
    });

});
