import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "/src/firebaseConfig.js";
import { showPopup, hidePopup, arrayRemove, customClone } from "/src/utils.js";
import { onAuthReady } from "/src/authentication.js";
import { showAlert } from "../Popups/alert.js";

export function updateSearchResults(event, searchInput, resultsDiv) {
  event.preventDefault();
  onAuthReady(async (user) => {
    const query_text = searchInput.value;
    if (query_text === "") {
      var search_query = query(
        collection(db, "groups"),
        where("members", "array-contains", user.uid)
      );
    } else {
      var search_query = query(
        collection(db, "groups"),
        where("name", ">=", query_text),
        where("name", "<=", query_text + "~"), // End of regularly printed unicode characters
        where("members", "array-contains", user.uid)
      );
    }
    const matches_snap = await getDocs(search_query);

    if (matches_snap.empty) {
      resultsDiv.innerHTML = "No matches found.";
    } else {
      resultsDiv.innerHTML = "";
      matches_snap.forEach((element) => {
        const group_match = element.data();
        var _searchResult = document.createElement("search-add-result");
        resultsDiv.append(_searchResult);
        _searchResult.setAttribute("title", group_match.name);
        _searchResult.setAttribute(
          "added",
          resultsDiv.added.includes(element.id)
        );
        _searchResult
          .getElementsByClassName("searchResultAddButton")[0]
          .addEventListener("click", () => {
            resultsDiv.addedRecent = true;
            if (resultsDiv.added.includes(element.id)) {
              _searchResult.setAttribute("added", false);
              arrayRemove(resultsDiv.added, element.id);
            } else {
              _searchResult.setAttribute("added", true);
              resultsDiv.added.push(element.id);
            }
          });
      });
    }
  });
}

export function createShareTaskForm(event) {
  const _share_search_form = document.getElementById("share-task-search-form");
  const _share_form_container = document.getElementById(
    "share-task-form-container"
  );
  const _resultsDiv = document.getElementById("shareSearchResultsDiv");
  _share_search_form?.reset();
  _resultsDiv.innerHTML = "";
  _resultsDiv.added = [];
  showPopup(_share_form_container);
  _share_form_container.focus();
  // Update search results right away to see all groups
  const ev = new Event("submit");
  _share_search_form.dispatchEvent(ev);

  var _tasks_to_share = document.getElementById("tasksToShareDiv");
  _tasks_to_share.innerHTML = "";
  const _to_share_task = event.target.closest("task-box");
  var _task_box = customClone(_to_share_task, _tasks_to_share);
  _task_box.setAttribute("disabled", true);
  _task_box.classList.add("scale-70");
  _task_box.classList.add("pointer-events-none");
}

export function cancelShareTaskForm() {
  const _share_form_container = document.getElementById(
    "share-task-form-container"
  );
  const _resultsDiv = document.getElementById("shareSearchResultsDiv");
  // Requires this because unfocusing when click "add" button
  // My guess is that custom element children don't bubble focus for some reason
  if (_resultsDiv.addedRecent) {
    _resultsDiv.addedRecent = false;
    _share_form_container.focus();
    return;
  }
  hidePopup(_share_form_container);
}

export async function shareTasksFromForm(event) {
  event.preventDefault();
  onAuthReady(async (user) => {
    const _addedGroups = document.getElementById("shareSearchResultsDiv").added;
    const addToOwnCheck = document.getElementById("saveToOwn");
    if (addToOwnCheck.checked) {
      _addedGroups.push(user.uid);
      console.log(_addedGroups);
    }

    if (_addedGroups.length === 0) {
      showAlert("No groups have been added yet!", "warning");
      return;
    }
    const _shareTasksDiv = document.getElementById("tasksToShareDiv");
    const _tasksCollection = collection(db, "tasks");
    for (let task of _shareTasksDiv.children) {
      const taskSnap = await getDoc(doc(_tasksCollection, task.id));
      for (let groupID of _addedGroups) {
        var taskData = taskSnap.data();
        taskData.ownerID = groupID;
        await addDoc(_tasksCollection, taskData);
      }
    }
    cancelShareTaskForm();
    showAlert("Task shared successfully!", "success");
  });
}
