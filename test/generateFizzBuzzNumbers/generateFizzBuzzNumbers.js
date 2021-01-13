'use strict';

// Készíts egy generateFizzBuzzNumbers() függvényt,
// ami visszaadja 1-től számolva a 3-mal vagy 5-tel osztható számot a paraméterben megadott számig (inclusive):

// Egyetlen pozitív egész szám paramétert vár
// egy szám (integer) listával tér vissza, ami tartalmazza
// 1-től a 3-mal vagy 5-tel osztható számokat a függvény paraméteréig megadott számig
// Ha nem talált egyetlen ilyen számot se, akkor üres listával tér vissza.
// A generateFizzBuzzNumbers.js fájlba dolgozz. Figyelj a bemeneti paraméter validálására is (dobj hibát)!

let num = 20;
function generateFizzBuzzNumbers(num) {
  if (typeof num !== 'number' || num < 1) {
    throw new Error('The parameter must be a positive integer!');
  }
  const numArray = [];
  for (let i = 1; i <= num; i++) {
    if (i % 3 === 0 || i % 5 === 0) numArray.push(i);
  }
  return numArray;
}
try {
  console.log(generateFizzBuzzNumbers(2));
} catch (error) {
  console.error(error.message);
}
