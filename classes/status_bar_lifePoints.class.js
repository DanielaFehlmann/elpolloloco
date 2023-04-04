class StatusBarLife extends StatusBar {
  statusBarImages = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
  ];
  percentage = 100;


  constructor() {
    super();
    this.loadImages(this.statusBarImages);
    this.setPercentage(100);
    this.y = 85;
  }


  /**
   * function to fill the status bars
   * @param {number} percentage - percentage of status bar
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.statusBarImages[this.getCorrectImage()]
    this.img = this.imageCache[path];
  }


  /**
   * @returns - number to fill the status bar correctly
   */
  getCorrectImage() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}