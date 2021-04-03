const calculator = (() => {
  /* Operations */
  const calculate = (() => {
    const add = (a, b) => Number(a) + Number(b);
    const subtract = (a, b) => Number(a) - Number(b);
    const multiply = (a, b) => Number(a) * Number(b);
    const divide = (a, b) => Number(a) / Number(b);
    return { add, subtract, multiply, divide };
  })();

  let total = "0";
  let firstOperand = 0;
  let secondOperand = 0;
  let operator = null;
  let posOrNeg = "+";
  const operate = (operator, num2, num1 = total) => operator(num1, num2);

  // HMTL and CSS
  const fontLink1 = document.createElement("link");
  const fontLink2 = document.createElement("link");
  fontLink1.rel = "preconnect";
  fontLink1.href = "https://fonts.gstatic.com";
  fontLink2.rel = "stylesheet";
  fontLink2.href =
    "https://fonts.googleapis.com/css2?family=DM+Mono&display=swap";

  const html = document.querySelector("html");
  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = "./style.css";

  html.appendChild(style);

  const container = document.querySelector("#container");
  const display = document.createElement("div");
  display.className = "display";
  display.id = "display";

  const displayNumbers = document.createElement("div");
  displayNumbers.innerHTML = total;
  display.appendChild(displayNumbers);

  // Buttons
  const numPad = document.createElement("div");
  numPad.id = "numPad";
  numPad.className = "numPad";
  for (let i = 0; i < 10; i++) {
    const numKey = document.createElement("button");
    numKey.id = "num" + i;
    numKey.innerText = i;
    numKey.className = "numKey";
    numKey.addEventListener("click", () => {
      if (total == "0") {
        if (posOrNeg == "-") {
          displayNumbers.innerText = `- ${total}`;
          total = -1 * numKey.innerText;
          posOrNeg = "+";
        } else {
          total = numKey.innerText;
        }
      } else {
        total += numKey.innerText;
      }
      displayNumbers.innerText = total;
    });
    if (numKey.innerText == 0) {
      numKey.style.gridRow = "4";
    }
    numPad.appendChild(numKey);
  }

  const dot = document.createElement("button");
  dot.id = "dot";
  dot.innerText = ".";
  dot.className = "numKey";
  dot.addEventListener("click", () => {
    if (!total.toString().includes(".")) {
      total = total + ".";
      displayNumbers.innerText = total;
    }
  });
  numPad.appendChild(dot);

  const sign = document.createElement("button");
  sign.id = "negative";
  sign.innerText = "+/-";
  sign.className = "numKey";
  sign.addEventListener("click", () => {
    switch (posOrNeg) {
      case "+":
        posOrNeg = "-";
        total *= -1;
        if (total == "0") {
          displayNumbers.innerText = "- ";
        } else {
          displayNumbers.innerText = total;
        }
        break;
      case "-":
        posOrNeg = "+";
        total *= -1;
        displayNumbers.innerText = total;
        break;
    }
  });
  numPad.appendChild(sign);

  const ce = document.createElement("button");
  ce.id = "ce";
  ce.innerText = "CE";
  ce.className = "numKey";
  ce.style.background = "#eee";
  ce.style.gridRow = "6";
  ce.style.gridColumn = "1 / 3";
  ce.addEventListener("click", () => {
    total = 0;
    firstOperand = 0;
    secondOperand = 0;
    operator = null;
    displayNumbers.innerText = total;
  });
  container.appendChild(ce);

  const equals = document.createElement("button");
  equals.id = "equals";
  equals.innerText = "=";
  equals.className = "numKey";
  equals.style.background = "#ff330a";
  equals.style.color = "#fff";
  equals.style.gridRow = "6";
  equals.style.gridColumn = "3 / 5";
  equals.addEventListener("click", () => {
    if (operator != null) {
      secondOperand = total;
      total = operate(operator, secondOperand, firstOperand);
      displayNumbers.innerText = +total.toFixed(4);
      firstOperand = total;
      total = 0;
      secondOperand = 0;
      operator = null;
    }
  });
  container.appendChild(equals);

  function operatorCommon(op, key) {
    key.className = "numKey";
    key.style.background = "#ccc";
    key.addEventListener("click", () => {
      if (operator == null) {
        firstOperand = total;
        displayNumbers.innerText = `${firstOperand} ${key.innerText}`;
        total = 0;
        operator = op;
      } else {
        secondOperand = total;
        total = operate(operator, secondOperand, firstOperand);
        displayNumbers.innerText = `${+total.toFixed(4)} ${key.innerText}`;
        firstOperand = total;
        secondOperand = 0;
        total = 0;
        operator = op;
      }
    });
    operators.appendChild(key);
  }

  const operators = document.createElement("div");
  operators.id = "operators";
  operators.className = "operators";

  const addKey = document.createElement("button");
  addKey.id = "addKey";
  addKey.innerText = "+";
  operatorCommon(calculate.add, addKey);

  const subtractKey = document.createElement("button");
  subtractKey.id = "subtractKey";
  subtractKey.innerText = "-";
  operatorCommon(calculate.subtract, subtractKey);

  const multiplyKey = document.createElement("button");
  multiplyKey.id = "multiplyKey";
  multiplyKey.innerText = "*";
  operatorCommon(calculate.multiply, multiplyKey);

  const divideKey = document.createElement("button");
  divideKey.id = "divideKey";
  divideKey.innerText = "/";
  operatorCommon(calculate.divide, divideKey);

  container.appendChild(display);
  container.appendChild(numPad);
  container.appendChild(operators);
})();
