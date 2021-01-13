export default class Pirate {
  drunkLevel = 0;
  drunkStatus = false;
  alive = true;

  constructor(name) {
    this.name = name;
  }

  // - egy kicsit részegebbé teszi a kalózt
  drinkSomeRum() {
    if (!this.isAlive()) {
      return 'A kaloz halott...';
    } else {
      return this.drunkLevel++;
    }
  }

  //  - meghívásra a kalóz válaszol attól függően, hogy a drinkSomeRun hányszor volt meghívva:
  // 0-4-szer: "Meg egy korsoval!"
  // különben: "♫ Nyaaar van es semmi baaj, ... ♪", a kalóz kidől, és kialussza magát.
  howsItGoingMate() {
    if (!this.isAlive()) {
      return 'A kaloz halott...';
    } else if (this.drunkLevel < 5) {
      return 'Meg egy korsoval!';
    } else {
      this.drunkStatus = true;
      return `♫ Nyaaar van es semmi baaj, ... ♪`;
    }
  }

  isAlive() {
    return this.alive;
  }

  getName() {
    return this.name;
  }

  // ez megöli a kalózt. Ez esetben, DrinkSomeRum, stb. meghívása csak azzal a szöveggel tér vissza,
  // hogy: A kaloz halott..
  die() {
    this.alive = false;
    return 'A kaloz halott...';
  }

  // brawl(otherPirate) a kalóz megküzd egy másik kalózzal (ha a másik életben van) és 1/3 az esélye,
  // hogy az egyik meghal, a másik meghal vagy mindketten kidőlnek.
  brawl(otherPirate) {
    let ownHpNum = Math.ceil(Math.random() * 3);
    let otherHpNum = Math.ceil(Math.random() * 3);
    if (!otherPirate.isAlive()) {
      return `${this.getName()} már halott!`;
    } else {
      if (ownHpNum < otherHpNum) {
        return `${this.name}: ${this.die()}`;
      } else if (ownHpNum === otherHpNum) {
        return `${otherPirate.getName()}: ${otherPirate.die()}\n${this.getName()}: ${this.die()}`;
      } else {
        return `${otherPirate.getName()}: ${otherPirate.die()}\nGyőztem!`;
      }
    }
  }
}
