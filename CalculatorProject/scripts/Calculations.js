import { getInputsStr, setInputsStr, setWaitingForNewNumber } from "./ProcessInputs.js";
import { displayResult } from "./Calculator.js";
export function Calculate() {
    try {
        const inputsStr = getInputsStr();
        
        if (!inputsStr) return;
        
        // Replace 'x' with '*' for evaluation
        let expression = inputsStr.replace(/x/g, '*');
        
        // Handle x10 (multiply by 10)
        expression = expression.replace(/\*10/g, '*10');
        
        // Evaluate the expression safely
        let result = Function('"use strict"; return (' + expression + ')')();
        
        // Handle division by zero and invalid results
        if (!isFinite(result)) {
            throw new Error('Division by zero or invalid operation');
        }
        
        // Round to avoid floating point precision issues
        result = Math.round(result * 1000000000) / 1000000000;
        
        // Update the input string with the result
        setInputsStr(result.toString());
        displayResult(result.toString());
        setWaitingForNewNumber(true);
        
    } catch (error) {
        displayResult('Error');
        setInputsStr('');
        setWaitingForNewNumber(true);
    }
}