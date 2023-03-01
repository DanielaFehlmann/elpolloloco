class StatusBarBottle extends StatusBar {
  statusBarImages = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
  ];
  percentage = 0;


  constructor() {
    super();
    this.loadImages(this.statusBarImages);
    this.setPercentage(0);
    this.y = 5;
  }


  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.statusBarImages[this.getCorrectImage()]
    this.img = this.imageCache[path];
  }


  getCorrectImage() {
    if (this.percentage == 10) {
      return 5;
    } else if (this.percentage >= 8) {
      return 4;
    } else if (this.percentage >= 6) {
      return 3;
    } else if (this.percentage >= 4) {
      return 2;
    } else if (this.percentage >= 2) {
      return 1;
    } else {
      return 0;
    }
  }
}