import Captain from './Captain.js';
import Pirate from './Pirate.js';

export default class Ship {
  piratesList = [];

  constructor(shipName) {
    this.shipName = shipName;
  }

  addPirates(pirate) {
    piratesList.push(pirate);
  }

  getPirates() {
    return this.piratesList;
  }

  // A fillShip() metódussal tudjuk a hajót megtölteni kalózokkal és a kapitánnyal.
  // Ez megtölti a hajót egy kapitánnyal és véletlen számú kalózzal.
  fillShip() {
    let num = Math.ceil(Math.random() * 9);
    for (let i = 0; i < num; i++) {
      this.piratesList.push(new Pirate(`${i + 1}. Pirate`));
    }
    this.piratesList.push(new Captain(`${this.shipName}'s Captain`));
    return this;
  }

  // A hajók legyenek rendesen reprezentálva a parancssorban, tartalamzzanak információt
  // A kapitányok által megivott rumról, állapotukról (kidőlt, meghalt)
  // A legénység élő kalózainak számáról

}