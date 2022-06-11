function createCircles(numCircles) {
    for (let i = 0; i < numCircles; i++) {
        let c = new Circle(10, 5, 10, 2, 0xFFFF00);
        c.x = Math.random() * (sceneWidth - 50) + 25;
        c.y = Math.random() * (sceneHeight - 400) + 25;
        circles.push(c);
        gameScene.addChild(c)
    }

    for (let i = 0; i < numCircles / 4; i++) {
        let c = new WrappingCircle(10, 5, 10, 1, 0x00FF00);
        c.speed = Math.random() * 100 + 100;
        if (Math.random() < .5) {
            c.x = Math.random() * (sceneWidth - 50) + 25;
            c.y = Math.random() * 100 + c.radius * 2;
            c.fwd = { x: 0, y: 1 }
        } else {
            c.x = Math.random() * 25 + c.radius * 2;
            c.y = Math.random() * (sceneHeight - 80) - c.radius * 2;
            c.fwd = { x: 1, y: 0 };
        }
        circles.push(c);
        gameScene.addChild(c);
    }
}

function createCircles2(numCircles) {
    for (let i = 0; i < numCircles; i++) {
        let c = new Circle2(10, 5, 10, 3, 0xFFFF00);
        c.x = Math.random() * (sceneWidth - 50) + 25;
        c.y = Math.random() * (sceneHeight - 400) + 25;
        circles.push(c);
        gameScene.addChild(c)
    }

    for (let i = 0; i < numCircles / 4; i++) {
        let c = new WrappingCircle(10, 5, 10, 1, 0x00FF00);
        c.speed = Math.random() * 100 + 100;
        if (Math.random() < .5) {
            c.x = Math.random() * (sceneWidth - 50) + 25;
            c.y = Math.random() * 100 + c.radius * 2;
            c.fwd = { x: 0, y: 1 }
        } else {
            c.x = Math.random() * 25 + c.radius * 2;
            c.y = Math.random() * (sceneHeight - 80) - c.radius * 2;
            c.fwd = { x: 1, y: 0 };
        }
        circles.push(c);
        gameScene.addChild(c);
    }

    for (let i = 0; i < numCircles; i++) {
        let c = new SeekingCircle(5, 5, 10, 1, 0xFFFF00);
        c.x = Math.random() * (sceneWidth - 50) + 25;
        c.y = Math.random() * (sceneHeight - 400) + 25;
        c.speed = 60;
        c.activate(ship);
        circles.push(c);
        gameScene.addChild(c)
    }

}




function createEnemy() {
    let count = 5;
    for (let i = 0; i < count; i++) {
        let c = new Enemies(app.loader.resources["images/enemy.png"].texture, 30, 30, 3, 60);
        c.x = Math.random() * (sceneWidth - 50) + 25;
        c.y = Math.random() * (sceneHeight - 400) + 25;

        if (Math.random() < 5) {
            c.x = Math.random() * (sceneWidth - 150) + 25;
            c.y = Math.random() * 100 * 2;
            c.fwd = { x: 0, y: 1 }
        } else {
            c.x = Math.random() * 25 * 2;
            c.y = Math.random() * (sceneHeight - 180) - c.radius * 2;
            c.fwd = { x: 1, y: 0 };
        }

        circles.push(c);
        gameScene.addChild(c)
    }
}