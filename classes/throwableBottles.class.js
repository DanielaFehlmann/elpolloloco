class ThrowableBottle extends MovableObject {
  w = 100;
  h = 100;
  img = 'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png';
  images_throw = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
  ];
  images_splash = [
  'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
  'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
  'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
  'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
  'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
  'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  'img/6_salsa_bottle/bottle_rotation/bottle_splash/7_bottle_splash.png'
  ];
  lifePoints = 100;
  offset = {top: 30, bottom: 30, left: 30, right: 30}
  audio_bottle_splash = new Audio ('audio/bottle_splash2.mp3');
  audio_bottle_throw = new Audio ('audio/bottle_throw.mp3');
  bottle_throw = 0;
  speedY = 0;
  speedX = 0;


  constructor (x,y, mirror) {
    super().loadImage(this.img);;
    this.loadImages(this.images_throw);
    this.loadImages(this.images_splash);
    this.x = x;
    this.y = y;
    this.throw(mirror);
  }


  throw(mirror) {
    this.speedY = 25;
    this.applyGravity();
    setInterval(() => {
      if (this.y < 340 && !this.isDead()) {
        this.bottleThrow(mirror);
      }
      if (this.isDead()) {
        this.bottleSplash();
      }
    }, 25);
  }


  bottleThrow(mirror) {
    if (mirror == 0) {
      this.x += 10;
      } else {
        this.x -= 10;
      }
      this.playAnimation(this.images_throw);
    this.playSoundThrow();
  }


  playSoundThrow() {
    if (this.bottle_throw == 0) {
      this.audio_bottle_throw.volume = 0.7;
      this.audio_bottle_throw.play();
      this.bottle_throw = 1;
    }
  }


  bottleSplash() {
    this.playAnimationDead(this.images_splash);
    this.playSoundSplash();
  }


  playSoundSplash() {
    if (this.bottle_throw == 1) {
      this.audio_bottle_splash.play();
      this.bottle_throw = 2;
      } 
  }
}