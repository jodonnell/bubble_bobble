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
        onlineBlueMagoo.addCoords({x: 110, y: 100});
        onlineBlueMagoo.update({});
        expect(onlineBlueMagoo.x).toBe(104);
        expect(onlineBlueMagoo.y).toBe(100);
    });

    it("should animate when moving to the right", function () {
        onlineBlueMagoo.addCoords({x: 200, y: 100});
        onlineBlueMagoo.update({});
        expect(onlineBlueMagoo.getCurrentImage()).toBe('blueMagooWalkRight')
        expect(onlineBlueMagoo.y).toBe(100);
    });

    it("should jump and move to the right", function () {
        onlineBlueMagoo.addCoords({x: 110, y: 0});
        onlineBlueMagoo.update({});
        expect(onlineBlueMagoo.x).toBe(104);
        expect(onlineBlueMagoo.y).toBe(96);
    });

    it("should throw out old coords", function () {
        onlineBlueMagoo.addCoords({x: 103, y: 100});
        onlineBlueMagoo.addCoords({x: 96, y: 0});
        onlineBlueMagoo.update({});
        expect(onlineBlueMagoo.x).toBe(96);
    });

    it("can move a partial amount", function () {
        onlineBlueMagoo.addCoords({x: 98, y: 100});
        onlineBlueMagoo.update({});
        expect(onlineBlueMagoo.x).toBe(98);
    });

    it("can move a partial amount falling", function () {
        onlineBlueMagoo.addCoords({x: 100, y: 102});
        onlineBlueMagoo.update({});
        expect(onlineBlueMagoo.y).toBe(102);
    });

    it("can move a partial amount jumping", function () {
        onlineBlueMagoo.addCoords({x: 100, y: 97});
        onlineBlueMagoo.update({});
        expect(onlineBlueMagoo.y).toBe(97);
    });

    it("should fall", function () {
        onlineBlueMagoo.addCoords({x: 100, y: 200});
        onlineBlueMagoo.update({});
        expect(onlineBlueMagoo.y).toBe(104);
    });

    it("should snap to position if the difference is large", function () {
        onlineBlueMagoo.addCoords({x: 300, y: 100});
        onlineBlueMagoo.update({});
        expect(onlineBlueMagoo.x).toBe(300);
    });

    it("should snap to left position if the difference is large", function () {
        onlineBlueMagoo.addCoords({x: 0, y: 100});
        onlineBlueMagoo.update({});
        expect(onlineBlueMagoo.x).toBe(0);

    });


});
