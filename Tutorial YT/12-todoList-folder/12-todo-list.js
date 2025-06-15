const todoList = [{
  name: 'make dinner',
  dueDate: '2022-12-22'
}, {
  name: 'wash dishes',
  dueDate: '2022-12-22'
}];

renderTodoList();

document.querySelector('.js-add-btn').addEventListener('click',
  () => {
    addTodo();
  }
);

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach(({name, dueDate}, i) =>
    {
      const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="delete-todo-button js-delete-btn">Delete</button> 
      `;
      todoListHTML += html;
    }
  );

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-btn')
  .forEach((deleteButton, i ) =>
  {
    deleteButton.addEventListener('click', () =>
    {
      todoList.splice(i, 1); // it gets deleted or remove when clicked the specific button
      renderTodoList();
    });
  });
  // querySelectorAll return all elemenets the same class name, 
  // while querySelector is only one or the first name of the same class name
}

function addTodo() 
{
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  todoList.push({
    //name: name,
    //dueDate: dueDate,
    name,
    dueDate
  });

  inputElement.value = '';

  renderTodoList();
}