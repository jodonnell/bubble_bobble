"use strict";

window.gameImages = new BrowserImages();

beforeEach(function() {
    window.gameInit = new GameInit(true);
    window.gameContext = document.getElementById('gameCanvas').getContext("2d");
})

afterEach(function() {
    window.gameInit.destroyCanvas();
})
