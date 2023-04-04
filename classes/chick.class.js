class Chick extends MovableObject{
  y = 390;
  w = 40;
  h = 40;
  img = 'img/3_enemies_chicken/chicken_small/1_walk/1_w.png';
  images_walking= [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
  ];
  images_dead = [
    'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_small/2_dead/dead2.png',
    'img/3_enemies_chicken/chicken_small/2_dead/dead3.png',
    'img/3_enemies_chicken/chicken_small/2_dead/dead4.png',
    'img/3_enemies_chicken/chicken_small/2_dead/dead5.png',
    'img/3_enemies_chicken/chicken_small/2_dead/dead6.png'
  ];
  lifePoints = 100;
  offset = {top: 5, bottom: 5, left: 5, right: 5};
  audio_chick = new Audio ('audio/chicks.mp3');
  audio_chick_hurt = new Audio ('audio/chicken_hurt.mp3');
  chick_hurt = 0;

  
  constructor () {
    super().loadImage(this.img);
    this.loadImages(this.images_walking);
    this.loadImages(this.images_dead);
    this.x = 500 + Math.random()*3000;
    this.speed = 0.3 + Math.random() * 0.7;
    this.animate();
  }


  /**
   * function to animate a chick
   */
  animate() {
    setInterval(() =>{
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000/60);  
    setInterval( () => {
      if (!this.isDead()) {
        this.reactWalk();
      } else if (this.isDead()) {
        this.reactDead();
      }
    }, 120);
  }


  /**
   * function to play animations when a chick is walking
   */
  reactWalk() {
    this.playAnimation(this.images_walking);
  }


  /**
   * function to play animations and sounds when a chick is dead
   */
  reactDead() {
    this.playAnimationDead(this.images_dead);
    this.checkPlaySound();
  }


  /**
   * function to play sounds when a chick is dying
   */
  checkPlaySound() {
    if (this.chick_hurt == 0) {
      this.audio_chick_hurt.volume = 0.5;
      this.audio_chick_hurt.play();
      this.audio_chick.volume = 0.5;
      this.audio_chick.play();
      this.chick_hurt = 1;
      }
    }
  }