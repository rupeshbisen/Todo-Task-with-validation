// get the parent elments of form elements and table elements Id
const todoTable = document.getElementById("tbody");
const todoForm = document.getElementById("todo-form");

// submit the the task to the Todo 
todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodo();
});


//  Check TODO Validation 
let formValidation = () => {
    if (input.value === "") {
        msg.innerHTML = "Post cannot be blank";
        console.log("failure");
    } else {
        console.log("successs");
        msg.innerHTML = "";
        addTodo();
    } 
};

// Define the array 
let todos = [];

// Add the todo
function addTodo() {
    const Id = document.getElementById("Id").value;
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const hobbies = document.getElementById("hobbies").value;
    const todo = { Id, fullname, email, hobbies };
    todos.push(todo);
    renderTodos();
    todoForm.reset();
}
// for deleting the Todo 
function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}
// for updating the Todo 
function updateTodoRow(row, index) {
    document.getElementById("Id").value = row.cells[0].innerText;
    document.getElementById("fullname").value = row.cells[1].innerText;
    document.getElementById("email").value = row.cells[2].innerText;
    document.getElementById("hobbies").value = row.cells[3].innerText;
    row.remove();
    todos.splice(index, 1);
}
// Render the array of objects in the table
function renderTodos() {
    todoTable.innerHTML = "";
    todos.forEach((todo, index) => {
        const row = document.createElement("tr");
        const IdCell = document.createElement("td");
        const fullnameCell = document.createElement("td");
        const emailCell = document.createElement("td");
        const hobbiesCell = document.createElement("td");
        const actionsCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        const updateButton = document.createElement("button");
        const checkbox = document.createElement("input");

        IdCell.innerText = todo.Id;
        IdCell.className = "input-feild";
        fullnameCell.innerText = todo.fullname;
        fullnameCell.className = "input-feild";
        emailCell.innerText = todo.email;
        emailCell.className = "input-feild";
        hobbiesCell.innerText = todo.hobbies;
        hobbiesCell.className = "input-feild";
        actionsCell.className = "action-td";

        checkbox.type = "checkbox";
        checkbox.className = "checkbox-size";
        checkbox.checked = false;

        // checkbox validation 
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                deleteButton.disabled = false;
                updateButton.disabled = false;
            } else {
                deleteButton.disabled = true;
                updateButton.disabled = true;
            }
        });

        deleteButton.innerText = "Delete";
        deleteButton.className = "delete-color";
        deleteButton.disabled = true;
        deleteButton.addEventListener("click", () => deleteTodo(index));

        updateButton.innerText = "Update";
        updateButton.className = "edit-color";
        updateButton.disabled = true;
        updateButton.addEventListener("click", () => {
            updateTodoRow(row, index)
        });

        actionsCell.appendChild(deleteButton);
        actionsCell.appendChild(updateButton);
        actionsCell.appendChild(checkbox);

        row.appendChild(IdCell);
        row.appendChild(fullnameCell);
        row.appendChild(emailCell);
        row.appendChild(hobbiesCell);
        row.appendChild(actionsCell);

        todoTable.appendChild(row);
    });
}


