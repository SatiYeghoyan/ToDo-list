"use strict"
window.addEventListener("DOMContentLoaded",() =>{

    const todoForm = document.querySelector("#todo_form form");
    const todoInput = todoForm.querySelector("input");
    const todoItems = document.querySelector("#todo_items");
    const completed = document.querySelector("#completed");
    const count = document.querySelector("#count");
    const RMAllCompleteBtn = document.querySelector("#todo_footer-right button");
    let todos = [
        {
            text: "Learn Java Script",
            isCompleted: false

        },
        {
            text: "Learn TypeScript",
            isCompleted: false
        }
    ];

createTodoItem(todos);
updateTodosCount(todos);

    todoForm.addEventListener("submit",(e) =>{
        e.preventDefault();
        const value = todoInput.value.trim();
        if(value) {
            todos.push({
                text: value,
                isCompleted: false

            });
createTodoItem(todos);
updateTodosCount(todos);

        }
        e.target.reset();
    });
    RMAllCompleteBtn.addEventListener("click", () =>{
        const newTodos = todos.filter(todo => !todo.isCompleted);
        todos = newTodos;
        createTodoItem(newTodos);
        updateTodosCount(newTodos);
        updateCompleted(newTodos);

    })
    function createTodoItem(todosArr){
        todoItems.innerHTML = "";
        todosArr.forEach(({text, isCompleted}) => {
            todoItems.innerHTML += `
            <div class ="todo_items-item">
            <label>
            <input type = "checkbox"
            ${isCompleted ? "checked" : ""}>
            <span>${text}</span>
            </label>
            <button class = "remove">&times;</button>
            </div>
            `;
            
        });
        checkTodoItem(document.querySelectorAll("input[type = 'checkbox']"));
        removeTodoItem(document.querySelectorAll(".remove"));
    }
   
    function removeTodoItem(removeBtns) {
        removeBtns.forEach((btn , index) =>{
            btn.addEventListener("click",() =>{
                todos.splice(index,1);
                createTodoItem(todos);
                updateTodosCount(todos);
                updateCompleted(todos);

            });
        });
    }
    function checkTodoItem(checkboxInputs) {
        checkboxInputs.forEach((input, index) =>{
           input.addEventListener("change",() =>{
                todos.forEach((todo,todoIndex)=>{
                    if(index === todoIndex) {
                        todo.isCompleted = !todo.isCompleted;
                        createTodoItem(todos);
                        updateCompleted(todos);
                        
                    }
                });
            });
});


    }
function updateCompleted(todosArr){
    completed.textContent = todosArr.filter(todo => todo.isCompleted).length;

}
function updateTodosCount(todosArr) {
    count.textContent = todosArr.length;
}
});