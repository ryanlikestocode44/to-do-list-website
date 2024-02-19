const todoInput = document.querySelector('#input-todo');
const addButton = document.querySelector('.add-btn');
const todoLists = document.querySelector('#todo-list');
const deleteIcon = document.querySelector('.delete');
const clearButton = document.querySelector('.clear-btn');
const showButton = document.querySelector('.show-btn');

todoInput.addEventListener('keyup', () => {
    let userInputValue = todoInput.value;

    addButton.classList.toggle('active', userInputValue.trim() != 0)

    // if (userInputValue.trim() != 0) {
    //     addButton.classList.add('active');
    // } else {
    //     addButton.classList.remove('active');
    // }
})

addButton.addEventListener('click', () => {
    let userInputValue = todoInput.value;
    let tasks = JSON.parse(localStorage.getItem('New Task')) || [];

    // if (taskLocalStorage == null) {
    //     tasks = [];
    // } else {
    //     tasks = JSON.parse(taskLocalStorage)
    // }

    tasks.push(userInputValue);
    localStorage.setItem('New Task', JSON.stringify(tasks));
    displayTasks();
});

const displayTasks = () => {
    let tasks = JSON.parse(localStorage.getItem('New Task')) || [];

    addButton.classList.toggle('active', tasks.length > 0);
    
    const newListTask = tasks.map((element, index) => `
            <li class="todo">
                <p>${element}</p>
                <div class="controls">
                    <i class="fa fa-trash-o delete" aria-hidden="true" onclick="deleteTask(${index})"></i>
                </div>
            </li> 
        `).join('');

    todoLists.innerHTML = newListTask;
    todoInput.value = '';
}

const deleteTask = (index) => {
    let tasks = JSON.parse(localStorage.getItem('New Task')) || [];

    tasks.splice(index, 1);
    localStorage.setItem("New Task", JSON.stringify(tasks))
    displayTasks();
};

clearButton.addEventListener('click', () => {
    let tasks = JSON.parse(localStorage.getItem('New Task')) || [];

    if (tasks.length === 0) {
        alert('No task has been added')
    } else {
        let clearConfirm = confirm('Are you sure you want to clear all the tasks?');

        if (clearConfirm === true) {
            tasks = [];
            localStorage.setItem('New Task', JSON.stringify(tasks))
            displayTasks();
        }
    }
})

showButton.addEventListener('click', () => {
    let tasks = JSON.parse(localStorage.getItem('New Task')) || [];

    if (tasks.length == 0) {
        alert('No task has been added')
    } else {
        const newListTask = tasks.map((element, index) => `
            <li class="todo">
                <p>${element}</p>
                <div class="controls">
                    <i class="fa fa-trash-o delete" aria-hidden="true" onclick="deleteTask(${index})"></i>
                </div>
            </li> 
        `).join('');
    
        todoLists.innerHTML = newListTask;
        todoInput.value = ''
    }
})