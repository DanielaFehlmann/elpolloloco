class Character extends MovableObject{
  x = 100;
  y = 135;
  w = 160;
  h = 300;
  images_walking = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png'
  ];
  images_jumping = [
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png'
  ];
  images_idle = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png'
  ];
  images_idleLong = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png'
  ];
  images_hurt = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png'
  ];
  images_dead = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png'
  ];
  lifePoints = 100;
  offset = {top: 135, bottom: 15, left: 30, right: 50};
  audio_jump = new Audio('audio/jump.mp3');
  audio_hurt = new Audio('audio/hurt.mp3');
  speed = 8;
  world;
  bottles = 0;
  coins = 0;
  time = [];
  timeIdle = 0;
  

  constructor() {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.images_walking);
    this.loadImages(this.images_jumping);
    this.loadImages(this.images_idle);
    this.loadImages(this.images_idleLong);
    this.loadImages(this.images_hurt);
    this.loadImages(this.images_dead);
    this.applyGravity();
    this.animate();
  }


  /**
   * function to animate the character
   */
  animate() {
    setInterval( () => {
      audio_walk.pause();
      this.checkMoveRight();
      this.checkMoveLeft();
      this.checkJump();
      this.world.camera_x = -this.x + 100;
    }, 1000/60);
    setInterval( () => { 
      this.checkMovementOfCharacter();
      this.checkThrowBottle();
    }, 120); 
  }


  /**
   * function to check which animation should be activated
   */
  checkMovementOfCharacter() {
    if (this.isDead()) {
      this.gameIsOver();
    } else if (this.isHurt() && !this.isDead()) {
      this.reactHurt();
    } else if (this.isWalking()) {
      this.reactWalk();
    } else if (this.isAboveGround()) {
      this.reactJump();
    } else if (this.isIdle()) {
      this.reactIdle();
    } else if (this.isIdleLong()){
      this.reactIdleLong();
    }
  }


  /**
   * function to check if the character is moving right
   */
  checkMoveRight() {
    if (this.keyRightPressed()) {
      this.moveRight();
      this.soundWalking();
      this.mirrorImage = false;
    };
  }


  /**
   * @returns - key "arrow right" is pressed & char is not on end of level
   */
  keyRightPressed() {
    return this.world.keyboard.right && this.x<world.level.level_end_x;
  }


  /**
   * function to play a walking sound
   */
  soundWalking() {
    audio_walk.play();
  }


  /**
   * function to check if the character is moving left
   */
  checkMoveLeft() {
    if (this.keyLeftPressed()) {
      this.moveLeft();
      this.soundWalking();
      this.mirrorImage = true;
    };
  }

 /**
   * @returns - key "arrow left" is pressed
   */
  keyLeftPressed() {
    return this.world.keyboard.left && this.x>0;
  }


  /**
   * function to check if the character is jumping
   */
  checkJump() {
    if (this.keySpacePressed()) {
      this.jump();
      this.soundJumping();
    };
  }


  /**
   * @returns - key "space" is pressed
   */
  keySpacePressed() {
    return this.world.keyboard.space && !this.isAboveGround();
  }


  /**
   * function to play a jumping sound
   */
  soundJumping() {
    this.audio_jump.volume = 0.5;
    setTimeout(() => {
      this.audio_jump.play();
    }, 350);
  }


  /**
   * function to end the game
   */
  gameIsOver() {
    this.resetTimeIdle();
    this.playAnimationDead(this.images_dead);
    audio_walk.pause();
    lostGame();
  }


  /**
   * function to play animations when the character is getting hurt
   */
  reactHurt() {
    this.resetTimeIdle();
    this.playAnimation(this.images_hurt);
    this.audio_hurt.play();
  }


  /**
   * function to play animations when the character is walking
   */
  reactWalk() {
    this.resetTimeIdle();
    this.currentImageJump = 0;
    this.playAnimation(this.images_walking);
  }


  /**
   * @returns - key "arrow right" or "arrow left" is pressed and character is not above the ground
   */
  isWalking() {
    return (this.world.keyboard.right || this.world.keyboard.left) && !(this.isAboveGround())
  }


  /**
   * function to play animations when the character is jumping
   */
  reactJump() {
    this.resetTimeIdle();
    this.playAnimationJump(this.images_jumping);
  }


  /**
   * 
   * @returns - no key is pressed and character is not above the ground for max 3 seconds
   */
  isIdle() {
    return !this.isAboveGround() && !this.world.keyboard.left && !this.world.keyboard.right && this.timeIdle < 3;
  }


  /**
   * function to play animations when the character is idle
   */
  reactIdle() {
    this.currentImageJump = 0;
    this.playAnimation(this.images_idle);
    this.time.push(new Date().getTime());
    this.timeIdle = (this.time[this.time.length -1] - this.time[0]) / 1000;
  }


  /**
   * 
   * @returns - no key is pressed and character is not above the ground for more than 3 seconds
   */
  isIdleLong() {
    return !this.isAboveGround() && !this.world.keyboard.left && !this.world.keyboard.right && this.timeIdle >= 3;
  }


  /**
   * function to play animations when the character has been idle for a more than 3 seconds
   */
  reactIdleLong() {
    this.time = [];
    this.currentImageJump = 0;
    this.playAnimation(this.images_idleLong);
  }


  /**
   * function to reset the time of idle when key is pressed
   */
  resetTimeIdle() {
    this.time = [];
    this.timeIdle = 0;
  }


  /**
   * function to check if bottle is throwing
   */
  checkThrowBottle() {
    if (this.world.keyboard.keyD) {
      this.resetTimeIdle();
    }
  }
}