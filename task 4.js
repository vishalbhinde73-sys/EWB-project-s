console.log("-- Multiplication Table of 5 --");
for (let multiplier = 1; multiplier <= 5; multiplier++) {
  console.log(`5 x ${multiplier} = ${5 * multiplier}`);
}

console.log("-- First number > 10 divisible by 6 --");
let number = 11;
while (true) {
  if (number > 10 && number % 6 === 0) {
    console.log(`Found: ${number}`);
    break;
  }
  number++;
}

console.log("-- Numbers from 1 to 5, skipping 3 --");
let count = 1;
do {
  if (count === 3) {
    count++;
    continue;
  }
  console.log(count);
  count++;
} while (count <= 5);
