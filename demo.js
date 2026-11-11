// Selectores
/*
    permiten seleccionar elementos del DOM mediante varios metodos como 
    ID, clases, o nombre de la etiqueta
*/
const newToDoInput = document.getElementById("new-todo");
const addToDoBtn = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");

/* Event Listener
    Permite definir lo que quieres que el elemento haga cuando se ejecute una accion
    en especifico, como clicks, o submits
*/
addToDoBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const newToDo = newToDoInput.value;

  const newToDoItem = document.createElement("li");
  //   newToDoItem.textContent = newToDo;
  newToDoItem.innerHTML = `
    ${newToDo}
    <button class="deleteBtn">Detele</button>
    `;
  newToDoInput.value = "";
  todoList.appendChild(newToDoItem);
});
