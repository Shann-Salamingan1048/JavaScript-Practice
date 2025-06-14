const todoList = [
    {name: 'Mo bangon', date: '2025-06-14'},
    {name: 'Mo laag', date: '2025-02-24'}
];

renderTodoList();

function renderTodoList()
{
    let todoListHTML = '';
    for(let i = 0; i < todoList.length; ++i)
    {
        
        const{name, date} = todoList[i];
        const html = `
                <div>${name}</div>
                <div>${date}</div>
                <button onclick="
                    todoList.splice(${i}, 1);
                    renderTodoList();
                " class="css-delete-btn">Delete</button>
            </div>
        `;

        todoListHTML += html;

    }
    document.querySelector('.js-addedTodo').innerHTML = todoListHTML;
}

function addTodo()
{
    const todoRaw = document.querySelector('.js-todo');
    const todo = todoRaw.value;
    const dateRaw = document.querySelector('.js-date');
    const date = dateRaw.value;

    todoList.push(
        {name: todo, date: date}
    );
    todoRaw.value = ''; // clear the todo list enter

    renderTodoList();
}