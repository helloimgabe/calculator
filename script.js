//GLOBAL VARIABLES
const MAX_DISPLAY_LENGTH = 18;
const buttons = document.querySelectorAll(".button");
const mainScreen = document.querySelector(".mainScreen");
const runningTotalScreen = document.querySelector(".runningTotalScreen");
const equalsButton = document.querySelector(".equals");
const percentButton = document.querySelector(".percent");
const arithmeticButton = document.querySelectorAll(".arithmetic")
let num1 = [];
let num2 = [];
let operator;
let calculationResult;
let isResultDisplayed = false;
let activeKeyboardPress = null;

//KEYBOARD EVENET LISTENERS
document.body.addEventListener("keydown", (event) => {
    const key = event.key;
    if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", ".", "=", "Enter", "Backspace", "Escape"].includes(key)) {
        event.preventDefault();
    }
    let targetButton;
    if (!isNaN(key) && key !== " ") {
        targetButton = document.querySelector(`.number[data-value="${key}"]`);
    } else if (["+", "-", "*", "/",  "%"].includes(key)) {
        targetButton = document.querySelector(`.arithmetic[data-operator="${key}"]`);
    } else if (key === "Enter" || key === "=") {
        targetButton = document.querySelector(".equals");
    } else if (key === "Backspace") {
        targetButton = document.querySelector(".delete");
    } else if (key === "Escape" || key.toLowerCase() === "c") {
        targetButton = document.querySelector(".clear");
    } else if (key === ".") {
        targetButton = document.querySelector(".decimal");
    }
    if (targetButton) {
        if (activeKeyboardPress && activeKeyboardPress !== targetButton) {
            activeKeyboardPress.classList.remove("keyboard-active");
        }
        targetButton.classList.add("keyboard-active");
        activeKeyboardPress = targetButton;
        targetButton.click();
    } else {
        if (activeKeyboardPress) {
            activeKeyboardPress.classList.remove("keyboard-active");
            activeKeyboardPress = null;
        }
    }
})
document.body.addEventListener("keyup", (event) => {
    const key = event.key;
    let targetButtonReleased;
    if (!isNaN(key) && key !== " ") {
        targetButtonReleased = document.querySelector(`.number[data-value="${key}"]`);
    } else if (["+", "-", "*", "/", "%"].includes(key)) {
        targetButtonReleased = document.querySelector(`.arithmetic[data-operator="${key}"]`);
    } else if (key === "Enter" || key === "=") {
        targetButtonReleased = document.querySelector(".equals");
    } else if (key === "Backspace") {
        targetButtonReleased = document.querySelector(".delete");
    } else if (key === "Escape" || key.toLowerCase() === "c") {
        targetButtonReleased = document.querySelector(".clear");
    } else if (key === ".") {
        targetButtonReleased = document.querySelector(".decimal");
    }

    if (targetButtonReleased) {
        if (targetButtonReleased === activeKeyboardPress) {
            targetButtonReleased.classList.remove('keyboard-active');
            activeKeyboardPress = null;
        }
    }
});
window.addEventListener("blur", () => {
    if (activeKeyboardPress) {
        activeKeyboardPress.classList.remove('keyboard-active');
        activeKeyboardPress = null;
    }
});

//MOUSE EVENET LISTENERS
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        let currentNumArray;
        let canPush = false;
        let shouldClearDisplay = false;

        if (isResultDisplayed) {
            shouldClearDisplay = true;
            mainScreen.textContent = "";
            runningTotalScreen.textContent = "";
            num1 = [];
            num2 = [];
            operator = undefined;
            isResultDisplayed = false;
        }
        if (operator == undefined) {
            currentNumArray = num1;
        } else {
            currentNumArray = num2;
            if (num2.length == 0) {
                shouldClearDisplay = true;
            }
        }

        if (button.className.includes("number") || button.className.includes("decimal")) {
            if (button.className.includes("number")) {
                canPush = true;
            } else if (button.className.includes("decimal")) {
                canPush = !currentNumArray.includes(".");
            }
            if (canPush) {
                if (mainScreen.textContent === "0" && button.textContent !== ".") {
                    shouldClearDisplay = true;
                }
                if (shouldClearDisplay) {
                    mainScreen.textContent = "";
                }
                if (mainScreen.textContent.length < MAX_DISPLAY_LENGTH) {
                    mainScreen.append(button.textContent);
                    currentNumArray.push(button.textContent);
                    console.log(currentNumArray);
                }
            }

        } else if ((button.className.includes("arithmetic")) && (num2.length == 0)) {
            operator = button.textContent;
            isResultDisplayed = false;

        } else if (button.className.includes("clear")) {
            mainScreen.textContent = "0";
            runningTotalScreen.textContent = "";
            num1 = [];
            num2 = [];
            operator = undefined;
            calculationResult = 0;
            isResultDisplayed = false;

        } else if (button.className.includes("delete")) {
            currentNumArray.pop();

            if (currentNumArray.length !== 0) {
                mainScreen.removeChild(mainScreen.lastChild);
                
            } else if (currentNumArray.length == 0) {
                mainScreen.textContent = "0";
                runningTotalScreen.textContent = "";
                num1 = [];
                num2 = [];
                operator = undefined;
                calculationResult = 0;
                isResultDisplayed = false;
            }
        }
    })
})

