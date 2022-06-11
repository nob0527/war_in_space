function Collisions() {
    for (let c of circles) {

        // enemy go out the game scene
        if (c.y > sceneHeight) {
            gameScene.removeChild(c);
            c.isAlive = false;
            decrealseLifeBy(c.damage)
        }

        // enemy & bullets
        for (let b of bullets) {
            if (rectsIntersect(c, b)) {

                fireballSound.play();
                createExplosion(c.x, c.y, 64, 64);
                gameScene.removeChild(b);
                b.isAlive = false;
                c.hp -= 1;

                if (c.hp == 0) {
                    gameScene.removeChild(c);
                    c.isAlive = false;

                    increaseScoreBy(c.point)
                    increaseBestScore(c.point)
                }

            }

            if (b.y < -10) b.isAlive = false;
        }


        // buff

        for (let bf of bossBullets) {

            if (rectsIntersect(bf, ship)) {
                createExplosion(ship.x, ship.y, 64, 64);
                gameScene.removeChild(bf);
                bf.isAlive = false;
                decrealseLifeBy(bf.damage)
            }
            if (bf.y > 900) bf.isAlive = false;
        }

        for (let s of sBuffs) {
            if (s.isAlive && rectsIntersect(s, ship)) {

                gameScene.removeChild(s);
                s.isAlive = false;
                app.view.onclick = fireBullet2;

            }
        }

        for (let h of hBuffs) {
            if (h.isAlive && rectsIntersect(h, ship)) {
                ship.life = 100;
                lifeLabel.text = `Life  ${ship.life}`;
                gameScene.removeChild(h);
                h.isAlive = false;
            }
        }


        for (let d of dBuffs) {
            if (d.isAlive && rectsIntersect(d, ship)) {
                shield.isAlive = true;
                shield.visible = true;
                gameScene.removeChild(d);
                d.isAlive = false;
            }
        }


        // enemy & player


        if (shield.isAlive && c.isAlive && rectsIntersect(c, shield)) {
            console.log('valami')
            shield.life -= 1;
            if (shield.life == 0) {
                shield.isAlive = false;
                shield.visible = false;
            }
            hitSound.play();
            gameScene.removeChild(c);
            c.isAlive = false;
        }

        if (c.isAlive && rectsIntersect(c, ship)) {

            decrealseLifeBy(c.damage)
            hitSound.play();
            gameScene.removeChild(c);
            c.isAlive = false;
        }
    }

}