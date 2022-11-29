const numberButtons = document.querySelectorAll(".num");
const operationButton = document.querySelectorAll(".operation");
const allClearButton = document.querySelector(".all-clear");
const deleteButton = document.querySelector(".del");
const equalsButton = document.querySelector(".equals");
const currentOutput = document.querySelector(".current-operand");
const previousOutput = document.querySelector(".previous-operand");
const tempResult = document.querySelector(".temp-result");

let currentDisplay = "";
let previousDisplay = "";
let lastOperator = "";
let result = null;

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentDisplay.toString().includes(".") && button.innerText === ".")
      return;
    if (previousDisplay && currentDisplay && tempResult.innerText === "") {
      return;
    }
    if (currentDisplay === ".") {
      currentDisplay = "0.";
      return;
    }
    currentDisplay += button.innerText;
    currentOutput.innerText = currentDisplay;
  });
});

operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentDisplay === "") return;
    const operator = button.innerText;
    if (currentDisplay && previousDisplay && operator) {
      mathOperation();
    } else {
      result = parseFloat(currentDisplay);
    }
    if (currentDisplay && previousDisplay && tempResult.innerText === "") {
      previousDisplay = `${currentDisplay} ${operator} `;
      previousOutput.innerText = previousDisplay;
      currentDisplay = "";
      currentOutput.innerText = "0";
      tempResult.innerText = "0";
      return;
    }
    let name = operator;
    name = "";
    previousDisplay += currentDisplay + " " + operator + " ";

    previousOutput.innerText = previousDisplay;

    currentDisplay = "";
    currentOutput.innerText = "0";
    lastOperator = operator;
    tempResult.innerText = result;
  });
});

const mathOperation = () => {
  if (lastOperator === "+") {
    result = parseFloat(result) + parseFloat(currentDisplay);
  } else if (lastOperator === "-") {
    result = parseFloat(result) - parseFloat(currentDisplay);
  } else if (lastOperator === "X") {
    result = parseFloat(result) * parseFloat(currentDisplay);
  } else if (lastOperator === "/") {
    result = parseFloat(result) / parseFloat(currentDisplay);
  }
};

equalsButton.addEventListener("click", (event) => {
  if (!currentDisplay && !previousDisplay) return;
  if (!currentDisplay) return;
  if (!tempResult.innerText) return;

  mathOperation();

  previousDisplay += currentDisplay;
  previousOutput.innerText = previousDisplay;
  currentDisplay = result;
  currentOutput.innerText = currentDisplay;
  tempResult.innerText = "";
});

allClearButton.addEventListener("click", () => {
  currentDisplay = "";
  currentOutput.innerText = "0";
  previousDisplay = "";
  previousOutput.innerText = "0";
  tempResult.innerText = "0";
});

deleteButton.addEventListener("click", () => {
  if (!tempResult.innerText && currentDisplay && previousDisplay) return;
  currentDisplay = currentDisplay.toString().slice(0, -1);
  currentOutput.innerText = currentDisplay;

  if (!currentDisplay) {
    currentOutput.innerText = "0";
    return;
  }
});

window.addEventListener("keydown", (event) => {
  if (
    event.key === "0" ||
    event.key === "1" ||
    event.key === "2" ||
    event.key === "3" ||
    event.key === "4" ||
    event.key === "5" ||
    event.key === "6" ||
    event.key === "7" ||
    event.key === "8" ||
    event.key === "9" ||
    event.key === "."
  ) {
    clickNumber(event.key);
  } else if (event.key === "+" || event.key === "-" || event.key === "/") {
    clickOperator(event.key);
  } else if (event.key === "*") {
    clickOperator("X");
  } else if (event.key === "Enter" || event.key === "=") {
    clickEquals();
  } else if (event.key === "Backspace") {
    clickDelete();
  } else if (event.key === "Escape") {
    clickAllClear();
  }
});

function clickNumber(num) {
  numberButtons.forEach((button) => {
    if (num === button.innerText) button.click();
  });
}

const clickOperator = (operator) => {
  operationButton.forEach((button) => {
    if (operator === button.innerText) button.click();
  });
};

const clickEquals = () => {
  equalsButton.click();
};

const clickDelete = () => {
  deleteButton.click();
};

const clickAllClear = () => {
  allClearButton.click();
};
