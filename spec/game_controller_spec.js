describe("GameController", function() {
    var gameController;
    var gameInit;

    beforeEach(function() {
        gameInit = new GameInit(true);
        gameController = new GameController(gameInit);
    });

    afterEach(function() {
        gameInit.destroyCanvas();
    });

    it("should be able to move right", sinon.test(function() {
        gameController.bub.x = 100;
        this.stub(gameController.control, 'isHoldingRight').returns(true);
        gameController.update();
        expect(gameController.bub.x).toBeGreaterThan(100);
    }));

    it("should be able to move left", sinon.test(function() {
        gameController.bub.x = 100;
        this.stub(gameController.control, 'isHoldingLeft').returns(true);
        gameController.update();
        expect(gameController.bub.x).toBeLessThan(100);
    }));

    it("should fall when nothing is under it", function() {
        gameController.update();
        expect(gameController.bub.y).toBeGreaterThan(100);
    });

    it("should land on a platform while falling", function() {
        for (var i = 0; i < 100; i++)
            gameController.update();
        expect(gameController.bub.y).toBe(160);
    });

    it("should fall at the left boundary", function() {
        gameController.bub.x = 100;
        gameController.walls.push(new Wall(100 + gameController.bub.width() , gameController.bub.y + gameController.bub.height()))
        gameController.update();
        expect(gameController.bub.y).toBe(100);

        gameController.bub.x -= 1;
        gameController.update();
        expect(gameController.bub.y).toBeGreaterThan(100);
    });

    it("should fall at the right boundary", function() {
        gameController.bub.x = 100;
        gameController.walls.push(new Wall(100 - gameController.bub.width() + 3 , gameController.bub.y + gameController.bub.height()))
        gameController.update();
        expect(gameController.bub.y).toBe(100);

        gameController.bub.x += 1;
        gameController.update();
        expect(gameController.bub.y).toBeGreaterThan(100);
    });

    it("should be able to jump", sinon.test(function() {
        for (var i = 0; i < 100; i++)
            gameController.update();
        expect(gameController.bub.y).toBe(160);

        this.stub(gameController.control, 'isJumping').returns(true);
        for (var i = 0; i < 100; i++)
            gameController.update();
        expect(gameController.bub.y).toBeLessThan(160);

    }));

    it("should be able to shoot bubbles", sinon.test(function() {
        this.stub(gameController.control, 'isShooting').returns(true);
        expect(gameController.bubbles.length).toBe(0);
        gameController.update();
        expect(gameController.bubbles.length).toBe(1);
    }));

    it("should be able to shoot one bubble every once in a while", sinon.test(function() {
        this.stub(gameController.control, 'isShooting').returns(true);

        expect(gameController.bubbles.length).toBe(0);

        gameController.update();
        gameController.update();
        expect(gameController.bubbles.length).toBe(1);

        for (var i = 0; i < 34; i++)
            gameController.update();
        expect(gameController.bubbles.length).toBe(2);
    }));

    it("removes bubbles after they are offscreen", function() {
        gameController.bubbles = [new Bubble(0, 0)];
        for (var i = 0; i < 34; i++)
            gameController.update();

        expect(gameController.bubbles.length).toBe(0);
    });

    it("cannot run through left wall", sinon.test(function() {
        gameController.bub.x = 47;
        this.stub(gameController.control, 'isHoldingLeft').returns(true);
        gameController.update();
        expect(gameController.bub.x).toBe(46);
    }));

    it("cannot run through right wall", sinon.test(function() {
        gameController.bub.x = 753;
        this.stub(gameController.control, 'isHoldingRight').returns(true);
        gameController.update();
        expect(gameController.bub.x).toBe(754 - gameController.bub.width());
    }));

    it("should have 3 enemies", sinon.test(function() {
        expect(gameController.enemies.length).toBe(3);
    }));

    it("enemies fall", sinon.test(function() {
        expect(gameController.enemies[0].y).toBe(20);
        gameController.update();
        expect(gameController.enemies[0].y).toBe(23);
    }));

    it("can have enemies land on platforms", function() {
        var blueMagoo = new BlueMagoo(0, 0, 0);
        gameController.enemies = [blueMagoo];
        
        
        gameController.walls = [new Wall(0, blueMagoo.bottomSide() + 3)];
        gameController.update();
        gameController.update();
        expect(blueMagoo.y).toBe(3);
    });

});
