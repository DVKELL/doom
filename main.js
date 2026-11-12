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

//Funciones de estilos para los botones
function buttonStyles(color) {
  //Objeto con las claves de los colores disponibles
  const opciones = {
    green: "bg-green-600",
    yellow: "bg-yellow-600",
    red: "bg-red-600",
  };

  let styles = `${opciones[color]} cursor-pointer p-2 rounded-md`;

  return styles;
}

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
    //Crea un elemento li
    const todoItem = document.createElement("li");

    // Accede a su propiedad id en HTML y le asigna el id de la instancia en cuestion
    todoItem.id = `todo-${this.id}`;

    // Le agrega estilos al todoItem, que es un li
    todoItem.className =
      "flex justify-between border-b pb-1.5 border-b-cyan-50/20 ";

    // Dentro de la etiqueta li, crea el texto y los botones
    // La funcion buttonStyles le asigna estilos a los botones para evitar repetir codigo
    todoItem.innerHTML = this.completed
      ? `<span class="line-through">${this.text}</span>
        <div class="flex gap-1.5">
          <button
          id="deleteBtn"
          class="${buttonStyles("red")}"
          onClick="deleteTodo(${this.id}, 'complete')">
            Eliminar
          </button>
        </div>
      `
      : // NO ESTAN COMPLETADAS
        `
    ${this.text} 
    <div class="flex gap-1.5">
      <button
        id="completeBtn"
        class="${buttonStyles("green")}" 
        onClick="markTodoAsComplete(${this.id})">
          Completar
      </button>
      <button
        id="updateBtn"
        class="${buttonStyles("yellow")}"
        onClick="updateTodo(${this.id})">Editar</button>
      <button 
      id="deleteBtn" 
      class="${buttonStyles("red")}"
      onClick="deleteTodo(${this.id}, 'todos')">
        Eliminar
      </button>
    </div>
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
  completeTodoList.innerHTML = "";
  for (const todo of todos) {
    // Por cada instancia en la lista, ejecuta su metodo buildTodo() para crear el HTML
    const todoItem = todo.buildTodo();

    // Cada todoItem creado lo pone dentro ul contenedor de tareas
    todoList.appendChild(todoItem);
  }

  for (const complete of completeTask) {
    const completeItem = complete.buildTodo();

    completeTodoList.append(completeItem);
  }
};

// Funciona para almacenar la informacion en el array
const createTodo = () => {
  const todoText = newToDoInput.value;

  if (todoText === "") {
    return;
  }

  let id = todos.length + 1;

  //Agrega a la lista una instancia de la clase Todo
  todos.push(new Todo(id, todoText));

  // console.log(todos); muestra lo que hay en la lista de todos

  renderTodos();

  newToDoInput.value = "";
};

const markTodoAsComplete = (id) => {
  // Busca en la lista todos el id que sea igual al id de la instancia
  let todo = todos.find((todo) => todo.id === id);

  // Cuando lo encuentre se ejecuta su metodo markAsComplete()
  if (todo) {
    todo.markAsComplete();
  }

  // En la lista de tareas completadas, mete la tarea que se acaba de completar
  completeTask.push(todo);

  // Borra de la lista de tareas pendientes a la tarea completada
  deleteTodo(id, "todos");

  // Renderiza todo nuevamente
  renderTodos();
};

const updateTodo = (id) => {
  let todo = todos.find((todo) => todo.id === id);

  if (todo) {
    const newText = prompt("Actualizar la tarea", todo.text);
    if (newText !== null && newText !== "") {
      todo.text = newText;
      renderTodos();
    }
  }
};

const deleteTodo = (id, target) => {
  if (target === "todos") {
    // apunta a la lista todos, y modifica la lista con todos los id, menos el que se pasa por parametro
    todos = todos.filter((todo) => todo.id !== id);

    // Renderiza las tareas nuevamente
    renderTodos();
  } else if (target === "complete") {
    // apunta a la lista completeTask, y modifica la lista con todos los id, menos el que se pasa por parametro
    completeTask = completeTask.filter((complete) => complete.id !== id);

    renderTodos();
  }
};

addToDoBtn.addEventListener("click", function name(e) {
  e.preventDefault();
  createTodo();
});
