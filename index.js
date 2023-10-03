
const todoForm = document.querySelector(".todo-form");
const inputTodo = document.querySelector("#input-todo");
const todoButton = document.querySelector("#addTodoButton");
const todoLists = document.querySelector("#lists");
const todoMessage = document.querySelector(".message");

const createTodo=(todoId,todoValue)=>{
    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("li-style");
    todoElement.innerHTML =`
    <span> ${todoValue}</span>
    <span><button class = "btn" id = "delete"> <i class = "fa fa-trash"></i></button></span>`;
   
    todoLists.appendChild(todoElement);

    const deleteButton = todoElement.querySelector("#delete");
    deleteButton.addEventListener("click",todoDelete);

}
const todoDelete = (event)=>{
    const selectedTodo = event.target.parentElement.parentElement.parentElement;
    todoLists.removeChild(selectedTodo);
    showMessage("Todo is deleted","delete");
    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo)=>todo.todoId !== selectedTodo.id);
    localStorage.setItem("my-todos",JSON.stringify(todos));
}

const showMessage = (text,status)=>{
    todoMessage.textContent = text;
    todoMessage.classList.add(`bg-${status}`);
    setTimeout(()=>{
        todoMessage.textContent = "";
    todoMessage.classList.remove(`bg-${status}`);

    },1000)

};
const getTodosFromLocalStorage = ()=>{
    return localStorage.getItem("my-todos") ? JSON.parse(localStorage.getItem("my-todos")): [];
}

const addTodo = (event)=>{
    event.preventDefault();
    const todoValue = inputTodo.value;
    const todoId = Date.now().toString();
    createTodo(todoId,todoValue);
    showMessage("Todo is added","success");

    const todos = getTodosFromLocalStorage();
    todos.push({todoId,todoValue});
    localStorage.setItem("my-todos",JSON.stringify(todos));

    inputTodo.value = "";
    
}

const loadTodos = ()=>{
    const todos = getTodosFromLocalStorage();
    todos.map((todo)=>createTodo(todo.todoId,todo.todoValue));
}

todoForm.addEventListener("submit",addTodo);
window.addEventListener("DOMContentLoaded",loadTodos);
