class MovableObject extends DrawableObject{
  speed;
  speedY = 0;
  acceleration = 3;
  offset = {top: 0, bottom: 0,left: 0,right: 0};
  lastHit = 0;
  bottleHit = false;


  /**
   * function to move left
   */
  moveLeft() {
    this.x -= this.speed;
  }


  /**
   * function to move right
   */
  moveRight() {
    this.x += this.speed;
  }


  /**
   * function to play animations
   * @param {} images - array contains paths of images
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


  /**
   * function to play animations of death
   * @param {*} images - array contains paths of images
   */
  playAnimationDead(images) {
    let path = images[this.currentImageDead];
    this.img = this.imageCache[path];
    if (this.currentImageDead < images.length -1) {
      this.currentImageDead++;
    }
  }


  playAnimationJump(images) {
    let path = images[this.currentImageJump];
    this.img = this.imageCache[path];
    if (this.currentImageJump < images.length -1) {
      this.currentImageJump++;
    }
  }


  applyGravity() {
    setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
          this.y -= this.speedY;
          this.speedY -= this.acceleration;
        if (this instanceof Character && (this.y > 135)) {
          this.y = 135;
        }
        if ((this instanceof MovableObject) && (this.y > 340)) {
          this.y = 340;
        }
        if (!this.isAboveGround()) {
          this.speedY = 0;
        }
      }
    },1000/25)
  }


  isAboveGround() {
    if (this instanceof ThrowableBottle) {
      return true;
    } else {
      return this.y <135
    }
  }


  jump() {
    this.speedY = 35 ; 
  }


  isColliding (obj) {
    return this.x + this.w - this.offset.right > obj.x + obj.offset.left &&
      this.y + this.h - this.offset.bottom > obj.y + obj.offset.top &&
      this.x + this.offset.left < obj.x + obj.w - obj.offset.right &&
      this.y + this.offset.top < obj.y + obj.h - obj.offset.bottom;
  }

  
  isHit (enemy) {
  if (enemy.constructor.name == 'Chicken') {
    this.lifePoints -= 4;
  } else if (enemy.constructor.name == 'Chick') {
    this.lifePoints -= 2;
  } else if (enemy.constructor.name == 'Endboss') {
    this.lifePoints -= 10;
  }
  if (this.lifePoints < 0) {
    this.lifePoints = 0;
  }
    this.lastHit = new Date().getTime();
  }


  isHurt () {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  
  isDead () {
   return this.lifePoints <= 0;
  }
}
