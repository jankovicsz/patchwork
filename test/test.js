// iqTest("2 4 7 8 10") => 3 // Third number is odd, while the rest of the numbers are even

// iqTest("1 2 1 1") => 2 // Second number is even, while the rest of the numbers are odd

function iqTest(numbers) {
  arr = numbers.split(' ').map(Number);
  const arr1 = arr.filter(num => num % 2 === 0);
  const arr2 = arr.filter(num => num % 2 !== 0);
  const result = arr1.length < arr2.length ? arr1[0] : arr2[0];
  return arr.indexOf(result) + 1;
}

console.log(iqTest("2 4 7 8 10"));