class StatusBarCoin extends StatusBar {
  statusBarImages = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
  ];
  percentage = 0;


  constructor() {
    super();
    this.loadImages(this.statusBarImages);
    this.setPercentage(0);
    this.y = 45;
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
