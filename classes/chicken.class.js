class Chicken extends MovableObject{
  y = 355;
  w = 70;
  h = 70;
  img = 'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png';
  images_walking= [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ];
  images_dead = [
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/dead2.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/dead3.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/dead4.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/dead5.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/dead6.png'
  ];
  offset = {top: 5, bottom: 5, left: 5, right: 5};
  lifePoints = 100;
  audio_chicken = new Audio ('audio/chicken1.mp3');
  audio_chicken_hurt = new Audio ('audio/chicken_hurt.mp3');
  chicken_hurt = 0;

  
  constructor () {
    super().loadImage(this.img);
    this.loadImages(this.images_walking);
    this.loadImages(this.images_dead);
    this.x = 500 + Math.random()*3000;
    this.speed = 0.3 + Math.random() * 0.7;
    this.animate();
  }


  /**
   * function to animate a chicken
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
   * function to play animations when a chicken is walking
   */
  reactWalk() {
    this.playAnimation(this.images_walking);
  }


  /**
   * function to play animations and sounds when a chicken is dead
   */
  reactDead() {
    this.playAnimationDead(this.images_dead);
    this.checkPlaySound();
  }


  /**
   * function to play sounds when a chicken is dying
   */
  checkPlaySound() {
    if (this.chicken_hurt == 0) {
      this.audio_chicken_hurt.volume = 0.5;
      this.audio_chicken_hurt.play();
      this.audio_chicken.play();
      this.chicken_hurt = 1;
    }
  }
}