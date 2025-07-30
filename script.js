//GLOBAL VARIABLES
const buttons = document.querySelectorAll(".button");
const mainScreen = document.querySelector(".mainScreen");
const runningTotalScreen = document.querySelector(".runningTotalScreen");
const equalsButton = document.querySelector("#equalsButton");
let num1 = [];
let num2 = [];
let runningVal;
let operator;
let finalResult;

//TODO
    //If an operator is pressed, store num1 into a variable
    //If after num2 is entered, and ANOTHER operator is pressed, evaluate the first expression
        //Ex: 12 + 7 - 1 <- After pressing "-", 12 + 7 should evaluate and populate with 19
        //Operate function should be called on arithmetic button class if above conditions are valid

//POPULATE DISPLAYS EVENT LISTENERS
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if ((button.className == "button arithmetic") || (button.className == "button number") || (button.className == "button decimal")) {
            const screenText = document.createTextNode(button.textContent);
            mainScreen.appendChild(screenText);
        }
        if (button.className == "button clear") {
            mainScreen.textContent = "";
            runningTotalScreen.textContent = "";
            num1 = [];
            operator = undefined;
            num2 = [];
        }
        if (button.id == "latestValue") {
            const recentVal = document.createTextNode(finalResult)
            mainScreen.textContent = "";
            mainScreen.append(recentVal);
        }
        if (button.className == "button delete") {
            mainScreen.removeChild(mainScreen.lastChild);
        }
    })
})


//MATH EVENT LISTENERS
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        //OPERATOR VARIABLE LISTENER
        if (button.className == "button arithmetic") {
            operator = button.textContent;
        }
        //NUM 1 VARIABLE LISTENERS
        if (((button.className == "button number") || (button.className == "button decimal")) && (operator == undefined)) {
            num1.push(button.textContent);
            console.log(num1);
        }
        else if ((button.className == "button delete") && (operator == undefined)) {
            num1.pop();
            console.log(num1);
        }
        //NUM 2 VARIABLE LISTENERS
        else if (((button.className == "button number") || (button.className == "button decimal")) && (operator !== undefined)) {
            num2.push(button.textContent);
            console.log(num2);
        }
        else if ((button.className == "button delete") && (operator !== undefined)) {
            num2.pop();
            console.log(num2);
        }
    })
})

equalsButton.addEventListener("click", () => {
    //Execute calc
    finalResult = operate(num1, operator, num2);   
    if ((finalResult == Infinity) || (isNaN(finalResult))) {
        mainScreen.textContent = "";
        mainScreen.textContent = "Don't divide by 0! 😡 ";
    }
    else {
        mainScreen.textContent = "";
        mainScreen.append(finalResult);
        runningTotalScreen.textContent = "";
        runningTotalScreen.append(finalResult);
    }
    //Reset global vars
    runningVal = finalResult; //Figure out how to carry on the most recent result to resuse in the next calculation
    num1 = [];
    operator = undefined;
    num2 = [];
})

//CALC FUNCTION
function operate(a, operator, b,) {
    const tempVar1 = num1.join("");
    const tempVar2 = num2.join("");
    a = parseFloat(tempVar1);
    b = parseFloat(tempVar2);

    //TODO: Fix this conditional. If number is NaN, it should return 0. If number has been inputted, and equals is pressed, it should return the current value.
    if ((Number.isNaN(a) == true) || (Number.isNaN(b) == true)) {
        return 0;
    }
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
};

const subtract = function (a, b) {
    return a - b;
};

const multiply = function (a, b) {
    return a * b;
};

const divide = function (a, b) {
    return a / b;
};