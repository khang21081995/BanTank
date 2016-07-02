class Tank {
    constructor(x, y, group,typeOfTank) {
        if(typeOfTank=== 1){
            this.tankLeft = 'tankLeft';
            this.tankRight = 'tankRight';
            this.tankUp = 'tankUp';
            this.tankDown = 'tankDown';

        }else if(typeOfTank=== 2){
            this.tankLeft = 'tankLeft2';
            this.tankRight = 'tankRight2';
            this.tankUp = 'tankUp2';
            this.tankDown = 'tankDown2';
        }else {
            this.tankLeft = 'tankLeft3';
            this.tankRight = 'tankRight3';
            this.tankUp = 'tankUp3';
            this.tankDown = 'tankDown3';
        }
        this.sprite = group.create(x, y, this.tankDown);
        TankOnline.game.physics.arcade.enable(this.sprite);
        this.sprite.anchor.set(0.5, 0.5);
        this.direction = new Phaser.Point(0, 1);
        this.lastShotTime = TankOnline.game.time.now;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.health = 5;


    }

    update(direction) {
        if (direction.x < 0) {
            this.sprite.body.velocity.x = -250;
            this.sprite.loadTexture(this.tankLeft);
            this.direction = new Phaser.Point(-1, 0);
        } else if (direction.x > 0) {
            this.sprite.body.velocity.x = 250;
            this.sprite.loadTexture(this.tankRight);
            this.direction = new Phaser.Point(1, 0);
        } else {
            this.sprite.body.velocity.x = 0;
        }

        if (direction.y < 0) {
            this.sprite.body.velocity.y = -250;
            this.sprite.loadTexture(this.tankUp);
            this.direction = new Phaser.Point(0, -1);
        } else if (direction.y > 0) {
            this.sprite.body.velocity.y = 250;
            this.sprite.loadTexture(this.tankDown);
            this.direction = new Phaser.Point(0, 1);
        } else {
            this.sprite.body.velocity.y = 0;
        }
    }

    fire() {
        if (TankOnline.game.time.now - this.lastShotTime > 200) {
            this.lastShotTime = TankOnline.game.time.now;
            new Bullet(this,this.typeOfTank);
        }
    }
}
