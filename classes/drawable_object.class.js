class DrawableObject {
x;
y;
w;
h;
img;
imageCache = {};
currentImage = 0;
currentImageDead = 0;
currentImageJump = 0;


  /**
   * function to load an image
   * @param {} path - path of image
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }


  /**
   * function to load more images
   * @param {*} arr - array contains paths of images
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }


  /**
   * function to draw an image
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }


  // drawFrame(ctx) {
  //   if (this instanceof Character || this instanceof Chicken || this instanceof Chick || this instanceof Bottle_air || this instanceof Bottle_ground || this instanceof Coin || this instanceof Endboss || this instanceof ThrowableBottle) {
  //     ctx.beginPath();
  //     ctx.lineWidth = '1';
  //     ctx.strokeStyle= 'blue';
  //     ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.w - this.offset.left - this.offset.right, this.h - this.offset.top -this.offset.bottom);
  //     ctx.stroke();
  //   }
  // }
}