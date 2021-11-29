const numberButtons = document.querySelectorAll('.btn-num');
const operateButtons = document.querySelectorAll('.btn-op');
const clearButton = document.querySelector('#btn-clear');
const deleteButton = document.querySelector('#btn-delete');
const equalButton = document.querySelector('#btn-equal');
const dotButton = document.querySelector('#btn-dot');
const topScreen = document.querySelector('#top-text');
const bottomScreen = document.querySelector('#bottom-text');
const topDisplay = document.querySelector('#screen-top');
const bottomDisplay = document.querySelector('#screen-bottom');

let overwrite = true;
let operand1 = "";
let operand2 = "";
let operation = "";

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "÷":
            if (b === 0) {
                alert("Error: dividing with zero");
                return;
            }
            return divide(a, b);
    }
}

function enterValue(e) {

    if (bottomScreen.textContent.length === 16 && overwrite === false) {
        return;
    }

    let value =e.target.textContent;
    console.log(value);

    if (bottomScreen.textContent === "0" && value === "0") {
        return;
    }
    console.log(overwrite)
    if (overwrite === true) {
        bottomScreen.textContent = value;
        overwrite = false;
    } else {
        bottomScreen.textContent += value;
    }

}

function callOperation(e) {

    overwrite = true;

    let value= e.target.textContent;
  

// console.log(operand1.length);
// console.log(operand2.length);
    if (operand1.length === 0) {
        operation = value;
        // console.log(operation)
        operand1 = bottomScreen.textContent;
        topScreen.textContent = operand1 + " " + operation;
    } else if (operand2.length != 0) {
        operation = value;
        topScreen.textContent = bottomScreen.textContent + " " + operation;
        operand1 = bottomScreen.textContent;
        operand2 = "";
    }else {
        let result = operate(operation, Number(operand1), Number(bottomScreen.textContent));
        if (result % 1 != 0) {
            result = result.toFixed(4);
        }
        operand1 = result;
        operation = value;
        topScreen.textContent = operand1 + " " + operation;
        bottomScreen.textContent = operand1;

    }
}

function clear() {
    overwrite = true;
    bottomScreen.textContent = '0';
    topScreen.textContent = '';
    operand1 = "";
    operand2 = "";
    operation = "";
}

function deleteValue() {
    if (bottomScreen.textContent.length > 0) {
        bottomScreen.textContent = bottomScreen.textContent.slice(0, -1);
    }
}

function evaluateExpression() {

    operand2 = bottomScreen.textContent;

    if (operand1.length != 0 && operand2.length != 0 && operation.length != 0) {
        let result = operate(operation, Number(operand1), Number(operand2));
        if (result % 1 != 0) {
            result = result.toFixed(4);
        }
        topScreen.textContent += (" " + operand2 + " =");
        bottomScreen.textContent= result
    }

}

/* Event listeners */
numberButtons.forEach(b => {
    b.addEventListener('click', enterValue);
});

operateButtons.forEach(button => {
    button.addEventListener('click', callOperation);
});

equalButton.addEventListener('click', evaluateExpression);



