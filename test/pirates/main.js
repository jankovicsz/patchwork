import Pirate from './Pirate.js';

const feco = new Pirate('Fecó');

feco.drinkSomeRum();
feco.drinkSomeRum();
feco.drinkSomeRum();

const enemy = new Pirate('Ellenség');
console.log(feco.brawl(enemy));
console.log(feco);
console.log(enemy);
