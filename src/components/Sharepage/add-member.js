import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db, auth } from "../../firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import {
  hidePopup,
  showPopup,
  addPopupEventListeners,
} from "/src/utils.js";
import { showAlert } from "../Popups/alert.js";

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("addMemberPopup");
  const addMemberBtn = document.getElementById("addMember");
  const cancelBtn = popup.querySelector(".cancelButton");
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  let currentUserId = null;
  let currentMembers = {};
  let groupId = localStorage.getItem("todoGroupID");

  async function loadMembers(groupId) {
    const groupRef = doc(db, "groups", groupId);
    const groupSnap = await getDoc(groupRef);
    const groupMembers = groupSnap.data().members;

    const members = {};
    groupMembers.forEach(async (memberId) => {
      const memberRef = doc(db, "userprofiles", memberId);
      const memberSnap = await getDoc(memberRef);
      members[memberId] = memberSnap.data();
    });
    return members;
  }

  async function createAddMembersForm () {
    showPopup(popup);
    popup.focus();
    currentMembers = await loadMembers(groupId);
    searchResults.innerHTML = "";
    searchInput.value = "";
  }

  function cancelAddMembersForm () {
    hidePopup(popup);
  }

  async function updateUserSearchResults() {
    const queryText = searchInput.value.trim().toLowerCase();
    searchResults.innerHTML = "";

    const usersRef = query(
      collection(db, "userprofiles"),
      where("username", ">=", queryText),
      where("username", "<=", queryText + "~")
    );
    const userMatches = await getDocs(usersRef);

    if (userMatches.empty) {
      searchResults.innerHTML =
        "<li class='text-[var(--text-color)]'>No matches found.</li>";
    } else {
      searchResults.innerHTML = "";
      const groupRef = doc(db, "groups", groupId);
      userMatches.forEach((match) => {
        const user = match.data();
        var _searchResult = document.createElement("search-add-result");
        searchResults.append(_searchResult);
        const _addButton = _searchResult.querySelector(".searchResultAddButton");
        _searchResult.setAttribute("title", user.username);

        if (match.id in currentMembers) {
          _searchResult.setAttribute("added", true);
          _addButton.disabled = true
        } else _searchResult.setAttribute("added", false);

        _addButton.addEventListener("click", async () => {
            if (match.id in currentMembers) {
              _addButton.disabled = true;
            } else {
              _searchResult.setAttribute("added", true);
              await updateDoc(groupRef, {
                members: arrayUnion(match.id),
              });
              currentMembers[match.id] = user;
              showAlert(
                `${user.username} has been added to the group!`,
                "success"
              );
            }
          });
      });
    }
  }

  onAuthStateChanged(auth, async (user) => {
    currentUserId = user.uid;
    currentMembers = await loadMembers(groupId);

    searchBtn.addEventListener("click", updateUserSearchResults);
    searchInput.addEventListener("input", updateUserSearchResults);
  });

  addPopupEventListeners(addMemberBtn, cancelBtn, popup, createAddMembersForm, cancelAddMembersForm);
});
