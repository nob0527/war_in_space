function loadLevel() {

    paused = false;


    if (levelNum == 1 || levelNum % 2 == 0) {
        createCircles(levelNum * 5);
    }
    if (levelNum % 3 == 0) {
        createCircles2(levelNum * 5);
        dpBuff();
    }
    if (levelNum % 5 == 0) {
        boss1(levelNum);
        hpBuff();
        if (levelNum == 5) {
            sBuff();
        }

    }

}