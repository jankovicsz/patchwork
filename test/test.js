"use strict";

function resolve(value) {
  return new Promise(res => {
    setTimeout(res, 2000, value * 2)
  })
}

async function serial() {
  const a = await resolve(1);
  const b = await resolve(2);
  return a + b;
}

async function parallel() {
  const parallelA = resolve(10);
  const parallelB = resolve(20);
  return (await parallelA) + (await parallelB);
}

serial().then(console.log);
parallel().then(console.log);

let number = 0;

async function sum() {
  number = (await parallel()) * (await serial());
  console.log(number);
  return number;
}

sum().then(console.log);

/* function gridMap(fn, x) {
  return x.map((a) => a.map((b) => fn(b)));
} */

// iqTest("2 4 7 8 10") => 3 // Third number is odd, while the rest of the numbers are even

// iqTest("1 2 1 1") => 2 // Second number is even, while the rest of the numbers are odd

function iqTest(numbers) {
  arr = numbers.split(" ").map(Number);
  const arr1 = arr.filter((num) => num % 2 === 0);
  const arr2 = arr.filter((num) => num % 2 !== 0);
  const result = arr1.length < arr2.length ? arr1[0] : arr2[0];
  return arr.indexOf(result) + 1;
}

const num = parseInt("valami");

// console.log(num === NaN);

/* let hello = async () => { return "Hello" };
hello().then(console.log)

const parser = async (route) => {
      const res = await fetch(route);
      return res.json();
    } */
