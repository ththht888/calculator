const inputDisplay = document.getElementById("input-num");
const buttons = document.querySelectorAll(".blockButton");

let currentInput = "";
let previousInput = null;
let currentOperator = null;
let resultDisplayed = false;

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const value = button.getAttribute("data-value");

    if (
      value === "0" ||
      value === "1" ||
      value === "2" ||
      value === "3" ||
      value === "4" ||
      value === "5" ||
      value === "6" ||
      value === "7" ||
      value === "8" ||
      value === "9" ||
      value === "."
    ) {
      handleNumberInput(value);
    } else if (value === "C") {
      clearCalculator();
    } else if (
      value === "+" ||
      value === "-" ||
      value === "*" ||
      value === "/"
    ) {
      handleOperatorInput(value);
    } else if (value === "=") {
      calculateAndDisplayResult();
    }
  });
});

function handleNumberInput(number) {
  if (resultDisplayed) {
    currentInput = number;
    resultDisplayed = false;
  } else {
    currentInput += number;
  }
  inputDisplay.value = currentInput;
}

function clearCalculator() {
  currentInput = "";
  previousInput = null;
  currentOperator = null;
  inputDisplay.value = "0";
  resultDisplayed = false;
}

function handleOperatorInput(operator) {
  if (currentInput === "") return;

  if (previousInput !== null && currentOperator !== null) {
    calculateAndDisplayResult();
  }
  previousInput = parseFloat(currentInput);
  currentOperator = operator;
  currentInput = "";
}

function calculateAndDisplayResult() {
  if (
    previousInput === null ||
    currentOperator === null ||
    currentInput === ""
  ) {
    return;
  }

  const currentNumber = parseFloat(currentInput);
  let result = 0;

  if (currentOperator === "+") {
    result = previousInput + currentNumber;
  } else if (currentOperator === "-") {
    result = previousInput - currentNumber;
  } else if (currentOperator === "*") {
    result = previousInput * currentNumber;
  } else if (currentOperator === "/") {
    if (currentNumber === 0) {
      inputDisplay.value = "Ошибка";
      clearCalculator();
      return;
    }
    result = previousInput / currentNumber;
  }

  if (Number.isInteger(result)) {
    inputDisplay.value = result;
  } else {
    inputDisplay.value = result.toFixed(2);
  }
  previousInput = result;
  currentInput = "";
  currentOperator = null;
}
