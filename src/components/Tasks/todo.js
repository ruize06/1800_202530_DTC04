import { addPopupEventListeners, hidePopup, showPopup } from '/src/utils.js'
import { onAuthReady } from '/src/authentication.js';
import { db } from "/src/firebaseConfig.js";
import { onSnapshot, collection, getDoc, getDocs, addDoc, setDoc, doc, query, where, deleteDoc, updateDoc, QueryEndAtConstraint } from "firebase/firestore";

import { createShareTaskForm, cancelShareTaskForm, updateSearchResults, shareTasksFromForm } from '/src/components/Tasks/share-task.js';
import { createAddTaskForm, cancelAddTaskForm, addTaskFromForm } from '/src/components/Tasks/add-task.js';

function editTaskFromForm(event, ownerID) {
    event.preventDefault();
    var task_details = new FormData(event.target);
    task_details = Object.fromEntries([...task_details.entries()]);
    // task_details.description = document.getElementsByName("description")[0].value.replace(/\n/g, '<br>')
    const task_doc = doc(db, "tasks", event.target.taskID)
    updateDoc(task_doc, task_details)

    cancelEditTaskForm()
}

function deleteTaskFromForm(event) {
    event.preventDefault();
    const task_doc = doc(db, "tasks", document.getElementById("edit-task-form").taskID)
    deleteDoc(task_doc)

    cancelEditTaskForm()
}

