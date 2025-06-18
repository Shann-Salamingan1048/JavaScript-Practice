import { processInput } from "./ProcessInputs.js";

// Button selectors with proper class syntax
const buttons = [
    { element: document.querySelector('.js-C'), input: 'C' },
    { element: document.querySelector('.js-percent'), input: '%' },
    { element: document.querySelector('.js-DEL'), input: 'Backspace' },
    { element: document.querySelector('.js-divide'), input: '/' },
    { element: document.querySelector('.js-7'), input: '7' },
    { element: document.querySelector('.js-8'), input: '8' },
    { element: document.querySelector('.js-9'), input: '9' },
    { element: document.querySelector('.js-x'), input: 'x' },
    { element: document.querySelector('.js-4'), input: '4' },
    { element: document.querySelector('.js-5'), input: '5' },
    { element: document.querySelector('.js-6'), input: '6' },
    { element: document.querySelector('.js--'), input: '-' },
    { element: document.querySelector('.js-1'), input: '1' },
    { element: document.querySelector('.js-2'), input: '2' },
    { element: document.querySelector('.js-3'), input: '3' },
    { element: document.querySelector('.js-plus'), input: '+' },
    { element: document.querySelector('.js-x10'), input: 'x10' },
    { element: document.querySelector('.js-0'), input: '0' },
    { element: document.querySelector('.js-point'), input: '.' },
    { element: document.querySelector('.js-equal'), input: '=' }
];

// Add event listeners to buttons
buttons.forEach(({ element, input }) => {
    if (element) { // Check if button exists
        element.addEventListener('click', () => processInput(input));
        
    }
});

// Keyboard event listener
document.body.addEventListener('keydown', (event) => {
    event.preventDefault();
    
    // Map keyboard keys to calculator inputs
    const keyMap = {
        'Delete': 'C',
        'Escape': 'C',
        '*': 'x',
        'Enter': '=',
        'Backspace': 'Backspace'
    };
    
    const input = keyMap[event.key] || event.key;
    processInput(input);
});

// Export display update function for use in other modules
export function displayResult(result) {
    const display = document.getElementById('display');
    if (display) {
        display.value = result;
    }
}

// Initialize display
document.addEventListener('DOMContentLoaded', () => {
    displayResult('0');
});