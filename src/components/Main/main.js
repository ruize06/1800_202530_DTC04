import { onAuthReady } from "/src/authentication.js";
import { db } from "/src/firebaseConfig.js";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

//Today's Goals Tasks (Personal and Group + New Tasks per Group)
onAuthReady(async (currentUser) => {
  const tasksCollection = collection(db, "tasks");
  const groupsCollection = collection(db, "groups");

  const tasksCountElement = document.getElementById("todays-goal-tasks-count");
  const groupTasksCountElement = document.getElementById(
    "todays-goal-group-count"
  );
  const newTasksContainer = document.getElementById("new-tasks-container");

  // Get all groups the current user is part of
  const groupsSnapshot = await getDocs(
    query(groupsCollection, where("members", "array-contains", currentUser.uid))
  );
  const groupIDs = groupsSnapshot.docs.map((doc) => doc.id);

  const groupMap = {};
  groupsSnapshot.docs.forEach((doc) => {
    groupMap[doc.id] = doc.data().name;
  });

  onSnapshot(tasksCollection, (snapshot) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    let personalCount = 0;
    let groupCount = 0;
    const groupTaskCounts = {};

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.date === todayStr) {
        if (data.ownerID === currentUser.uid) {
          personalCount++;
        } else if (groupIDs.includes(data.ownerID)) {
          groupCount++;
          if (!groupTaskCounts[data.ownerID]) {
            groupTaskCounts[data.ownerID] = 0;
          }
          groupTaskCounts[data.ownerID]++;
        }
      }
    });

    // Today's Goal
    tasksCountElement.textContent =
      personalCount === 0
        ? "No tasks for today"
        : `${personalCount} task${
            personalCount !== 1 ? "s" : ""
          } from your list`;

    groupTasksCountElement.textContent =
      groupCount === 0
        ? "No tasks from your groups"
        : `${groupCount} task${groupCount !== 1 ? "s" : ""} from your groups`;

    // Group Shared Tasks
    newTasksContainer.innerHTML = "";

    if (groupCount === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.textContent = "No shared tasks today";
      emptyMessage.className =
        "text-center text-black bg-[var(--secondary-bg-color)] py-4 rounded-lg";
      newTasksContainer.appendChild(emptyMessage);
      return;
    }

    for (const groupID in groupTaskCounts) {
      const count = groupTaskCounts[groupID];
      const groupName = groupMap[groupID] || "Unknown Group";

      const a = document.createElement("a");
      a.textContent = `${count} task${
        count !== 1 ? "s" : ""
      } from ${groupName}`;
      a.className = `
    block w-full text-left px-4 py-2 bg-[var(--secondary-bg-color)] text-black rounded-lg mb-3 shadow-md
    hover:bg-blue-200 hover:shadow cursor-pointer transition
  `;

      a.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.setItem("todoGroupID", groupID);
        window.location.href = "todo.html?type=group";
      });

      newTasksContainer.appendChild(a);
    }
  });
});
