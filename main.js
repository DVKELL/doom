/*
  // Array para almacenar los todo Items
  let todos = [];

  //Clase para representar a todo item
  class Todo {
    constructor(id, text) {
      this.id = id;
      this.text = text;
      this.completed = false;
    }

    markAsComplete() {
      this.completed = true
    }
  }

  // declarar las variables del dom
  const newToDoInput = document.getElementById("new-todo");
  const addToDoBtn = document.getElementById("add-todo");
  const todoList = document.getElementById("todo-list");

  // Obtiene la informacion del array y la renderiza
  const renderTodos = () => {
    todoList.innerHTML = "";
    for (const todo of todos) {
      const todoItem = document.createElement("li");

      todoItem.innerHTML = `
      ${todo}
      <button id="completeBtn" class="deleteBtn">Completar</button>
      <button id="updateBtn" class="deleteBtn">Editar</button>
      <button id="deleteBtn" class="deleteBtn">Eliminar</button>
      `;

      todoList.appendChild(todoItem);
    }
  };

  // Funciona para almacenar la informacion en el array
  const createTodo = () => {
    const todoText = newToDoInput.value;

    if (todoText === "") {
      return;
    }

    todos.push(todoText);

    renderTodos();
  };

  addToDoBtn.addEventListener("click", function name(e) {
    e.preventDefault();
    createTodo();
  });
 
*/

//------------------

// Array para almacenar los todo Items
let todos = [];
let completeTask = [];

//Clase para representar a todo item
class Todo {
  constructor(id, text) {
    this.id = id;
    this.text = text;
    this.completed = false;
  }

  markAsComplete() {
    this.completed = true;
  }

  buildTodo() {
    const todoItem = document.createElement("li");

    todoItem.id = `todo-${this.id}`;
    todoItem.innerHTML = `
    ${this.text}
    <button id="completeBtn" class="cursor-pointer" onClick="markTodoAsComplete(${this.id})">Completar</button>
    <button id="updateBtn" class="cursor-pointer">Editar</button>
    <button id="deleteBtn" class="cursor-pointer">Eliminar</button>
    `;

    return todoItem;
  }
}

// declarar las variables del dom
const newToDoInput = document.getElementById("new-todo");
const addToDoBtn = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");
const completeTodoList = document.getElementById("complete-todo-list");

// Obtiene la informacion del array y la renderiza
const renderTodos = () => {
  todoList.innerHTML = "";
  for (const todo of todos) {
    const todoItem = todo.buildTodo();

    todoList.appendChild(todoItem);
  }
};

// Funciona para almacenar la informacion en el array
const createTodo = () => {
  const todoText = newToDoInput.value;

  if (todoText === "") {
    return;
  }

  let id = todos.length + 1;

  todos.push(new Todo(id, todoText));
  console.log(todos);

  renderTodos();

  newToDoInput.value = "";
};

const markTodoAsComplete = (id) => {
  // for (const t of todos) {
  //   if (t.id === id) {
  //     t.markAsComplete();
  //     todoList = todoList.slice();
  //   }
  // }

  let todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.markAsComplete();
  }

  completeTask.push(todo);
  deleteTodo(id);
  renderTodos();
};

const updateTodo = (id) => {};

const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
  console.log(`todos`);
  console.log(todos);
  console.log(`completes`);
  console.log(completeTask);
};

addToDoBtn.addEventListener("click", function name(e) {
  e.preventDefault();
  createTodo();
});
