class Coin extends MovableObject {
  w = 100;
  h = 100;
  offset = {top: 35, bottom: 35, left: 35, right: 35};


  constructor() {
    super().loadImage('img/8_coin/coin_1.png');
    this.y = 340 - Math.random()*300;
    this.x = 400 + Math.random()*3100;
  }
}