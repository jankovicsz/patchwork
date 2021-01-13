'use strict';
// Hozz létre dinamikusan* egy kétdimenziós tömböt!
// Tartalma az alábbi mátrix** legyen.
// Használj ciklust hozzá!

//   0 0 0 1
//   0 0 1 0
//   0 1 0 0
//   1 0 0 0

// Logold ki a mátrixot a konzolra.
//
// * a mérete egy változóból érkezzen, így téve dinamikussá a mátrix létrehozását
// ** ne ijedj meg a kifejezéstől, egy mátrix: tömbök a tömbben

const number = 4;
let numberCount = number;
const arr1 = [];
const arr2 = [];
for (let i = 0, j = 1; i < number; i++, j++) {
    if (j === numberCount) {
        arr1.push(1);
        arr2.push(arr1);
    } else {
        arr1.push(0);
        arr2.push(arr1);
    }
}
console.log(arr1);
console.log('-------------------\n')
console.log(arr2);

console.log('-------------------\n')

/*let numberCount = number;
let arr1 = [];
let arr2 = [];
for (let i = 0; i < number; i++) {
    for (let j = 0; j < number; j++) {
   // if (j === numberCount) {
       arr2[j] = arr1.push(1);
  //      arr2.push(arr1);
   // } else {
   //     arr1.push(0);
 //       arr2.push(arr1);
  //  }
}
}
console.log(arr1);
console.log('-------------------\n')
console.log(arr2);
*/