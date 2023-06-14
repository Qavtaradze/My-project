let display = document.getElementById('display');

function appendNumber(number) {
  display.value += number;
}

function appendOperator(operator) {
  display.value += operator;
}

function calculateResult() {
  let expression = display.value;
  let result = eval(expression);

  display.value = result;
}

function clearDisplay() {
  display.value = '';
}
