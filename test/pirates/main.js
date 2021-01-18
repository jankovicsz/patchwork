import Pirate from './Pirate.js';
import Captain from './Captain.js';
import Ship from './Ship.js';

const feco = new Pirate('Fecó');

feco.drinkSomeRum();
feco.drinkSomeRum();
feco.drinkSomeRum();

const enemy = new Pirate('Ellenség');
console.log(feco.brawl(enemy));
console.log(feco);
console.log(enemy);

console.log(new Captain('Jack Sparrow'));

console.log(new Ship('Perl').fillShip());
