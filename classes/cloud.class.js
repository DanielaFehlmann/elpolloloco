class Cloud extends MovableObject {

  constructor () { //sobald cloud erstellt wird, wird constructor funktion aufgerufen
    super().loadImage('img/5_background/layers/4_clouds/1.png');
    this.x = Math.random() * 7000;
    this.y = Math.random() * 50;
    this.w = 600 + Math.random() * 100;
    this.h = 320 + Math.random() * 100;
    this.speed = 0.3;
    this.animate();
  }


  /**
   * function to animate the clouds
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000/60);
  }
}