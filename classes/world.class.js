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


  drawCoinsBottles() {
    this.addObjects(this.level.coins);
    this.addObjects(this.level.bottles_ground);
    this.addObjects(this.level.bottles_air);
    this.addObjects(this.throwableBottles);
  }


  drawBackgrounds() {
    this.addObjects(this.level.backgroundObjects);
    this.addObjects(this.level.clouds);
  }


  drawCreatures() {
    this.addObjects(this.level.chickens);
    this.addObjects(this.level.chicks);
    this.addOneObject(this.endboss);
    this.addOneObject(this.character);
  }
  

  drawStatusBars() {
    this.addOneObject(this.statusBarLife);
    this.addOneObject(this.statusBarBottle);
    this.addOneObject(this.statusBarCoin);
  }


  drawAgain() {
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }


  addObjects(objects){
    objects.forEach(o => {
      this.addOneObject(o);
    });
  }


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


  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.w, 0);
    this.ctx.scale(-1,1);
    mo.x = mo.x*-1;
  }


  flipImageBack(mo) {
    mo.x = mo.x*-1;
    this.ctx.restore();
  }
  

  setWorld() {
    this.character.world = this;
    this.endboss.world = this;
  }


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


  charChickenAlive(enemy) {
  return this.character.lifePoints > 0 && enemy.lifePoints > 0;
  }


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
  

  charEndbossAlive() {
    return this.character.lifePoints > 0 && this.endboss.lifePoints > 0;
  }


  updateStatusBarLifepoints() {
    this.statusBarLife.setPercentage(this.character.lifePoints);
  }


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


  bottleSplash(bottle) {
    bottle.lifePoints = 0;
    bottle.isDead();
  }


  endbossHit() {
    this.endboss.lifePoints -= 20;
    this.endboss.gotHit();
  }


  endbossDead() {
    this.endboss.lifePoints = 0;
    this.endboss.isDead();
  }


  bottleOnGround() {
    return this.throwableBottles[this.throwableBottles.length-1].y == 340;
  }


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


  addCoins() {
    this.character.coins += 10;
    this.audio_coin_collect.play();
  }


  updateStatusBarCoin() {
    this.statusBarCoin.setPercentage(this.character.coins);
  }


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


  addBottles() {
    this.character.bottles += 1;
    this.audio_bottle_collect.play();
  }


  updateStatusBarBottle() {
    this.statusBarBottle.setPercentage(this.character.bottles);
  }
 

  jumpOnChicken() {
    for (let i = 0; i < this.level.chickens.length; i++) {
      let chicken = this.level.chickens[i];
      if (this.character.isColliding(chicken) && this.character.speedY < 0) {
        chicken.lifePoints = 0;
        chicken.isDead();
      }
    }
  }


  jumpOnChick() {
    for (let i = 0; i < this.level.chicks.length; i++) {
      let chick = this.level.chicks[i];
      if (this.character.isColliding(chick) && this.character.speedY < 0) {
        chick.lifePoints = 0;
        chick.isDead();
      }
    }
  }
  

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


  throwBottleToLeft() {
    this.throwableBottles.push(new ThrowableBottle(this.character.x+0, this.character.y+90, 1));
  }


  throwBottleToRight() {
    this.throwableBottles.push(new ThrowableBottle(this.character.x+70, this.character.y+90, 0));
  }
}