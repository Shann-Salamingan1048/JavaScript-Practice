import { Calculate } from "./Calculations.js";
import { displayResult } from "./Calculator.js";

// Valid inputs for validation
const validInputs = new Set([
    'C', '%', 'Backspace', '/',
    '7', '8', '9', 'x',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    'x10', '0', '.', '='
]);

let inputsStr = '';
let waitingForNewNumber = false;
let allowNegative = true;
let allowDot = true;

export function processInput(input) {
    console.log('Processing input:', input, 'Current inputsStr:', inputsStr); // Debug log
    
    if (!validInputs.has(input)) {
        return;
    }

    // Handle clear
    if (input === 'C') {
        clearCalculator();
        return;
    }

    // Handle backspace
    if (input === 'Backspace') {
        backSpaceProcess();
        return;
    }

    // Handle equals
    if (input === '=') {
        Calculate();
        return;
    }

    // If waiting for new number after calculation, reset for new input
    if (waitingForNewNumber && '0123456789'.includes(input)) {
        inputsStr = '';
        waitingForNewNumber = false;
        allowNegative = true;
        allowDot = true;
    }

    // Handle numbers
    if ('0123456789'.includes(input)) {
        if (inputsStr === '0' || inputsStr === '') {
            inputsStr = input;
        } else {
            inputsStr += input;
        }
        console.log('After number input, inputsStr:', inputsStr); // Debug log
        displayResult(inputsStr);
        return;
    }

    // Handle decimal point
    if (input === '.') {
        if (!allowDot) return;
        
        if (inputsStr === '' || '+-x/%'.includes(inputsStr[inputsStr.length - 1])) {
            inputsStr += '0.';
        } else {
            inputsStr += '.';
        }
        allowDot = false;
        displayResult(inputsStr);
        return;
    }

    // Handle negative sign at start or after operator
    if (input === '-') {
        if (inputsStr.length === 0) {
            inputsStr += input;
            allowNegative = false;
            displayResult(inputsStr);
            return;
        } else if ('+-x/%'.includes(inputsStr[inputsStr.length - 1]) && allowNegative) {
            inputsStr += input;
            allowNegative = false;
            displayResult(inputsStr);
            return;
        }
    }

    // Handle operators
    if ('+-x/%'.includes(input)) {
        if (inputsStr === '' || inputsStr === '-') return;
        
        // Replace last operator if input ends with operator
        if ('+-x/%'.includes(inputsStr[inputsStr.length - 1])) {
            inputsStr = inputsStr.slice(0, -1) + input;
        } else {
            inputsStr += input;
        }
        
        allowNegative = true;
        allowDot = true;
        waitingForNewNumber = false;
        displayResult(inputsStr);
        return;
    }

    // Handle x10 (multiply by 10)
    if (input === 'x10') {
        if (inputsStr === '' || '+-x/%'.includes(inputsStr[inputsStr.length - 1])) return;
        inputsStr += 'x10';
        allowNegative = true;
        allowDot = true;
        displayResult(inputsStr);
        return;
    }

    // Handle percentage
    if (input === '%') {
        if (inputsStr === '' || '+-x/%'.includes(inputsStr[inputsStr.length - 1])) return;
        try {
            let result = parseFloat(inputsStr) / 100;
            inputsStr = result.toString();
            displayResult(inputsStr);
            waitingForNewNumber = true;
        } catch (error) {
            displayResult('Error');
            inputsStr = '';
        }
        return;
    }
}

function clearCalculator() {
    inputsStr = '';
    waitingForNewNumber = false;
    allowNegative = true;
    allowDot = true;
    displayResult('0');
}

function backSpaceProcess() {
    if (inputsStr.length === 0) return;
    
    const lastChar = inputsStr[inputsStr.length - 1];
    
    if (lastChar === '-' && (inputsStr.length === 1 || '+-x/'.includes(inputsStr[inputsStr.length - 2]))) {
        allowNegative = true;
    } else if (lastChar === '.') {
        allowDot = true;
    }
    
    inputsStr = inputsStr.slice(0, -1);
    displayResult(inputsStr || '0');
}

// Export functions for use in Calculations.js
export function getInputsStr() {
    return inputsStr;
}

export function setInputsStr(value) {
    inputsStr = value;
}

export function setWaitingForNewNumber(value) {
    waitingForNewNumber = value;
}