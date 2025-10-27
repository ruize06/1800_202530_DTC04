// #todo
// TODO: Test JSON stringify and parse for nested objects (i.e. date and time)

function hidePopup(popupElement){
    popupElement?.classList.toggle("translate-y-full", true);
    setTimeout(() => {
        popupElement?.classList.toggle("hidden", true);
    }, 300);
}

function showPopup(popupElement){
    popupElement?.classList.toggle("hidden", false);
    setTimeout(() => {
        popupElement?.classList.toggle("translate-y-full", false);
    }, 1);
}

function addTaskFromForm(event) {
    event.preventDefault();
    var task_details = new FormData(event.target);
    console.log(JSON.stringify(task_details))
}

function createAddTaskForm(){
    var add_task_form = document.getElementById("add-task-form");
    var add_task_form_container = document.getElementById("add-task-form-container");
    add_task_form?.reset();
    showPopup(add_task_form_container);
    add_task_form_container.focus();
}

function cancelAddTaskForm(){
    var add_task_form_container = document.getElementById("add-task-form-container");
    hidePopup(add_task_form_container);
}

function renderTasks (tasks){
    // Fetch tasks JSON from server then pass the list into tasks
    // For each task, create a <task-box> element and append it to the task list container
    var task_list = document.getElementById("my-tasks-container");

    for (let i=0; i<tasks.length; i++){ 
        var task_box = document.createElement("task-box");

        var task = JSON.parse(tasks[i]);
        task_list.appendChild(task_box);

        for (let attribute in task){
            console.log(attribute);
            if (typeof task[attribute] === "object") {
                console.log(task[attribute])
                task[attribute] = JSON.stringify(task[attribute])
            }
            task_box.setAttribute(attribute, task[attribute]);
        }
    }
}

function setup (){
    var add_button = document.getElementById("add-task-button");
    var add_task_form = document.getElementById("add-task-form");
    var add_task_form_cancel = document.getElementById("add-task-form-cancel");
    var add_task_form_container = document.getElementById("add-task-form-container");

    // #todo
    // TODO Get task list from server
    var tasks = [];

    // #a Event listeners
    // Open task form
    add_button?.addEventListener("click", createAddTaskForm);
    // Cancel task form
    add_task_form_cancel?.addEventListener("click", cancelAddTaskForm);
    add_task_form_container?.addEventListener(
        "focusout", () => {
            this.timer = setTimeout(cancelAddTaskForm, 0);
    });
    add_task_form_container?.addEventListener(
        "focusin", () => {
            clearTimeout(this.timer);
    });

    // Post task to server when add_task_form is submitted
    add_task_form?.addEventListener("submit", addTaskFromForm);
    // #end-a

    // #todo Example JSON for a task
    var new_task = {
        title: "Example task",
        icon: null,
        color: "#a0eeaf",
        description: "Longer description goes here",
        date: {
            "day": 25,
            "month": 10,
            "year": 2025
        },
        time: {
            "hour": 14,
            "minute": 30
        }
    };
    tasks.push(JSON.stringify(new_task));
    // #end-todo

    // #a Render tasks to the task list
    renderTasks(tasks);
}

document.addEventListener("DOMContentLoaded", setup);