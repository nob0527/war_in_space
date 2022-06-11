const app = new PIXI.Application({
    width: 1200,
    height: 900
});
document.body.appendChild(app.view);

// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

// pre-load the images
app.loader.
add([
    "images/spaceship.png",
    "images/explosions.png",
    "images/enemy.png",
    "images/level.png",
    "images/level1.png",
    "images/s.png",
    "images/h.png",
    "images/d.png",
    "images/shield.png",
]);
app.loader.onProgress.add(e => { console.log(`progress=${e.progress}`) });
app.loader.onComplete.add(setup);
app.loader.load();

// aliases
let stage;

// game variables
let startScene;
let background, gameScene, ship, shield, scoreLabel, lifeLabel, shootSound, hitSound, fireballSound, bestScoreLabel;
let recodScene, input, recordLabel;
let gameOverScene;

let circles = [];
let bullets = [];
let bossBullets = [];
let bosses = [];
let aliens = [];
let explosions = [];
let sBuffs = [];
let hBuffs = [];
let dBuffs = [];
let records = [];

let explosionTextures;
let best = 0;
let score = 0;

let levelNum = 0;
let paused = true;
let shoot;

function setup() {
    stage = app.stage;
    // #1 - Create the `start` scene
    startScene = new PIXI.Container();
    stage.addChild(startScene);



    // #2 - Create the main `game` scene and make it invisible
    gameScene = new PIXI.Container();
    gameScene.visible = false;
    stage.addChild(gameScene)



    recodScene = new PIXI.Container();
    recodScene.visible = false;
    stage.addChild(recodScene)

    // #3 - Create the `gameOver` scene and make it invisible
    gameOverScene = new PIXI.Container();
    gameOverScene.visible = false;
    stage.addChild(gameOverScene)

    // #4 - Create labels for all 3 scenes
    createLeabelsAndButtons();

    // #5 - Create ship
    ship = new player(app.loader.resources["images/spaceship.png"].texture, 1, 100, 600, 800)
    gameScene.addChild(ship);

    shield = new Shield(app.loader.resources["images/shield.png"].texture, ship.x, ship.y, 3);
    shield.visible = false;
    gameScene.addChild(shield)

    // #6 - Load Sounds
    shootSound = new Howl({
        src: ['sounds/shoot.wav']
    })

    hitSound = new Howl({
        src: ['sounds/hit.mp3']
    })

    fireballSound = new Howl({
        src: ['sounds/fireball.mp3']
    })

    // #7 - Load sprite sheet
    explosionTextures = loadSpriteSheet();

    // #8 - Start update loop
    app.ticker.add(gameLoop);

    // #9 - Start listening for click events on the canvas
    app.view.onclick = fireBullet;




}


function startGame() {
    startScene.visible = false;
    gameOverScene.visible = false;
    gameScene.visible = true;
    levelNum = 1;
    score = 0;

    increaseScoreBy(0);
    decrealseLifeBy(0);
    increaseBestScore(0)
    ship.x = 600;
    ship.y = 800;
    loadLevel();
}


function gameLoop() {
    // if (paused) return; // keep this commented out for now
    // #1 - Calculate "delta time"
    let dt = 1 / app.ticker.FPS;
    if (dt > 1 / 12) dt = 1 / 12;

    // #2 - Move Ship
    let mousePosition = app.renderer.plugins.interaction.mouse.global;
    //ship.position = mousePosition;

    let amt = 6 * dt;

    let newX = lerp(ship.x, mousePosition.x, amt);
    let newY = lerp(ship.y, mousePosition.y, amt);

    let w2 = ship.width / 2;
    let h2 = ship.height / 2;
    ship.x = clamp(newX, 0 + w2, sceneWidth - w2);
    ship.y = clamp(newY, 0 + h2, sceneHeight - h2)

    let nX = lerp(shield.x, mousePosition.x, amt);
    let nY = lerp(shield.y, mousePosition.y, amt);

    shield.x = clamp(nX, 0 + w2, sceneWidth - w2);
    shield.y = clamp(nY, 0 + h2, sceneHeight - h2)


    // #3 - Move Circles

    for (let c of circles) {
        if (c.isAlive && rectsIntersect(c, ship)) {
            hitSound.play();
            gameScene.removeChild(c);
            c.isAlive = false;
            decrealseLifeBy(c.damage);
        }
    }

    for (let c of circles) {
        c.move(dt);
        if (c.x <= c.radius || c.x >= sceneWidth - c.radius) {
            c.reflectX(sceneWidth);
            // c.move(dt);
        }
        if (c.y <= c.radius || c.y >= sceneHeight - c.radius) {
            c.reflectY();
            //c.move(dt)
        }
    }


    // #4 - Move Bullets
    for (let b of bullets) {
        b.move(dt);
    }


    // enemy muve bullets
    for (let b of bossBullets) {
        b.move(dt);
    }


    // #5 - Check for Collisions

    Collisions()

    // #6 - Now do some clean up
    // dead bullets
    bullets = bullets.filter(b => b.isAlive);
    // dead boss bullets
    bossBullets = bossBullets.filter(bf => bf.isAlive);
    // dead enemy
    circles = circles.filter(c => c.isAlive);
    //get rid of explosions
    explosions = explosions.filter(e => e.playing);

    // #7 - Load next level
    if (circles.length == 0) {
        levelNum++;
        ship.level = levelNum;
        loadLevel();
        nextPage.text = `Page:  ${levelNum}`
    }


    // #8 - Is game over?
    if (ship.life <= 0) {
        levelNum = 0;
        best += score;

        end();
        return;
    }



}