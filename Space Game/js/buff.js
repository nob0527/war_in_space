function sBuff() {
    s = new Buff(app.loader.resources["images/s.png"].texture, y = Math.random() * (sceneHeight - 400), x = Math.random() * (sceneWidth - 50) + 25);
    sBuffs.push(s)
    gameScene.addChild(s)

};

function hpBuff() {
    s = new Buff(app.loader.resources["images/h.png"].texture, y = Math.random() * (sceneHeight - 400), x = Math.random() * (sceneWidth - 50) + 25);
    hBuffs.push(s)
    gameScene.addChild(s)

};

function dpBuff() {
    d = new Buff(app.loader.resources["images/h.png"].texture, y = Math.random() * (sceneHeight - 400), x = Math.random() * (sceneWidth - 50) + 25);
    dBuffs.push(d)
    gameScene.addChild(d)

};