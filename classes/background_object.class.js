class BackgroundObject extends MovableObject{
  y = 0;
  w = 720;
  h = 480;
  
  
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
  }
}