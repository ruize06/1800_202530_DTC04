import { onAuthReady } from "/src/authentication.js";
import { db } from "/src/firebaseConfig.js";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

//Today's Goals Tasks (Personal and Group)
onAuthReady(async (currentUser) => {
  const tasksCollection = collection(db, "tasks");
  const groupsCollection = collection(db, "groups");

  const tasksCountElement = document.getElementById("todays-goal-tasks-count");
  const groupTasksCountElement = document.getElementById(
    "todays-goal-group-count"
  );

  const groupsSnapshot = await getDocs(
    query(groupsCollection, where("members", "array-contains", currentUser.uid))
  );
  const groupIDs = groupsSnapshot.docs.map((doc) => doc.id);

  onSnapshot(tasksCollection, (snapshot) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    let personalCount = 0;
    let groupCount = 0;

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.date === todayStr) {
        if (data.ownerID === currentUser.uid) {
          personalCount++;
        } else if (groupIDs.includes(data.ownerID)) {
          groupCount++;
        }
      }
    });

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
  });
});
