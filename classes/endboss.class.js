class Endboss extends MovableObject{
  y = -40; 
  w = 435;
  h = 500;
  img = 'img/4_enemie_boss_chicken/2_alert/G5.png';
  images_aggro = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png'
  ];
  images_walking = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png'
  ];
  images_hurt = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png'
  ];
  images_dead = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png'
  ];
lifePoints = 100;
offset = {top: 100, bottom: 30, left: 70, right: 3};
audio_chicken = new Audio('audio/big_chicken.mp3');
audio_chicken_hurt = new Audio('audio/chicken_hurt.mp3');
world;
lastHit;


  constructor () {
    super().loadImage(this.img);
    this.loadImages(this.images_aggro);
    this.loadImages(this.images_walking);
    this.loadImages(this.images_hurt);
    this.loadImages(this.images_dead);
    this.x = 719*4;
    this.speed = 15;
    this.animate();
  }


  animate() {
    setInterval( () => {
      if (this.isDead()) {
       this.gameIsOver();
      } else if (this.gotHurt()) {
        this.reactHurt();
      } else if (this.distanceLeftSmall() || this.distanceRightSmall()) {
        this.playAnimation(this.images_walking);
      } else if ((!this.distanceLeftSmall()) || (!this.distanceRightSmall())) {
        this.playAnimation(this.images_aggro);
      }
    }, 120);
    this.checkDistance();
  }


  gameIsOver() {
    this.playAnimationDead(this.images_dead);
    wonGame();
  }


  gotHit() {
    this.lastHit = new Date().getTime();
  }


  gotHurt() {
    let timepassed =  new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.8;
  }


  reactHurt() {
    this.playAnimation(this.images_hurt);
    this.audio_chicken_hurt.play();
  }


  distanceLeftSmall() {
    return this.x - this.world.character.x < 700 && this.x - this.world.character.x  > 30 ;
  }


  playSound() {
    audio_bg.volume = 0;
    audio_bg2.volume = 1;
    this.audio_chicken.volume = 0.3;
    this.audio_chicken.play();
  }


  distanceRightSmall() {
    return this.x - this.world.character.x > -700 && this.x - this.world.character.x < -300;
  }


  checkDistance() {
    setInterval(() => {
      if (this.distanceLeftSmall() && (!this.isDead())) {
        this.moveLeft();
        this.mirrorImage = false;
        this.playSound();
      } else if (this.distanceRightSmall() && (!this.isDead())) {
        this.moveRight();
        this.mirrorImage = true;
      }
    }, 100);
  }
}