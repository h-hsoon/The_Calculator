// object values
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

// Display
function updateDisplay() {
    const display = document.querySelector('.screen');
    display.value = calculator.displayValue;
}
updateDisplay();

// handle key press
const keys = document.querySelector('.keys');
keys.addEventListener('click',(event)=>{
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if(target.classList.contains('all-clear')){
        resetCalculator();
        updateDisplay();
        return;
    }
    
    inputDigit(target.value);
    updateDisplay();
});

// input didit
const inputDigit = (didit)=>{
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true){
        calculator.displayValue = didit;
        calculator.waitingForSecondOperand = false;
    } else{
        calculator.displayValue = displayValue === '0' ? didit : displayValue + didit;
    }
};

// input decimal
const inputDecimal = (dot)=>{
    if (calculator.waitingForSecondOperand === true){
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    }
    if (!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
    }
}

// handle operator
const handleOperator = (nextOperator) =>{
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand){
        calculator.operator = nextOperator;
        return;
    }
    if (firstOperand == null && !isNaN(inputValue)){
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand,inputValue,operator)
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
};

// calculator logic
const calculate=(firstOperand,secondOperand,operator) =>{
    if (operator === '+'){
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    }else if (operator === '/') {
        return firstOperand / secondOperand;
    }
    return secondOperand;
};

// all cl
const resetCalculator = () =>{
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
};