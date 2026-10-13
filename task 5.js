function calculateArea(length = 5, width = 4) {
  const area = length * width;
  return area;
}

const calculateAreaArrow = (length = 5, width = 4) => length * width;

console.log(`Standard Function Area (Default 5x4): ${calculateArea()}`);
console.log(`Arrow Function Area (Custom 10x3): ${calculateAreaArrow(10, 3)}`);

try {
  {
    let blockVar = "inside the block";
  }
  console.log(blockVar);
} catch (error) {
  if (!(error instanceof ReferenceError)) {
    throw error;
  }
  console.log(`Scope Test Error: ${error.name}: blockVar is not defined`);
}
