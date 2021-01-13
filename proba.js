let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
/*
days.forEach(function log(day) {
  console.log(day)
})

// ES6 verzió óta lehetséges az ún. "array function" használata
// az eredmény ugyanaz lesz, mint az előző szintaxissal
days.forEach(day => {
  console.log(day)
});
*/
// amikor a függvénytörzs egy sor, kapcsos zárójel és sortörés nélkül is
// írhatjuk a függvényt
days.forEach(day => console.log(day));

console.log('\n')
console.log('----------------------------------\n');


const colours = ['green', 'black', 'dark-orange', 'light-yellow', 'azure'];
// a 6 karakternél hosszab színekre szűrünk:
const result = colours.filter(szin => szin.length > 6);
console.log(result);
// --> [ 'dark-orange', 'light-yellow' ]

console.log('\n');
console.log('----------------------------------\n');

let numbers = [1, 2, 3, 4, 5];
let doubles = numbers.map(szam => szam * 2);
console.log(doubles);

console.log('\n');
console.log('----------------------------------\n');

const list = [1, 2, 3, 4];
console.log(list.reduce((number, nextNumber) => number + nextNumber));
// --> 15

console.log('\n');
console.log('----------------------------------\n');

console.log(['apple', 'pear', 'melon'].indexOf('pear')); // 1

console.log('\n');
console.log('----------------------------------\n');

const fruits = ['apple', 'pear', 'melon'].forEach((fruit, i) => console.log(fruit, i));