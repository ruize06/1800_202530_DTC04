import { addDoc, collection, getDoc } from "firebase/firestore";
import { db } from "/src/firebaseConfig.js"
import { hidePopup, showPopup } from "/src/utils.js";

export async function addTaskFromForm(event, ownerID) {
    event.preventDefault();
    var task_details = new FormData(event.target);
    task_details = Object.fromEntries([...task_details.entries()]);
    // task_details.description = document.getElementsByName("description")[0].value.replace(/\n/g, '<br>')

    task_details.ownerID = ownerID

    const tasks_collection = collection(db, "tasks")
    const docref = await addDoc(tasks_collection, task_details)
    const doc = await getDoc(docref);

    cancelAddTaskForm()
    return [doc];
}

export function createAddTaskForm() {
    var _task_form = document.getElementById("add-task-form");
    var _task_form_container = document.getElementById("add-task-form-container");
    _task_form?.reset();
    showPopup(_task_form_container);
    _task_form_container.focus();
}

export function cancelAddTaskForm() {
    var _task_form_container = document.getElementById("add-task-form-container");
    hidePopup(_task_form_container);
}