function createEditTaskForm(event) {
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

function cancelEditTaskForm() {
    var _task_form_container = document.getElementById("edit-task-form-container");
    hidePopup(_task_form_container);
}

function updateStats() {
    const _todo_message = document.getElementById("tasksTodoNumber");
    const _done_message = document.getElementById("completedTasksNumber");
    const _all_message = document.getElementById("allTasksNumber");
    const _none_done_message = document.getElementById("noCompletedTasksMessage");

    const _todo = document.getElementById("my-tasks-container").children.length;
    const _done = document.getElementById("completed-list").children.length - 1;

    _todo_message.innerHTML = _todo;
    _done_message.innerHTML = _done;
    _all_message.innerHTML = _todo + _done;

    if (_done == 0) _none_done_message.classList.remove("hidden");
    else _none_done_message.classList.add("hidden");
}

function renderTasks(tasks) {
    // Fetch tasks JSON from server then pass the list into tasks
    // For each task, create a <task-box> element and append it to the task list container
    const task_list = document.getElementById("my-tasks-container");

    tasks.forEach((task) => {
        var task_box = document.createElement("task-box");
        task_list.prepend(task_box);
        task_box.id = task.id
        onSnapshot(doc(db, "tasks", task.id), (docSnap) => {
            if (docSnap.exists()) {
                const task_list = document.getElementById("my-tasks-container");
                const task_box = document.getElementById(docSnap.id)
                const completed_list = document.getElementById("completed-list")
                var share_button = document.createElement("share-button");
                var complete_button = document.createElement("complete-button");

                var taskJSON = docSnap.data();
            
                if (taskJSON["completed"] == true || taskJSON["completed"] == "true") {
                    completed_list.prepend(task_box)
                } else {
                    task_list.prepend(task_box);
                }
                task_box.prepend(complete_button)
                task_box.appendChild(share_button)

                task_box.setAttribute("title", taskJSON["title"]);
                task_box.setAttribute("description", taskJSON["description"]);
                task_box.setAttribute("color", taskJSON["color"]);
                task_box.setAttribute("time", taskJSON["time"]);
                task_box.setAttribute("date", taskJSON["date"]);
                complete_button.setAttribute("checked", taskJSON["completed"]);
               
                complete_button.addEventListener("click", (e) => {
                    setTimeout(async () => {
                        await updateDoc(doc(db, "tasks", e.target.closest("task-box").id), {
                            completed: complete_button.getAttribute("checked")
                        })
                    }, 400)
                })

                const edit_task_form_container = document.getElementById("edit-task-form-container")
                const edit_task_form_cancel = edit_task_form_container.querySelector(".cancelButton")
                addPopupEventListeners(
                    task_box.getElementsByClassName("task-box")[0], edit_task_form_cancel, edit_task_form_container,
                    createEditTaskForm, cancelEditTaskForm);
                const share_task_form_container = document.getElementById("share-task-form-container")
                const share_task_form_cancel = share_task_form_container.querySelector(".cancelButton")
                addPopupEventListeners(
                    task_box.getElementsByClassName("share-icon")[0], share_task_form_cancel, share_task_form_container,
                    createShareTaskForm, cancelShareTaskForm
                );
                updateStats()
            } else {
                console.log("removed task")
                document.getElementById(docSnap.id).remove()
                updateStats()
            }
        })
    })
}

function setup() {
    const add_button = document.getElementById("add-task-button");
    const add_task_form = document.getElementById("add-task-form");
    const add_task_form_container = document.getElementById("add-task-form-container");
    const add_task_form_cancel = add_task_form_container.querySelector(".cancelButton");

    const edit_task_form = document.getElementById("edit-task-form");
    const delete_task_button = edit_task_form["delete"];
    const share_task_search_form = document.getElementById("share-task-search-form");
    const share_task_search_bar = share_task_search_form["searchGroups"];
    const share_task_results_div = document.getElementById("shareSearchResultsDiv");
    const share_task_submit_form = document.getElementById("share-task-form");

    const show_completed_button = document.getElementById("showCompleted");
    const completed_container = document.getElementById('completed-list');

    updateStats()

    onAuthReady(async (user) => {
        const searchParams = new URLSearchParams(window.location.search)
        var todoListOwnerID = null;
        console.log(searchParams.get("type"))
        switch (searchParams.get("type")) {
            case 'user':
                todoListOwnerID = user.uid;
                document.querySelector("bottom-nav").setAttribute("active", 1);
                break;
            case 'group':
                todoListOwnerID = localStorage.getItem("todoGroupID");
                document.querySelector("bottom-nav").setAttribute("active", 2);
                onSnapshot(doc(db, "groups", todoListOwnerID), (docSnap) => {
                    todoListOwnerID = localStorage.getItem("todoGroupID");
                    console.log(todoListOwnerID)
                    if (docSnap.exists()) {
                        const editGroup = document.getElementById("editGroup");
                        const addMember = document.getElementById("addMember");
                        const backBtn = document.getElementById("backBtn")
                        const groupData = docSnap.data()

                        document.getElementById("topNavTitle").innerText = groupData.name;
                        editGroup.classList.remove('hidden');
                        addMember.classList.remove('hidden');
                        backBtn.classList.remove('hidden')

                        const addToOwnCheck = document.getElementById("saveToOwnDiv");
                        addToOwnCheck.classList.remove("hidden");
                    } else {
                        console.warn("No gorup found")
                        window.location.href = "/sharepage_Groups.html"
                    }
                })
                break;
            default:
                console.warn("No todo type specified")
        }
        if (!todoListOwnerID) {
            console.warn("No group ID found");
            window.location.href = "/sharepage_Groups.html";
        }
        const tasks_q = query(collection(db, "tasks"), where("ownerID", "==", todoListOwnerID));
        var tasks = await getDocs(tasks_q)

        // #a Event listeners
        addPopupEventListeners(
            add_button, add_task_form_cancel, add_task_form_container,
            createAddTaskForm, cancelAddTaskForm);
        // // Open task form
        // Post task to server when add_task_form is submitted
        add_task_form?.addEventListener("submit", async (e) => {
            const newTaskDocs = await addTaskFromForm(e, todoListOwnerID);
            renderTasks(newTaskDocs);
        });
        edit_task_form?.addEventListener("submit", (e) => {
            editTaskFromForm(e, todoListOwnerID)
        });
        delete_task_button?.addEventListener("click", deleteTaskFromForm);
        share_task_search_bar?.addEventListener("input", (e) => {
            updateSearchResults(e, share_task_search_bar, share_task_results_div)
        })
        share_task_search_form?.addEventListener("submit", (e) => {
            updateSearchResults(e, share_task_search_bar, share_task_results_div)
        })
        share_task_submit_form?.addEventListener("submit", (e) => {
            shareTasksFromForm(e)
        })
        show_completed_button.addEventListener("click", e => {
            updateStats()
            if (completed_container.classList.contains('completed-list')) {
                show_completed_button.innerHTML = "Hide Completed";
                show_completed_button.classList.add("bg-[var(--secondary-button-bg-color)]")
                show_completed_button.classList.remove("bg-[var(--primary-button-bg-color)]")
                completed_container.classList.remove('hidden');
                setTimeout(() => {
                    completed_container.classList.remove('completed-list');
                    completed_container.classList.add('completed-list-open');
                }, 0)
            } else {
                show_completed_button.innerHTML = "Show Completed";
                show_completed_button.classList.add("bg-[var(--primary-button-bg-color)]")
                show_completed_button.classList.remove("bg-[var(--secondary-button-bg-color)]")
                completed_container.classList.remove('completed-list-open');
                completed_container.classList.add('completed-list');
                setTimeout(() => {completed_container.classList.add('hidden')}, 200);
            }
        })
        // #end-a

        // #a Render tasks to the task list
        renderTasks(tasks);
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

    });
}

document.addEventListener("DOMContentLoaded", setup);