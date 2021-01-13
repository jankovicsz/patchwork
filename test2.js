const person = {
    name: 'Bözsi',
    age: 18,
    idNumber: '111111AA'
};

const personValues = Object.values(person);
const personKeys = Object.keys(person);
const idNumberValueIndex = personValues.indexOf('111111AA');
const idNumberKey = personKeys[idNumberValueIndex];

console.log( personValues, personKeys );
console.log( idNumberValueIndex, idNumberKey );

const personValues2 = Object.values(person2);
const personKeys2 = Object.keys(person2);
const idNumberValueIndexArray2 = personValues2.map((elem, index) => elem === '222222AA' ? index : null).filter(elem => elem !== null);
// const idNumberKey2 = personKeys2[idNumberValueIndex];

console.log( personValues2, personKeys2 );
console.log( idNumberValueIndexArray2.map(elem => personKeys2[elem]) );