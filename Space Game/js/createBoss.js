function boss1(levelNum) {
    let c = new CircleBoss(30, 50, 10, 20, 50 * levelNum, 0xFFFF00);
    c.x = Math.random() * (sceneWidth - 50) + 25;
    c.y = Math.random() * (sceneHeight - 400) + 25;
    circles.push(c);
    gameScene.addChild(c)

    shoot = setInterval(() => {

        let bf = new BossBullet(10, 0xFFFFFF, c.x, c.y)
        bossBullets.push(bf);
        gameScene.addChild(bf)

        if (!c.isAlive) {
            clearInterval(shoot);
        }
    }, 1000);

}

function boss2() {
    let c = new CircleBoss(20, 50, 10, 30, 300, 0xFFFF00);
    c.x = Math.random() * (sceneWidth - 50) + 25;
    c.y = Math.random() * (sceneHeight - 400) + 25;
    circles.push(c);
    gameScene.addChild(c)

    shoot = setInterval(() => {

        let bf = new BossBullet(10, 0xFFFFFF, c.x, c.y)
        bossBullets.push(bf);
        gameScene.addChild(bf)

        if (!c.isAlive) {
            clearInterval(shoot);
        }
    }, 800);

}