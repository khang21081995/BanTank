class Bullet{
  // constructor(x,y){
  //   this.sprite = TankOnline.game.add.sprite(x, y, 'bulletDown');
  //   TankOnline.game.physics.arcade.enable(this.sprite);
  // }

  constructor(tank){
    this.sprite = TankOnline.game.add.sprite(tank.sprite.x,tank.sprite.y, 'bulletDown');
    TankOnline.game.physics.arcade.enable(this.sprite);
  }

  update(direction){
    if(direction == 0){
      this.sprite.body.velocity.x = -500;
      this.sprite.loadTexture('bulletLeft');
    }else
    if (direction ==1){
      this.sprite.body.velocity.x = 500;
      this.sprite.loadTexture('bulletRight');
    }else
    if(direction == 2){
      this.sprite.body.velocity.y = -500;
      this.sprite.loadTexture('bulletUp');
    }else
    if (direction ==3 || direction == -1){
      this.sprite.body.velocity.y = 500;
      this.sprite.loadTexture('bulletDown');
    }

    //this.sprite.destroy();

  }
}
