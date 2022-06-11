function end() {
    paused = true;

    circles.forEach(c => gameScene.removeChild(c));
    circles = [];

    bullets.forEach(b => gameScene.removeChild(b));
    bullets = [];

    bossBullets.forEach(bf => gameScene.removeChild(bf));
    bossBullets = [];

    sBuffs.forEach(s => gameScene.removeChild(s));
    sBuffs = [];

    hBuffs.forEach(h => gameScene.removeChild(h));
    hBuffs = [];

    dBuffs.forEach(d => gameScene.removeChild(d));
    dBuffs = [];

    explosions.forEach(e => gameScene.removeChild(e));
    explosions = [];

    gameOverScene.visible = true;
    gameScene.visible = false


}



function fireBullet(e) {
    if (paused) return;

    let b = new Bullet(0xFFFFFF, ship.x, ship.y)
    bullets.push(b);
    gameScene.addChild(b)
    shootSound.play();
}


function fireBullet2(e) {
    if (paused) return;
    let count = 3;
    for (let i = 0; i < count; i++) {
        let b2 = new Bullet(0xFFFFFF, ship.x + i * 10, ship.y)

        bullets.push(b2);
        gameScene.addChild(b2)
        shootSound.play();
    }
}


function loadSpriteSheet() {
    let spriteSheet = PIXI.BaseTexture.from("images/explosions.png");
    let width = 64;
    let height = 64;
    let numFrames = 16;
    let textures = [];

    for (let i = 0; i < numFrames; i++) {
        let frame = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(i * width, 64, width, height));
        textures.push(frame)
    }
    return textures
}


function createExplosion(x, y, frameWidth, frameHeight) {
    let w2 = frameWidth / 2;
    let h2 = frameHeight / 2;
    let expl = new PIXI.AnimatedSprite(explosionTextures);
    expl.x = x - w2;
    expl.y = y - h2;
    expl.animationSpeed = 1 / 7;
    expl.loop = false;
    expl.onComplete = e => gameScene.removeChild(expl);
    explosions.push(expl);
    gameScene.addChild(expl)
    expl.play();
}