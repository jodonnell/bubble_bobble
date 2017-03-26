import Stats from '../lib/stats';

class SceneCreator {
    static stats() {
        window.stats = new Stats();
        window.stats.setMode(0); // 0: fps, 1: ms

        // Align top-left
        window.stats.domElement.style.position = 'absolute';
        window.stats.domElement.style.right = '0px';
        window.stats.domElement.style.top = '0px';
        window.stats.domElement.style.float = 'right';

        document.body.appendChild( window.stats.domElement );
    }

    static create(controller) {
        (function animationLoop(){
            window.stats.begin();
            var cancelId = window.requestAnimFrame(animationLoop);
            controller.update(cancelId);
            controller.draw();

            window.stats.end();
        })();
    }
}

export default SceneCreator;
