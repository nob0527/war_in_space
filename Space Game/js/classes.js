class player extends PIXI.Sprite {
    constructor(texture, level, life, blur, x = 0, y = 0, ) {
        super(texture)
        this.anchor.set(.5, .5);
        this.scale.set(0.1)
        this.x = x;
        this.y = y;
        this.level = level;
        this.blur = blur;
        this.life = life;
    }
}

class Shield extends PIXI.Sprite {
    constructor(texture, x = 0, y = 0, life) {
        super(texture)
        this.anchor.set(.5, .5);
        this.scale.set(0.1);

        this.x = x;
        this.y = y;
        this.life = life;
        this.isAlive = false;
    }
}

class Circle extends PIXI.Graphics {
    constructor(radius, point, damage, hp, color = 0xFF0000, x = 0, y = 0) {
        super();
        this.beginFill(color);
        this.drawCircle(0, 0, radius);
        this.endFill();
        this.radius = radius;
        this.point = point;
        this.damage = damage;
        this.hp = hp;
        this.x = x;
        this.y = y;


        this.fwd = getRandomUnitVector();
        this.speed = 80;
        this.isAlive = true;
    }

    move(dt = 1 / 60) {
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
    }

    reflectX() {
        this.fwd.x *= -1;
    }

    reflectY() {
        this.fwd.y *= -1;
    }
}

class CircleBoss extends PIXI.Graphics {
    constructor(radius, point, damage, hp, speed, color = 0xFF0000, x = 0, y = 0) {
        super();
        this.beginFill(color);
        this.drawCircle(0, 0, radius);
        this.endFill();
        this.radius = radius;
        this.point = point;
        this.damage = damage;
        this.hp = hp;
        this.x = x;
        this.y = y;


        this.fwd = getRandomUnitVector();
        this.speed = speed;
        this.isAlive = true;
    }

    move(dt = 1 / 60) {
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
    }

    reflectX() {
        this.fwd.x *= -1;
    }

    reflectY() {
        this.fwd.y *= -1;
    }
}

class Circle2 extends PIXI.Graphics {
    constructor(radius, point, damage, hp, color = 0xFF0000, x = 0, y = 0) {
        super();
        this.beginFill(color);
        this.drawCircle(0, 0, radius);
        this.endFill();
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.radius = radius;
        this.point = point;
        this.damage = damage;
        // variables
        this.fwd = getRandomUnitVector();
        this.speed = 70;
        this.isAlive = true;
    }

    // abstract method - declared, but no implementation
    activate() {

    }

    // public methods to be called from main.js
    move(dt = 1 / 60) {
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
    }

    reflectX(sceneWidth) {
        this.fwd.x *= -1;
    }

    reflectY(sceneHeight) {
        this.fwd.y *= -1;
    }

    // protected methods
    _wrapX(sceneWidth) {
        if (this.fwd.x < 0 && this.x < 0 - this.radius) {
            this.x = sceneWidth + this.radius;
        }
        if (this.fwd.x > 0 && this.x > sceneWidth + this.radius) {
            this.x = 0 - this.radius;
        }
    }

    _wrapY(sceneHeight) {
        if (this.fwd.y < 0 && this.y < 0 - this.radius) {
            this.y = sceneHeight + this.radius;
        }
        if (this.fwd.y > 0 && this.y > sceneHeight + this.radius) {
            this.y = 0 - this.radius;
        }
    }
}

class Enemies extends PIXI.Sprite {
    constructor(texture, point, damage, hp, speed, x = 0, y = 0) {
        super(texture)
        this.point = point;
        this.damage = damage;
        this.hp = hp;
        this.speed = speed;
        this.x = x;
        this.y = y;

        this.fwd = getRandomUnitVector();
        this.isAlive = true;
    }
    move(dt = 1 / 60) {
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
    }

    reflectX(sceneWidth) {
        this.fwd.x *= -1;
    }

    reflectY(sceneHeight) {
        this.fwd.y *= -1;
    }
}

class WrappingCircle extends Circle {
    constructor(radius, point, damage, hp, color = 0xFF0000, x = 0, y = 0) {
        super();
        this.beginFill(color);
        this.drawCircle(0, 0, radius);
        this.endFill();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.point = point;
        this.damage = damage;
        this.hp = hp;
        // variables
        this.fwd = getRandomUnitVector();
        this.speed = 80;
        this.isAlive = true;
    }

    _wrapX(sceneWidth) {
        if (this.fwd.x < 0 && this.x < 0 - this.radius) {
            this.x = sceneWidth + this.radius;
        }
        if (this.fwd.x > 0 && this.x > sceneWidth + this.radius) {
            this.x = 0 - this.radius;
        }
    }

    _wrapY(sceneHeight) {
        if (this.fwd.y < 0 && this.y < 0 - this.radius) {
            this.y = sceneHeight + this.radius;
        }
        if (this.fwd.y > 0 && this.y > sceneHeight + this.radius) {
            this.y = 0 - this.radius;
        }
    }
}

class SeekingCircle extends Circle {
    constructor(radius, point, damage, hp, color = 0xFF0000, x = 0, y = 0) {
        super();
        this.beginFill(color);
        this.drawCircle(0, 0, radius);
        this.endFill();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.point = point;
        this.damage = damage;
        this.hp = hp;
        // variables
        this.fwd = getRandomUnitVector();
        this.speed = 60;
        this.isAlive = true;
    }

    activate(target) {
        this.target = target
    }

    move(dt) {
        let t = this.target;
        let amt = 3.0 * dt;
        let newX = cosineInterpolate(this.x, t.x, amt);
        let newY = cosineInterpolate(this.y, t.y, amt);
        this.x = newX;
        this.y = newY;
    }

}

class Bullet extends PIXI.Graphics {
    constructor(color = 0xFFFFF, x = 0, y = 0) {
        super();
        this.beginFill(color);
        this.drawRect(-2, -3, 4, 6);
        this.endFill();


        this.x = x;
        this.y = y;

        this.fwd = { x: 0, y: -1 };
        this.speed = 400;
        this.isAlive = true;
        Object.seal(this);
    }

    move(dt = 1 / 60) {
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
    }

}

class BossBullet extends PIXI.Graphics {
    constructor(damage, color = 0xFFFFF, x = 0, y = 0) {
        super();
        this.beginFill(color);
        this.drawRect(-2, -3, 4, 6);
        this.endFill();

        this.damage = damage;
        this.x = x;
        this.y = y;

        this.fwd = { x: 0, y: +1 };
        this.speed = 400;
        this.isAlive = true;
        Object.seal(this);
    }

    move(dt = 1 / 60) {
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
    }

}



class Buff extends PIXI.Sprite {
    constructor(texture, x = 0, y = 0, ) {
        super(texture)
        this.scale.set(0.4)
        this.x = x;
        this.y = y;
        this.buff = false;
        this.isAlive = true;
    }
}