//CALCULATION EVENT LISTENERS
arithmeticButton.forEach((button) => {
    button.addEventListener("click", () => {
        if (num1.length == 0) {
            num1 = [];
            operator = undefined;
            mainScreen.textContent = "0";
        
        } else if (num2.length !== 0) {
            calculationResult = Number(Number(operate(operator).toFixed(6)));

            if ((calculationResult == Infinity) || (isNaN(calculationResult))) {
                mainScreen.textContent = "";
                mainScreen.textContent = "Don't divide by 0! 😡 ";
                isResultDisplayed = false;
                num1 = [0];
                operator = undefined;
                num2 = [];
                return;

            } else {
                mainScreen.textContent = "";
                
                if (String(calculationResult).length >= MAX_DISPLAY_LENGTH) {
                    console.log(String(calculationResult).length)
                    mainScreen.append(calculationResult.toExponential(6));
                    runningTotalScreen.textContent = "";
                    runningTotalScreen.append(calculationResult.toExponential(6));

                } else {
                    mainScreen.append(calculationResult);
                    runningTotalScreen.textContent = "";
                    runningTotalScreen.append(calculationResult);
                }
                num1 = [calculationResult];
                operator = button.textContent;
                num2 = [];
                isResultDisplayed = false;
            }

        } else {
            operator = button.textContent;
            runningTotalScreen.textContent = num1.join("") + " " + operator;
            isResultDisplayed = false;
        }
    })
})

percentButton.addEventListener("click", () => {
    if (num1.length == 0) {
        return;

    } else if (operator == undefined) {
        calculationResult = Number(Number(percentCalc(num1).toFixed(6)));

    } else if ((operator !== undefined) && (num2.length == 0)) {
        calculationResult = Number(Number(percentCalc(num1).toFixed(6)));

    } else if (operator !== undefined) {
        calculationResult = Number(Number(percentCalc(num2).toFixed(6)));
    }

    if ((isNaN(calculationResult))) {
        mainScreen.textContent = "";
        mainScreen.textContent = "0";
        runningTotalScreen.append("0");
        isResultDisplayed = false;
    } else {
        mainScreen.textContent = "";
        mainScreen.append(calculationResult);
        runningTotalScreen.textContent = "";
        runningTotalScreen.append(calculationResult);
        num1 = [calculationResult];
        operator = undefined;
        num2 = [];
        isResultDisplayed = false;
    }
})

equalsButton.addEventListener("click", () => {
    if (num1.length == 0) {
        return;

    } else if ((operator == undefined) && (num2.length == 0)) {
        const tempVar1 = num1.join("");
        const tempVar2 = parseFloat(tempVar1);
        calculationResult = tempVar2;

    } else if ((operator !== undefined) && (num2.length == 0)) {
        const tempVar1 = num1.join("");
        const tempVar2 = parseFloat(tempVar1);
        calculationResult = tempVar2;

    } else if (operator !== undefined) {
        calculationResult = Number(Number(operate(operator).toFixed(6)));
    }

    if ((calculationResult == Infinity) || (isNaN(calculationResult))) {
        mainScreen.textContent = "";
        mainScreen.textContent = "Don't divide by 0! 😡 ";
    } else {
        mainScreen.textContent = "";

        if (String(calculationResult).length >= MAX_DISPLAY_LENGTH) {
            console.log(String(calculationResult).length)
            mainScreen.append(calculationResult.toExponential(6));
            runningTotalScreen.textContent = "";
            runningTotalScreen.append(calculationResult.toExponential(6));

        } else {
            mainScreen.append(calculationResult);
            runningTotalScreen.textContent = "";
            runningTotalScreen.append(calculationResult);
            num1 = [calculationResult];
            operator = undefined;
            num2 = [];
            isResultDisplayed = false;
        }
    }
})

//CALC FUNCTIONS
function percentCalc(array) {
    const tempVar = array.join("");
    const numberVal = parseFloat(tempVar);
    return percentage(numberVal);
}

function operate(operator) {
    const tempVar1 = num1.join("");
    const tempVar2 = num2.join("");
    const a = parseFloat(tempVar1);
    const b = parseFloat(tempVar2);

    if (operator == "+") {
        return add(a, b);
    }
    else if (operator == "-") {
        return subtract(a, b);
    }
    else if (operator == "×") {
        return multiply(a, b);
    }
    else if (operator == "÷") {
        return divide(a, b);
    }
}

//MATH FUNCTIONS
const add = function (a, b) {
    return a + b;
}
const subtract = function (a, b) {
    return a - b;
}
const multiply = function (a, b) {
    return a * b;
}
const divide = function (a, b) {
    return a / b;
}
const percentage = function (a) {
    return a / 100;
}