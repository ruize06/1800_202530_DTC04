
export function createShareTaskForm(event) {
    var _share_form = document.getElementById("share-task-form");
    var _share_form_container = document.getElementById("share-task-form-container");
    _share_form?.reset()
    showPopup(_share_form_container)
}

export function cancelShareTaskForm() {
    var _share_form_container = document.getElementById("share-task-form-container");
    hidePopup(_share_form_container);
}