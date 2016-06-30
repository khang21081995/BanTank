var TankOnline = {};

window.onload = function(){
  TankOnline.game = new Phaser.Game(window.innerWidth,
                                    window.innerHeight,
                                    Phaser.AUTO,
                                    '',
                                    { preload: preload, create: create, update: update });
}

var tank,bullet;
var preload = function(){
  TankOnline.game.load.image('tankDown', './images/tank_player1_down_c0_t1_s1.png');
  TankOnline.game.load.image('tankUp', './images/tank_player1_up_c0_t1_s1.png');
  TankOnline.game.load.image('tankLeft', './images/tank_player1_left_c0_t1_s1.png');
  TankOnline.game.load.image('tankRight', './images/tank_player1_right_c0_t1_s1.png');
  TankOnline.game.load.image('bulletDown', './images/bullet_down.png');
  TankOnline.game.load.image('bulletUp', './images/bullet_up.png');
  TankOnline.game.load.image('bulletLeft', './images/bullet_left.png');
  TankOnline.game.load.image('bulletRight', './images/bullet_right.png');
}

var create = function(){
  TankOnline.game.physics.startSystem(Phaser.Physics.ARCADE);
  TankOnline.keyboard = TankOnline.game.input.keyboard;

  tank = new Tank(window.innerWidth/2, window.innerHeight/2);

}

var direction=-1;
var update = function(){
  var directionX, directionY;

  if(TankOnline.keyboard.isDown(Phaser.KeyCode.LEFT)){
    directionX = -1;
    direction = 0;
  }
  else if (TankOnline.keyboard.isDown(Phaser.KeyCode.RIGHT)){
    directionX = 1;
    direction = 1;
  }
  else directionX = 0;

  if(TankOnline.keyboard.isDown(Phaser.KeyCode.UP)) {
    directionY = -1;
    direction = 2;
  }
  else if (TankOnline.keyboard.isDown(Phaser.KeyCode.DOWN)) {
    directionY = 1;
    direction = 3;
  }
  else directionY = 0;
  if(TankOnline.keyboard.isDown(Phaser.KeyCode.SPACEBAR)){
    //bullet =  new Bullet(window.innerWidth/2, window.innerHeight/2);
    bullet =  new Bullet(tank);
    bullet.update(direction);
  }
  tank.update(directionX, directionY);






}
