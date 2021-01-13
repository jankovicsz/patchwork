'use strict'

let matrixSize = 4;
const matrix = [];
for (let i = 0; i < matrixSize; i++) {
    matrix[i] = [];
    for (let j = 0; j < matrixSize; j++) {
        matrix[i][j] = 1;
    }
}
console.log(matrix);

const matrix2 = [];
for (let i = 0; i < matrixSize; i++) {
    matrix2[i] = [];
    for (let j = 0; j < matrixSize; j++) {
        if (j === i) {
            matrix2[i][j] = 1;
        } else {
            matrix2[i][j] = 0;
        }
    }
}
console.log(matrix2);


const matrix3 = [];
for (let i = 0; i < matrixSize; i++) {
    matrix3[i] = [];
    for (let j = 0; j < matrixSize; j++) {
        if (j + i === 3) {
            matrix3[i][j] = 1;
        } else {
            matrix3[i][j] = 0;
        }
    }
}
console.log(matrix3);

const matrixElementNumber = 100;
// const matrixElement = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
const matrixElement = [];
for (let i = 1; i <= matrixElementNumber; i++) {
    matrixElement.push(i);
}

const matrix4 = [];
for (let i = 0; i < matrixElementNumber / 10; i++) {
    matrix4[i] = [];
    for (let j = 0; j < matrixElementNumber / 10; j++) {
        matrix4[i][j] = matrixElement[ (matrixElementNumber / 10) * i + j ];
    }
}
console.log(matrix4);