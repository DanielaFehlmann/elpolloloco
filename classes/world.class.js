class World {
  character = new Character();
  endboss = new Endboss();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  statusBarLife = new StatusBarLife();
  throwableBottles = [];
  level = level1;
  ctx;
  canvas;
  
  camera_x = 0;
  keyboard;
  audio_bottle_collect = new Audio('audio/bottle_collect.mp3');
  audio_coin_collect = new Audio('audio/coin.mp3');

  
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
    this.checkThrowBottle();
  }


  /**
   * function to draw the canvas
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.translate(this.camera_x, 0);
    this.drawBackgrounds();
    this.drawCoinsBottles();
    this.drawCreatures();
    this.ctx.translate(-this.camera_x, 0);
    this.drawStatusBars();
    this.drawAgain();
  }


  /**
   * function to draw bottles and coins
   */
  drawCoinsBottles() {
    this.addObjects(this.level.coins);
    this.addObjects(this.level.bottles_ground);
    this.addObjects(this.level.bottles_air);
    this.addObjects(this.throwableBottles);
  }


  /**
   * function to draw background objects
   */
  drawBackgrounds() {
    this.addObjects(this.level.backgroundObjects);
    this.addObjects(this.level.clouds);
  }


  /**
   * fucntion to draw chickens, chicks, endboss and character
   */
  drawCreatures() {
    this.addObjects(this.level.chickens);
    this.addObjects(this.level.chicks);
    this.addOneObject(this.endboss);
    this.addOneObject(this.character);
  }
  

  /**
   * function to draw status bars
   */
  drawStatusBars() {
    this.addOneObject(this.statusBarLife);
    this.addOneObject(this.statusBarBottle);
    this.addOneObject(this.statusBarCoin);
  }


  /**
   * function to call the "draw"-function as often as possible
   */
  drawAgain() {
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }


  /**
   * function to add Objects to the canvas
   */
  addObjects(objects){
    objects.forEach(o => {
      this.addOneObject(o);
    });
  }


  /**
   * function to add one object to the canvas
   * @param {} mo - movable object
   */
  addOneObject(mo) {
    if (mo.mirrorImage) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx);
    if (mo.mirrorImage) {
      this.flipImageBack(mo);
    }
  }


  /**
   * function to mirror an object
   * @param {} mo - movable object
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.w, 0);
    this.ctx.scale(-1,1);
    mo.x = mo.x*-1;
  }


  /**
   * fucntion to mirror an object back
   * @param {*} mo - movable object
   */
  flipImageBack(mo) {
    mo.x = mo.x*-1;
    this.ctx.restore();
  }
  

  /**
   * function to transfer the world to the character and to the endboss
   */
  setWorld() {
    this.character.world = this;
    this.endboss.world = this;
  }


  /**
   * function to check if there is a collission between objects
   */
  checkCollisions() {
    setInterval(() => {
      this.hitByEnemy(this.level.chicks);
      this.hitByEnemy(this.level.chickens);
      this.hitByEndboss();
      this.bottleOnEndboss();
      this.collectCoin();
      this.collectBottleGround();
      this.collectBottleAir();
    }, 100);
    setInterval(() => {
      this.jumpOnChicken();
      this.jumpOnChick();
      this.bottleOnChick();
      this.bottleOnChicken();
    }, 1000/60);
  }


  /**
   * function to check if character is hit by an enemy
   * @param {*} enemies - contains all enemies
   */
  hitByEnemy(enemies) {
    enemies.forEach( (enemy) => {
       if (this.character.isColliding(enemy)) {
        if (this.charChickenAlive(enemy)) {
          this.character.isHit(enemy);
        } else if (this.character.lifePoints <= 0) {
          this.character.lifePoints = 0;
          this.character.isDead();
        }
        this.updateStatusBarLifepoints();
      };
    });
  }


  /**
   * @returns - char and chicken are alive
   */
  charChickenAlive(enemy) {
  return this.character.lifePoints > 0 && enemy.lifePoints > 0;
  }


  /**
   * function to check if character is hit by the endboss
   */
  hitByEndboss() {
      if (this.character.isColliding(this.endboss)) {
        if (this.charEndbossAlive()) {
          this.character.isHit(this.endboss);
        } else if (this.character.lifePoints <= 0) {
          this.character.lifePoints = 0;
          this.character.isDead()
        }
        this.updateStatusBarLifepoints();
      };
  }
  

  /**
   * @returns - char and endboss are alive
   */
  charEndbossAlive() {
    return this.character.lifePoints > 0 && this.endboss.lifePoints > 0;
  }


  /**
   * function to update the lifepoints statusbar
   */
  updateStatusBarLifepoints() {
    this.statusBarLife.setPercentage(this.character.lifePoints);
  }


  /**
   * function to check if a bottle is thrown at the endboss
   */
  bottleOnEndboss() {
    this.throwableBottles.forEach ((bottle) => {
      if (bottle.isColliding(this.endboss) && (!bottle.isDead())) {
        this.bottleSplash(bottle);
        if (this.endboss.lifePoints > 0) {
          this.endbossHit();
        }
        if (this.endboss.lifePoints <= 0) {
          this.endbossDead();
        }
      } else if (this.bottleOnGround()) {
        this.bottleSplash(bottle);
      }
    });
  }


  /**
   * function to check if a bottle is thrown at a chicken
   */
  bottleOnChicken() {
    for (let i = 0; i < this.level.chickens.length; i++) {
      let chicken = this.level.chickens[i];
      this.throwableBottles.forEach((bottle) => {
        if (bottle.isColliding(chicken) && (!bottle.isDead())) {
          this.bottleSplash(bottle);
          chicken.lifePoints = 0;
          chicken.isDead();
        }
      });
    }
  }
  

  /**
   * function to check if a bottle is thrown on a chick
   */
  bottleOnChick() {
    for (let i = 0; i < this.level.chicks.length; i++) {
      let chick = this.level.chicks[i];
      this.throwableBottles.forEach((bottle) => {
        if (bottle.isColliding(chick) && (!bottle.isDead())) {
          this.bottleSplash(bottle);
          chick.lifePoints = 0;
          chick.isDead();
        }
      });
    }
  }


  /**
   * function to remove a bottle after splashing
   */
  bottleSplash(bottle) {
    bottle.lifePoints = 0;
    bottle.isDead();
  }


  /**
   * function to decrease the lifepoints of the endboss
   */
  endbossHit() {
    this.endboss.lifePoints -= 20;
    this.endboss.gotHit();
  }


  /**
   * function to decrease the lifepoints of the endboss to 0
   */
  endbossDead() {
    this.endboss.lifePoints = 0;
    this.endboss.isDead();
  }


  /**
   * @returns - bottle is on ground
   */
  bottleOnGround() {
    return this.throwableBottles[this.throwableBottles.length-1].y == 340;
  }


  /**
   * function to collect coins
   */
  collectCoin() {
    for (let i = 0; i < this.level.coins.length; i++) {
      let coin = this.level.coins[i];
      if (this.character.isColliding(coin) && this.character.coins <100) {
        this.addCoins();
        this.level['coins'].splice(i, 1);
      };
      this.updateStatusBarCoin();
    };
  }


  /**
   * function to add the collected coins to the character
   */
  addCoins() {
    this.character.coins += 10;
    this.audio_coin_collect.play();
  }


  /**
   * function to update the coins statusbar
   */
  updateStatusBarCoin() {
    this.statusBarCoin.setPercentage(this.character.coins);
  }


  /**
   * function to collect bottles laying on the ground
   */
  collectBottleGround() {
    for (let i = 0; i < this.level.bottles_ground.length; i++) {
      let bottle = this.level.bottles_ground[i];
      if (this.character.isColliding(bottle) && this.character.bottles < 10) {
        this.addBottles();
        this.level['bottles_ground'].splice(i, 1);
      };
      this.updateStatusBarBottle();
    };
  }


  /**
   * function to collect bottles floating in the air
   */
  collectBottleAir() {
    for (let i = 0; i < this.level.bottles_air.length; i++) {
      let bottle = this.level.bottles_air[i];
      if (this.character.isColliding(bottle) && this.character.bottles < 10) {
        this.addBottles();
        this.level['bottles_air'].splice(i, 1);
      };
      this.updateStatusBarBottle();
    };
  }


  /**
   * function to add the collected bottles to the character
   */
  addBottles() {
    this.character.bottles += 1;
    this.audio_bottle_collect.play();
  }


  /**
   * function to update the bottles statusbar
   */
  updateStatusBarBottle() {
    this.statusBarBottle.setPercentage(this.character.bottles);
  }
 

  /**
   * function to jump on a chicken
   */
  jumpOnChicken() {
    for (let i = 0; i < this.level.chickens.length; i++) {
      let chicken = this.level.chickens[i];
      if (this.character.isColliding(chicken) && this.character.speedY < 0) {
        chicken.lifePoints = 0;
        chicken.isDead();
      }
    }
  }


  /**
   * function to jump on a chick
   */
  jumpOnChick() {
    for (let i = 0; i < this.level.chicks.length; i++) {
      let chick = this.level.chicks[i];
      if (this.character.isColliding(chick) && this.character.speedY < 0) {
        chick.lifePoints = 0;
        chick.isDead();
      }
    }
  }
  

  /**
   * function to check if bottle could be thrown
   */
  checkThrowBottle() {
    setInterval(() => {
      if (this.keyboard.keyD && this.character.bottles > 0 ) {
          if (this.character.mirrorImage) {
            this.throwBottleToLeft();
          } else {
            this.throwBottleToRight();
          }
          this.character.bottles -= 1;
        }
    }, 150);
  }


  /**
   * function to throw a bottle to left
   */
  throwBottleToLeft() {
    this.throwableBottles.push(new ThrowableBottle(this.character.x+0, this.character.y+90, 1));
  }


  /**
   * function to throw a bottle to right
   */
  throwBottleToRight() {
    this.throwableBottles.push(new ThrowableBottle(this.character.x+70, this.character.y+90, 0));
  }
}