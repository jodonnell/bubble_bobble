"use strict";

class SceneCreator {
    static create(controller) {
        (function animationLoop(){
            stats.begin();

            var cancelId = requestAnimFrame(animationLoop);
            controller.update(cancelId);
            controller.draw();

            stats.end();
        })();
    }
}
