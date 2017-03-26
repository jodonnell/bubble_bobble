class OnlineGame {
    constructor() {
        var socket = io.connect('http://192.168.0.105:3000');

        socket.on('gameStarted', function(data){
            if (data.playerNum == 1) {
                var bub = new Player(200, 100, 'bub', new InputControl(socket));
                var bob = new Player(600, 100, 'bob', new NetworkedControl(socket));
            }
            else {
                var bub = new Player(200, 100, 'bub', new NetworkedControl(socket));
                var bob = new Player(600, 100, 'bob', new InputControl(socket));
            }

            var enemies = [new OnlineBlueMagoo(1, 370, 20, LEFT), new OnlineBlueMagoo(2, 370, 70, LEFT), new OnlineBlueMagoo(3, 370, 120, LEFT)];

            var gameController = new GameController(gameInit, [bub, bob], enemies);

            var oldPositions = {bub: {x: 200, y: 100}, bob: {x: 600, y: 100}};

            socket.on('updatedPositions', (data) => {

                oldPositions = data;

                gameController.onscreenSprites.players[0].x = data.bub.x;
                gameController.onscreenSprites.players[0].y = data.bub.y;

                gameController.onscreenSprites.players[1].x = data.bob.x;
                gameController.onscreenSprites.players[1].y = data.bob.y;


                for (var i = 0; i < data.enemies.length; i++) {
                    for (var j = 0; j < gameController.onscreenSprites.enemies.length; j++) {
                        if (gameController.onscreenSprites.enemies[j].id === data.enemies[i].id) {
                            gameController.onscreenSprites.enemies[j].addCoords({x: data.enemies[i].x, y:data.enemies[i].y});
                        }
                    }
                }
            });

            SceneCreator.create(gameController);
        });
    }
}
