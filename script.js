//MATH FUNCTIONS
const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

//TODO: sum and multiply func taken from calc exercise. . . don't know if I'll keep them or if they're not relevant to project spec
const sum = function (array) {
  const totalSum = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return totalSum;
};

const multiply = function (array) {
   const totalValue = array.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
  return totalValue;
}

const divide = function (a, b) {
  return a / b;
};