import { addPopupEventListeners } from '/src/utils.js'
import { onAuthReady } from '/src/authentication.js';
import { db, auth } from "/src/firebaseConfig.js";
import { onSnapshot, collection, getDoc, getDocs, addDoc, query, where } from "firebase/firestore";

function hidePopup(popupElement, transitionSpeed=300){
    popupElement?.classList.toggle("translate-y-full", true);
    setTimeout(() => {
        popupElement?.classList.toggle("hidden", true);
    }, transitionSpeed);
}

function showPopup(popupElement){
    popupElement?.classList.toggle("hidden", false);
    setTimeout(() => {
        popupElement?.classList.toggle("translate-y-full", false);
    }, 0);
}

function addTaskFromForm(event) {
    event.preventDefault();
    var task_details = new FormData(event.target);
    task_details = Object.fromEntries([...task_details.entries()]);
    // task_details.description = document.getElementsByName("description")[0].value.replace(/\n/g, '<br>')

    task_details.userID = auth.currentUser.uid

    const tasks_collection = collection(db, "tasks")
    addDoc(tasks_collection, task_details)
        .then( async (docref) => {
            const doc = await getDoc(docref);
            renderTasks([doc]);
        })
    // #todo
    // TODO Post created task to server

    cancelAddTaskForm()
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

    tasks.forEach((task) => {
        console.log(task)
        var task_box = document.createElement("task-box");

        var taskJSON = task.data()
        task_list.appendChild(task_box);

        task_box.setAttribute("title", taskJSON["title"]);
        task_box.setAttribute("description", taskJSON["description"]);
        task_box.setAttribute("color", taskJSON["color"]);
        task_box.setAttribute("time", taskJSON["time"]);
        task_box.setAttribute("date", taskJSON["date"]);
    })
}

function setup (){
    var add_button = document.getElementById("add-task-button");
    var add_task_form = document.getElementById("add-task-form");
    var add_task_form_cancel = document.getElementById("add-task-form-cancel");
    var add_task_form_container = document.getElementById("add-task-form-container");

    // #todo
    // TODO Get task list from server
    
    onAuthReady( async (user) => {
        const tasks_q = query(collection(db, "tasks"), where("userID", "==", user.uid));
        var tasks = await getDocs(tasks_q)

        // #a Event listeners
        addPopupEventListeners(
            add_button, add_task_form_cancel, add_task_form_container,
            createAddTaskForm, cancelAddTaskForm);
        // // Open task form
        // Post task to server when add_task_form is submitted
        add_task_form?.addEventListener("submit", addTaskFromForm);
        // #end-a

        // #todo Example JSON for a task
        // {
        //     title: "Example task",
        //     icon: null,
        //     color: "#a0eeaf",
        //     description: "Longer description goes here",
        //     date: "2025-02-01",
        //     time: "23:21"
        // };
        // #end-todo

        // #a Render tasks to the task list
        renderTasks(tasks);
    });
}

document.addEventListener("DOMContentLoaded", setup);