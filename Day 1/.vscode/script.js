// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize clock
    updateClock();
    setInterval(updateClock, 1000);
    
    // Set up event listeners
    setupEventListeners();
    
    // Welcome message
    setTimeout(() => {
        alert('Welcome to this JavaScript demo! 🎉');
    }, 1000);
});

// 1. REAL-TIME CLOCK
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.innerHTML = `${timeString}<br><small>${dateString}</small>`;
    }
}

// 2. CALCULATOR FUNCTIONS
function calculate(operation) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const resultDiv = document.getElementById('calcResult');
    
    if (isNaN(num1) || isNaN(num2)) {
        resultDiv.innerHTML = '⚠️ Please enter valid numbers!';
        return;
    }
    
    let result;
    switch(operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2 === 0) {
                resultDiv.innerHTML = '⚠️ Cannot divide by zero!';
                return;
            }
            result = num1 / num2;
            break;
    }
    
    resultDiv.innerHTML = `✨ Result: ${result}`;
}

// 3. DYNAMIC CONTENT FUNCTIONS
const messages = [
    "JavaScript is awesome! 🎉",
    "You're learning web development! 💻",
    "Keep coding and stay curious! 🚀",
    "The web is your canvas! 🎨",
    "Code your dreams into reality! ✨"
];

const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
];

function changeContent() {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    document.getElementById('dynamicContent').innerHTML = `${randomMessage}`;
}

export function changeColor() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = randomColor;
}

export function addElement() {
    const container = document.getElementById('dynamicContent');
    const newElement = document.createElement('div');
    newElement.innerHTML = `🌟 New element created at ${new Date().toLocaleTimeString()}`;
    newElement.style.marginTop = '10px';
    newElement.style.padding = '10px';
    newElement.style.background = 'rgba(255, 255, 255, 0.1)';
    newElement.style.borderRadius = '5px';
    container.appendChild(newElement);
}

// 4. TO-DO LIST FUNCTIONS
let todos = [];

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text === '') {
        alert('Please enter a task!');
        return;
    }
    
    todos.push({
        id: Date.now(),
        text: text,
        completed: false
    });
    
    input.value = '';
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo-item';
        todoDiv.innerHTML = `
            <span>${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        todoList.appendChild(todoDiv);
    });
}

// 5. FORM VALIDATION
function validateForm() {
    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const message = document.getElementById('messageInput').value.trim();
    const resultDiv = document.getElementById('formResult');
    
    let errors = [];
    
    if (name === '') {
        errors.push('Name is required');
    }
    
    if (email === '') {
        errors.push('Email is required');
    } else if (!isValidEmail(email)) {
        errors.push('Please enter a valid email');
    }
    
    if (message === '') {
        errors.push('Message is required');
    }
    
    if (errors.length > 0) {
        resultDiv.innerHTML = `❌ Errors:<br>${errors.join('<br>')}`;
        resultDiv.style.borderLeftColor = '#ff4757';
    } else {
        resultDiv.innerHTML = `✅ Form submitted successfully!<br>Thank you, ${name}!`;
        resultDiv.style.borderLeftColor = '#2ed573';
        
        // Clear form
        document.getElementById('nameInput').value = '';
        document.getElementById('emailInput').value = '';
        document.getElementById('messageInput').value = '';
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Set up event listeners
function setupEventListeners() {
    const todoInput = document.getElementById('todoInput');
    if (todoInput) {
        todoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodo();
            }
        });
    }
}