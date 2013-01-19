"use strict";

describe("OnlineBlueMagoo", function () {
    var onlineBlueMagoo;

    beforeEach(function () {
        onlineBlueMagoo = new OnlineBlueMagoo(1, 100, 100, LEFT);
    });

    it("should do nothing when it has nothing in the queue", function () {
        onlineBlueMagoo.update({});
        expect(onlineBlueMagoo.x).toBe(100);
        expect(onlineBlueMagoo.y).toBe(100);
    });

    it("should move to the right when has right in it's queue", function () {
        onlineBlueMagoo.addCoords({x: 200, y: 100});
        onlineBlueMagoo.update({});
        expect(onlineBlueMagoo.x).toBe(103);
        expect(onlineBlueMagoo.y).toBe(100);
    });

    it("should animate when moving to the right", function () {
        onlineBlueMagoo.addCoords({x: 200, y: 100});
        onlineBlueMagoo.update({});
        expect(onlineBlueMagoo.getCurrentImage()).toBe('blueMagooWalkRight')
        expect(onlineBlueMagoo.y).toBe(100);
    });

    it("should jump and move to the right", function () {
        onlineBlueMagoo.addCoords({x: 200, y: 0});
        onlineBlueMagoo.update({});
        expect(onlineBlueMagoo.x).toBe(103);
        expect(onlineBlueMagoo.y).toBe(97);
    });

    it("should move on to new coords when done with old ones", function () {
        onlineBlueMagoo.addCoords({x: 103, y: 100});
        onlineBlueMagoo.addCoords({x: 97, y: 0});
        onlineBlueMagoo.update({});
        expect(onlineBlueMagoo.x).toBe(103);

        onlineBlueMagoo.update({});
        expect(onlineBlueMagoo.x).toBe(100);
    });

    it("should fall", function () {
        onlineBlueMagoo.addCoords({x: 100, y: 200});
        onlineBlueMagoo.update({});
        expect(onlineBlueMagoo.y).toBe(103);
    });


});
