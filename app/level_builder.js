import Wall from './sprites/wall';

class LevelBuilder {
    constructor() {
        this.walls = [];
        this.buildLevel1();
    }

    buildLevel1() {
        this.buildLeftAndRightWalls();
        this.buildCeilingAndFloorWalls();
        this.buildFloatingFloors();
    }

    buildLeftAndRightWalls() {
        for (let i = 0; i < 2; i++) {
            for (let k = 0; k < 70; k++)  {
                if (i === 0) {
                    this.walls.push(new Wall(0, k * 23));
                }
                else {
                    this.walls.push(new Wall(755, k * 23));
                }
            }
        }
    }

    buildCeilingAndFloorWalls() {
        for (let i = 0; i < 18; i++) {
            for (let k = 0; k < 2; k++)  {
                if (k === 0 && (i !== 3 && i !== 4)) {
                    this.walls.push(new Wall(i * 45, 500));
                }
                else {
                    this.walls.push(new Wall(i * 45, 20));
                }
            }
        }
    }

    buildFloatingFloors() {
        for (let i = 1; i < 17; i++) {
            if (i === 2 || i === 3 || i === 14 || i === 15) {
                continue;
            }
            for (let k = 1; k < 14; k++)  {
                this.walls.push(new Wall(i * 45, k * 120 + 30));
            }
        }
    }
}

export default LevelBuilder;
