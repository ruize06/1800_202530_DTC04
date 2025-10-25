var task_list = document.getElementById("my-tasks-container");

var task = document.createElement("task-box")
// Exmaple JSON for a task
var task_details = {
    title: "My task",
    icon: null,
    color: "#a0eeaf",
    date: `{
        "day": 25,
        "month": 10,
        "year": 2025
    }`,
    time: `{
        "hour": 14,
        "minute": 30
    }`,
}
for (let attr in task_details){
    task.setAttribute(attr, task_details[attr]);
}

console.log(task);
task_list.appendChild(task);