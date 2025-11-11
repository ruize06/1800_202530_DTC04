import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "/src/firebaseConfig.js"
import { showPopup, hidePopup, arrayRemove } from "/src/utils.js";
import { onAuthReady } from "/src/authentication.js";

export function updateSearchResults(event, searchInput, resultsDiv) {
    event.preventDefault()
    onAuthReady (async (user) => {
        const query_text = searchInput.value
        if (query_text === "") {
            var search_query = query(
                collection(db, "groups"),
                where("members", "array-contains", user.uid))
        } else {
            var search_query = query(
                collection(db, "groups"),
                where("name", ">=", query_text),
                where("name", "<=", query_text + "~"), // End of regularly printed unicode characters
                where("members", "array-contains", user.uid))
        }
        const matches_snap = await getDocs(search_query)

        if (matches_snap.empty) {
            resultsDiv.innerHTML = "No matches found.";
        } else {
            resultsDiv.innerHTML = "";
            matches_snap.forEach(element => {
                const group_match = element.data()
                var _searchResult = document.createElement("search-add-result")
                resultsDiv.append(_searchResult)
                _searchResult.setAttribute("title", group_match.name)
                _searchResult.setAttribute("added", resultsDiv.added.includes(element.id))
                _searchResult.getElementsByClassName("searchResultAddButton")[0]
                    .addEventListener("click", () => {
                        resultsDiv.addedRecent = true
                        if (resultsDiv.added.includes(element.id)) {
                            _searchResult.setAttribute("added", false)
                            arrayRemove(resultsDiv.added, element.id)
                        } else {
                            _searchResult.setAttribute("added", true)
                            resultsDiv.added.push(element.id)
                        }
                    }
                )
            })
        }
    })
}

export function createShareTaskForm() {
    const _share_form = document.getElementById("share-task-form");
    const _share_form_container = document.getElementById("share-task-form-container");
    const _resultsDiv = document.getElementById("shareSearchResultsDiv")
    _share_form?.reset()
    _resultsDiv.innerHTML = "";
    _resultsDiv.added = []
    showPopup(_share_form_container)
    _share_form_container.focus()
    // Update search results right away to see all groups
    const ev = new Event("submit")
    _share_form.dispatchEvent(ev)
}

export function cancelShareTaskForm() {
    const _share_form_container = document.getElementById("share-task-form-container");
    const _resultsDiv = document.getElementById("shareSearchResultsDiv")
    // Requires this because unfocusing when click "add" button
    // My guess is that custom element children don't bubble focus for some reason
    if (_resultsDiv.addedRecent) {
        _resultsDiv.addedRecent = false
        _share_form_container.focus()
        return
    }
    hidePopup(_share_form_container);
}