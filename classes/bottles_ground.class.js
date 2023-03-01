class Bottle_ground extends MovableObject {
  w = 100;
  h = 100;
  images_bottle_ground=[
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
  ];
  random = Math.floor(Math.random()*2);
  offset = {top: 20,bottom: 10,left: 35, right: 20};
  
  
  constructor() {
    super().loadImage(this.images_bottle_ground[this.random]);
    this.y = 330;
    this.x =400 + Math.random()*3100;
  }
}