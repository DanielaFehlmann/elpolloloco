class Level {
  chickens;
  chicks;
  clouds;
  backgroundObjects;
  coins;
  bottles_ground;
  bottles_air;
  level_end_x = 719*5;


    constructor(chickens, chicks, clouds, backgroundObjects, coins, bottles_ground, bottles_air) { //wird aufgerufen, sobald das level erstellt wird
    this.chickens = chickens;
    this.chicks = chicks;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles_ground = bottles_ground;
    this.bottles_air = bottles_air;
  }
}