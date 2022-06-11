function createLeabelsAndButtons() {

    let startLabel = new PIXI.Text("War of Space", {
        fill: 0xFFFFFF,
        fontSize: 100,
        fontFamily: "Futura",
        fontStyle: "italic",
        stroke: 0xFF0000,
        strokeThickness: 6,
    })

    startLabel.x = 300;
    startLabel.y = 200;
    startScene.addChild(startLabel)

    let startButton = new PIXI.Text("Start", {
        fill: 0xFF0000,
        fontSize: 50,
    })
    startButton.x = 500;
    startButton.y = 700;
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on("pointerup", startGame)
    startButton.on("pointerover", e => e.target.alpha = 0.7);
    startButton.on("pointerout", e => e.currentTarget.alha = 1.0);
    startScene.addChild(startButton)

    let textStyle = new PIXI.TextStyle({
        fill: 0xFF0000,
        fontSize: 20,
    })

    // score 


    scoreLabel = new PIXI.Text(`Score: ${score}`);
    scoreLabel.style = textStyle;
    scoreLabel.x = 1000;
    scoreLabel.y = 10;
    gameScene.addChild(scoreLabel)


    // life

    lifeLabel = new PIXI.Text();
    lifeLabel.style = textStyle;
    lifeLabel.x = 5;
    lifeLabel.y = 5;
    gameScene.addChild(lifeLabel)


    nextPage = new PIXI.Text(`Page : ${levelNum}`);
    nextPage.style = textStyle;
    nextPage.x = sceneWidth / 2;
    nextPage.y = 10;
    gameScene.addChild(nextPage)


    // gameOver

    let gameOverText = new PIXI.Text(`Game Over!\n `);
    textStyle = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        fontSize: 64,
        fontFamily: "Futura",
        stroke: 0xFF0000,
        strokeThickness: 6
    });
    gameOverText.style = textStyle;
    gameOverText.x = 400;
    gameOverText.y = sceneHeight / 2 - 160;
    gameOverScene.addChild(gameOverText);




    bestScoreLabel = new PIXI.Text(`Your score :  `, {
        fill: 0xFFFFFF,
        fontSize: 30,
        fontFamily: "Futura",
        stroke: 0xFF0000,
        strokeThickness: 6
    })
    bestScoreLabel.x = 450;
    bestScoreLabel.y = 400;
    gameOverScene.addChild(bestScoreLabel)




    // play again
    let playAgainButton = new PIXI.Text("Play Again?", {
        fill: 0xFF0000,
        fontSize: 40,
    });

    playAgainButton.x = 450;
    playAgainButton.y = sceneHeight - 100;
    playAgainButton.interactive = true;
    playAgainButton.buttonMode = true;
    playAgainButton.on("pointerup", startGame); // startGame is a function reference
    playAgainButton.on('pointerover', e => e.target.alpha = 0.7); // concise arrow function with no brackets
    playAgainButton.on('pointerout', e => e.currentTarget.alpha = 1.0); // ditto
    gameOverScene.addChild(playAgainButton);

}




function increaseScoreBy(value) {
    score += value;
    scoreLabel.text = `Score ${score}`;
}

function decrealseLifeBy(value) {
    ship.life -= value;
    ship.life = parseInt(ship.life);
    lifeLabel.text = `Life  ${ship.life}`;
}

function increaseBestScore(value) {
    score += value;
    bestScoreLabel.text = `Best Score : ${score}  point. `
}