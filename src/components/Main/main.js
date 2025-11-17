import { onAuthReady } from "/src/authentication.js";
import { db } from "/src/firebaseConfig.js";
import { collection, query, where, onSnapshot } from "firebase/firestore";
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
          clip: true,
        },
      },
      scales: {
        y: { display: false },
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
