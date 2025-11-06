import { db, auth } from "/src/firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

// Get date
function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Display today's tasks
function renderTasks(tasks) {
  const container = document.getElementById("my-tasks-container");
  container.innerHTML = "";

  if (tasks.length === 0) {
    container.innerHTML = `<p class="text-gray-500 mt-2">No tasks for today 🎉</p>`;
    return;
  }

  tasks.forEach((task) => {
    const card = document.createElement("div");
    card.className =
      "p-3 my-2 bg-gray-100 rounded-lg border border-gray-300 shadow-sm";

    card.innerHTML = `
      <h3 class="text-lg font-semibold text-gray-800">${task.title}</h3>
      <p class="text-sm text-gray-600">${task.description || ""}</p>
      <p class="text-xs text-gray-500 mt-1">Due: ${task.date}</p>
    `;

    container.appendChild(card);
  });
}

function setup() {
  const todayDate = getTodayDate();

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      console.log("User not logged in.");
      document.getElementById("my-tasks-container").innerHTML =
        "<p>Please log in to see your tasks.</p>";
      return;
    }

    console.log("Logged in user:", user.uid);

    try {
      const q = query(
        collection(db, "tasks"),
        where("userID", "==", user.uid),
        where("date", "==", todayDate)
      );
      const snapshot = await getDocs(q);

      const tasks = snapshot.docs.map((doc) => doc.data());
      renderTasks(tasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      document.getElementById("my-tasks-container").innerHTML =
        "<p>Failed to load tasks.</p>";
    }
  });
}

document.addEventListener("DOMContentLoaded", setup);
