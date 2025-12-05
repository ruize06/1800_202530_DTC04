import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "/src/firebaseConfig.js";
import { showPopup, hidePopup } from "/src/utils.js";

export function editTaskFromForm(event, ownerID) {
    event.preventDefault();
    var task_details = new FormData(event.target);
    task_details = Object.fromEntries([...task_details.entries()]);
    const task_doc = doc(db, "tasks", event.target.taskID || ownerID)
    updateDoc(task_doc, task_details)

    cancelEditTaskForm()
}

export function deleteTaskFromForm(event) {
    event.preventDefault();
    const task_doc = doc(db, "tasks", document.getElementById("edit-task-form").taskID)
    deleteDoc(task_doc)

    cancelEditTaskForm()
}

export function createEditTaskForm(event) {
    var _task_form = document.getElementById("edit-task-form");
    var _task_form_container = document.getElementById("edit-task-form-container");
    _task_form?.reset()
    const task_box = event.target.closest("task-box")
    showPopup(_task_form_container)

    _task_form.taskID = task_box.id
    _task_form["title"].value = task_box.title;
    _task_form["description"].value = task_box.getAttribute("description");
    _task_form["color"].value = task_box.getAttribute("color");
    _task_form["time"].value = task_box.getAttribute("time");
    _task_form["date"].value = task_box.getAttribute("date");
    _task_form_container.focus();
}

export function cancelEditTaskForm() {
    var _task_form_container = document.getElementById("edit-task-form-container");
    hidePopup(_task_form_container);
}
