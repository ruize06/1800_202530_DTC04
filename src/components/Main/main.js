import { onAuthReady } from "/src/authentication.js";
import { db } from "/src/firebaseConfig.js";
import { collection, query, where, onSnapshot } from "firebase/firestore";

//Today's Goals Tasks
onAuthReady((currentUser) => {
  const tasksCollection = collection(db, "tasks");
  const userTasksQuery = query(
    tasksCollection,
    where("ownerID", "==", currentUser.uid)
  );

  const tasksCountElement = document.getElementById("todays-goal-tasks-count");

  function updateTodaysTasks(querySnapshot) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const todayTasks = querySnapshot.docs.filter(
      (doc) => doc.data().date === todayStr
    );

    const taskCount = todayTasks.length;

    if (taskCount === 0) {
      tasksCountElement.textContent = "No tasks for today";
    } else {
      tasksCountElement.textContent = `${taskCount} task${
        taskCount !== 1 ? "s" : ""
      } from your list`;
    }
  }

  onSnapshot(userTasksQuery, (querySnapshot) => {
    updateTodaysTasks(querySnapshot);
  });
});
