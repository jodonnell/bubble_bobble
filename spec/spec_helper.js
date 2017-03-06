"use strict";

window.gameImages = new BrowserImages();

beforeEach(function() {
    window.gameInit = new GameInit(true);
    window.gameContext = $('#gameCanvas').get(0).getContext("2d");
})

afterEach(function() {
    $('#gameCanvas').remove();
})
