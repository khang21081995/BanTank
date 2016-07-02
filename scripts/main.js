var TankOnline = {
    map: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
}

window.onload = function() {
    TankOnline.game = new Phaser.Game(window.innerWidth,
        window.innerHeight,
        Phaser.AUTO,
        '', {
            preload: preload,
            create: create,
            update: update
        }
    );
}

var tank, tank2;
var wallGroup, allyGroup, enemyGroup;
var preload = function() {
    TankOnline.game.load.image('tankDown', './images/tank_player1_down_c0_t1_s1.png');
    TankOnline.game.load.image('tankUp', './images/tank_player1_up_c0_t1_s1.png');
    TankOnline.game.load.image('tankLeft', './images/tank_player1_left_c0_t1_s1.png');
    TankOnline.game.load.image('tankRight', './images/tank_player1_right_c0_t1_s1.png');

    TankOnline.game.load.image('tankDown3', './images/tank_power_down_c0_t1.png');
    TankOnline.game.load.image('tankUp3', './images/tank_power_up_c0_t1.png');
    TankOnline.game.load.image('tankLeft3', './images/tank_power_left_c0_t1.png');
    TankOnline.game.load.image('tankRight3', './images/tank_power_right_c0_t1.png');

    TankOnline.game.load.image('tankDown2', './images/tank_armor_down_c1_t1.png');
    TankOnline.game.load.image('tankUp2', './images/tank_armor_up_c1_t1.png');
    TankOnline.game.load.image('tankLeft2', './images/tank_armor_left_c1_t1.png');
    TankOnline.game.load.image('tankRight2', './images/tank_armor_right_c1_t1.png');

    //tank_power_left_c0_t1_f.png
    TankOnline.game.load.image('bulletDown', './images/bullet_down.png');
    TankOnline.game.load.image('bulletUp', './images/bullet_up.png');
    TankOnline.game.load.image('bulletLeft', './images/bullet_left.png');
    TankOnline.game.load.image('bulletRight', './images/bullet_right.png');

    TankOnline.game.load.image('wall', './images/wall_steel.png');
}

var create = function() {
    TankOnline.game.physics.startSystem(Phaser.Physics.ARCADE);
    TankOnline.keyboard = TankOnline.game.input.keyboard;


    wallGroup = TankOnline.game.add.physicsGroup();
    TankOnline.bulletGroup = TankOnline.game.add.physicsGroup();
    enemyGroup = TankOnline.game.add.physicsGroup();
    allyGroup = TankOnline.game.add.physicsGroup();

    tank = new Tank(window.innerWidth / 2, window.innerHeight / 2, allyGroup, 1);
    tank2 = new Tank(window.innerWidth / 2, window.innerHeight / 2 + 100, allyGroup, 2);
    for (var i = 0; i < 10; i++) {
        new Tank(Math.random() * TankOnline.game.world.bounds.width,
            Math.random() * TankOnline.game.world.bounds.height,
            enemyGroup, 3);
    }

    TankOnline.game.world.setBounds(0, 0, 1500, 800);
    TankOnline.game.camera.follow(tank.sprite);

    for (var i = 0; i < TankOnline.map.length; i++) {
        for (var j = 0; j < TankOnline.map[i].length; j++) {
            /*
              0 -> false
              "" -> false
              null -> false
              undefined -> false
              all other -> true
             */
            if (TankOnline.map[i][j]) {
                // Because the wall_steel.png image is 16x16 pixels
                new Wall(j * 16, i * 16, wallGroup);
            }
        }
    }
}

var update = function() {
    TankOnline.game.physics.arcade.collide(tank.sprite, wallGroup);
    TankOnline.game.physics.arcade.collide(tank.sprite, enemyGroup);
    TankOnline.game.physics.arcade.collide(tank.sprite, allyGroup);
    TankOnline.game.physics.arcade.collide(tank2.sprite, wallGroup);
    TankOnline.game.physics.arcade.collide(tank2.sprite, enemyGroup);
    TankOnline.game.physics.arcade.collide(tank2.sprite, allyGroup);
    TankOnline.game.physics.arcade.overlap(TankOnline.bulletGroup, wallGroup, onBulletHitWall, null, this);
    TankOnline.game.physics.arcade.overlap(TankOnline.bulletGroup, enemyGroup, onBulletHitEnemy, null, this);
    TankOnline.game.physics.arcade.overlap(TankOnline.bulletGroup, allyGroup, onBulletHitAlly, null, this);

    var direction = new Phaser.Point();
    if (TankOnline.keyboard.isDown(Phaser.KeyCode.LEFT)) direction.x = -1;
    else if (TankOnline.keyboard.isDown(Phaser.KeyCode.RIGHT)) direction.x = 1;
    else direction.x = 0;

    if (TankOnline.keyboard.isDown(Phaser.KeyCode.UP)) direction.y = -1;
    else if (TankOnline.keyboard.isDown(Phaser.KeyCode.DOWN)) direction.y = 1;
    else direction.y = 0;

    tank.update(direction);

    if (TankOnline.keyboard.isDown(Phaser.KeyCode.SHIFT)) {
        tank.fire();
    }

    var direction2 = new Phaser.Point();
    if (TankOnline.keyboard.isDown(Phaser.KeyCode.A)) direction2.x = -1;
    else if (TankOnline.keyboard.isDown(Phaser.KeyCode.D)) direction2.x = 1;
    else direction2.x = 0;

    if (TankOnline.keyboard.isDown(Phaser.KeyCode.W)) direction2.y = -1;
    else if (TankOnline.keyboard.isDown(Phaser.KeyCode.S)) direction2.y = 1;
    else direction2.y = 0;

    tank2.update(direction2);

    if (TankOnline.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
        tank2.fire();
    }
}

var onBulletHitWall = function(bulletSprite, wallSprite) {
    bulletSprite.kill();
}

var onBulletHitEnemy = function(bulletSprite, enemySprite) {
    enemySprite.damage(bulletSprite.bulletDamage);
    bulletSprite.kill();
}

var onBulletHitAlly = function(bulletSprite, allySprite) {
    if (bulletSprite.typeOfBullet != allySprite.typeOfTank ) {
        allySprite.damage(bulletSprite.bulletDamage);
      //  if(allySprite.health == 0 ) allySprite.destroy();
        bulletSprite.kill();
    }
}
