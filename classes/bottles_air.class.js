class Bottle_air extends MovableObject {
  w = 100;
  h = 100;
  image_bottle_air = 'img/6_salsa_bottle/salsa_bottle.png';
  offset = {top: 10,bottom: 10,left: 35,right: 35}
  

  constructor() {
    super().loadImage(this.image_bottle_air);
    this.y = 20 + Math.random()*100;
    this.x = 400 + Math.random()*3100;
  }
}