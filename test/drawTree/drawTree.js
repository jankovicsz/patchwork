'use strict';

// Készíts egy drawTree függvényt, amely egy fát rajzol ki a console-ra:
// egyetlen szám paramétert vár, ami az eredmény sorainak számát fogja tartalmazni
// a bemeneti paraméter értéke 4 vagy annál nagyobb. Ha nem teljesül, akkor dobjon hibát.
// annyi sort irat ki, mint amennyi a bemeneti paratméterben lett megadva
// A drawTree.js fájlba dolgozz. Figyelj a bemeneti paraméter validálására is (dobj hibát)!

let num = -4;

function drawTree(num) {
  if (typeof num !== 'number' || num < 4 || Math.sign(num === -1)) {
    throw new Error(
      'The parameter must be a positive integer and the number must be greater than 4!'
    );
  }
  const space = ' ';
  const star = '*';
  const starTrunk = 1;
  const spaceTrunk = num - 2;
  let spaceCount = num - 2;
  for (let i = 1, j = 1; i < num; i++, j += 2) {
    console.log(
      `${space.repeat(spaceCount)}${star.repeat(j)}${space.repeat(spaceCount)}`
    );
    spaceCount--;
  }
  console.log(
    `${space.repeat(spaceTrunk)}${star.repeat(starTrunk)}${space.repeat(
      spaceTrunk
    )}`
  );
}

//drawTree(num);

try {
  drawTree(10);
} catch (error) {
  console.error(error.message);
}
