const score = Number(prompt("Enter your test score:"));
let gradeBand;

if (score >= 90) {
  gradeBand = 4;
} else if (score >= 80) {
  gradeBand = 3;
} else if (score >= 70) {
  gradeBand = 2;
} else if (score >= 60) {
  gradeBand = 1;
} else {
  gradeBand = 0;
}

let grade;
switch (gradeBand) {
  case 4:
    grade = "A";
    break;
  case 3:
    grade = "B";
    break;
  case 2:
    grade = "C";
    break;
  case 1:
    grade = "D";
    break;
  default:
    grade = "F";
}

const status = score >= 60 ? "Passed" : "Failed";

console.log(`Score: ${score}`);
console.log(`Grade: ${grade}`);
console.log(`Status: ${status}`);
