import { onAuthReady } from "/src/authentication.js";
import { db } from "/src/firebaseConfig.js";
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";

import { Chart } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const chartElement = document.getElementById("weeklyTasksChart")
const style =  window.getComputedStyle(document.body)
const chartDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
const chartOptions = {
      animation: false,
      plugins: {
        legend: { display: false },
        datalabels: {
          color: style.getPropertyValue("--text-color"),
          anchor: "end",
          align: "start",
          clamp: false,
          clip: true,
          offset: 0
        },
      },
      responsive: true,
      scales: {
        y: { display: false, suggestedMax: 4 },
        x: { grid: { display: false } }
      }
};

const weekChart = new Chart(
  chartElement, {
    type: 'bar',
    data: {
      labels: chartDays,
      datasets: [{
        label: "Tasks this week",
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: style.getPropertyValue("--secondary-bg-color"),
        borderColor: style.getPropertyValue("--primary-border-color"),
        borderWidth: 1,
      }]
    },
    plugins: [ChartDataLabels],
    options: chartOptions
  }
);

function getDatesTasks (date, querySnapshot) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const dateTasks = querySnapshot.docs.filter(
      (doc) => doc.data().date === dateStr
    );
    return dateTasks;
  }

function updateWeeksTasksChart(querySnapshot) {
  const date = new Date();
  const weekday = date.getDay();
  date.setDate(date.getDate() - weekday)

  var weekTasksCount = [];
  for (let i=0; i<7; i++) {
    const taskCount = getDatesTasks(date, querySnapshot).length;
    weekTasksCount.push(taskCount);
    date.setDate(date.getDate() + 1);
  }
  console.log(weekTasksCount);
  weekChart.data.datasets[0].data = weekTasksCount;
  weekChart.update();
}

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

  onSnapshot(tasksCollection, async (snapshot) => {
    const today = new Date();
    // const yyyy = today.getFullYear();
    // const mm = String(today.getMonth() + 1).padStart(2, "0");
    // const dd = String(today.getDate()).padStart(2, "0");
    // const todayStr = `${yyyy}-${mm}-${dd}`;

    let personalCount = 0;
    let groupCount = 0;
    const groupTaskCounts = {};
    const personalTasksQuerySnapshot = await getDocs(query(tasksCollection, where("ownerID", "==", currentUser.uid)));
    personalCount = getDatesTasks(today, personalTasksQuerySnapshot).length;
    for (let groupID of groupIDs) {
      const tasksQuerySnapshot = await getDocs(query(tasksCollection, where("ownerID", "==", groupID)));
      let task_count = getDatesTasks(today, tasksQuerySnapshot).length;
      groupCount += task_count;
      groupTaskCounts[groupID] = task_count;
    }
    console.log("Group Count: " + groupCount)
//  Old
    // snapshot.docs.forEach((doc) => {
    //   const data = doc.data();
    //   if (data.date === todayStr) {
    //     if (data.ownerID === currentUser.uid) {
    //       personalCount++;
    //     } else if (groupIDs.includes(data.ownerID)) {
    //       groupCount++;
    //       if (!groupTaskCounts[data.ownerID]) {
    //         groupTaskCounts[data.ownerID] = 0;
    //       }
    //       groupTaskCounts[data.ownerID]++;
    //     }
    //   }
    // });

    // Week's Goals ( Personal )
    // TODO Make chart for groups and personal
    updateWeeksTasksChart(personalTasksQuerySnapshot);

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
  // onSnapshot(userTasksQuery, (querySnapshot) => {
  //   updateTodaysTasks(querySnapshot);
  //   updateWeeksTasksChart(querySnapshot);
});
