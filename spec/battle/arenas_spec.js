describe("Arenas", function() {
    var arenas;
    var gameInit;

    beforeEach(function() {
        gameInit = new GameInit(true);
        options = new Options(true, [0, 2, 5, 8], 'Bob', 'Sally');
        arenas = new Arenas(10, 20, new Control1(), new Control2(), options);
    });

    afterEach(function() {
        gameInit.destroyCanvas();
    });

    it("should have 2 arenas", function() {
        expect(arenas.playerArena).toBeTruthy();
        expect(arenas.enemyArena).toBeTruthy();
    });

    it("should let you move right", sinon.test(function() {
        var control = new Control1();
        this.stub(control, 'isMovingRight').returns(true);
        arenas = new Arenas(10, 20, control, new Control2(), options);

        arenas.update();
        expect(arenas.playerArena.fallingShape.block.x).toEqual(6);
    }));

    it("should be able to detect a game over", function() {
        arenas.playerArena.gameOver = true;
        arenas.update();
        expect(arenas.gameOver).toBeTruthy();
        expect(arenas.winner).toEqual(2);

        arenas.playerArena.gameOver = false;
        arenas.enemyArena.gameOver = true;
        arenas.update();
        expect(arenas.gameOver).toBeTruthy();
        expect(arenas.winner).toEqual(1);

        arenas.playerArena.gameOver = false;
        arenas.enemyArena.gameOver = false;
        arenas.enemyArena.combatant.hp = 0;
        arenas.update();
        expect(arenas.gameOver).toBeTruthy();
        expect(arenas.winner).toEqual(1);
    });

    it("should be able to do damage", function() {
        arenas.playerArena.damageDone = 2;
        arenas.enemyArena.damageDone = 2;
        arenas.update();
        expect(arenas.enemyArena.combatant.hp).toEqual(28);
        expect(arenas.playerArena.combatant.hp).toEqual(28);
    });

    it("should add junk to the other players arena", function() {
        arenas.playerArena.damageDone = 2;
        arenas.update();
        expect(arenas.enemyArena.blocks.length).toBeGreaterThan(11);
        expect(arenas.enemyArena.blocks.length).toBeLessThan(18);
    });

});
