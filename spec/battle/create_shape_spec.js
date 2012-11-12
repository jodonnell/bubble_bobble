describe("CreateShape", function() {
    var createShape;

    beforeEach(function() {
        createShape = new CreateShape();
    });

    it("random shape should work alright", function() {
        sinon.stub(Math, "random").returns(0.5);
        expect(createShape._randomShape().color).toEqual("orange");
        sinon.stub(Math.random.restore());
    });
    
    it("should be able to create an o", function() {
        expect(createShape.o().color).toEqual("blue");
    });

    it("should be able to create an j", function() {
        expect(createShape.j().color).toEqual("red");
    });

});
