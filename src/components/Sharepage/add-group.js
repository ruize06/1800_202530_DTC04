import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { showPopup, hidePopup, addPopupEventListeners } from "/src/utils.js";

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('addGroupPopup');
    const addGroupBtn = document.getElementById('addGroupBtn');
    const cancelBtn = popup.querySelector(".cancelButton");
    const createGroupForm = document.getElementById('createNewGroupForm');
    const groupList = document.getElementById('groupList');
    const groupName = document.getElementById('addGroupName');
    const noGroupName = document.getElementById('noGroupName');
    let currentUserId = null;

    function createGroupElement(groupId, groupNameText, groupTasksNumber) {
        const groupDiv = document.createElement('div');
        groupDiv.className = `
            text-center from-[var(--secondary-bg-color)] to-[var(--gradient-bg-color)] bg-gradient-to-br
            px-6 py-2 flex flex-row justify-between rounded-full shadow-lg hover:scale-105 transition-transform duration-200`;

        const nameTag = document.createElement('h1');
        nameTag.textContent = groupNameText;
        nameTag.className = "font-bold";

        groupDiv.appendChild(nameTag);

        const tasksTag = document.createElement('h1');
        tasksTag.textContent = `Tasks: ${groupTasksNumber || 0}`;
        tasksTag.className = "font-semibold";

        groupDiv.appendChild(tasksTag);

        groupDiv.addEventListener('click', async () => {
            localStorage.setItem("todoGroupID", groupId);
            window.location.href = `/todo.html?type=group`;
        });

        return groupDiv;
    }

    async function loadGroups() {
        const groups_q = query(
            collection(db, "groups"),
            where("members", "array-contains", currentUserId));
        const snapshot = await getDocs(groups_q);

        groupList.innerHTML = "";

        for (const docSnap of snapshot.docs) {
            const group = docSnap.data();
            const groupId = docSnap.id;
            const tasksQuery = query(
                collection(db, "tasks"),
                where("ownerID", "==", groupId));
            const tasks = await getDocs(tasksQuery);
            const groupDiv = createGroupElement(groupId, group.name, tasks.docs.length);
            groupList.appendChild(groupDiv);
        }
    }

    function createCreateGroupForm() {
        showPopup(popup);
        popup.focus()
    }

    function cancelCreateGroupForm() {
        hidePopup(popup);
    }

    async function createGroupFromForm(e) {
        e.preventDefault()
        if (!groupName.value.trim()) {
            noGroupName.classList.remove('hidden');
            return;
        }

        const newGroup = await addDoc(collection(db, "groups"), {
            name: groupName.value.trim(),
            createdBy: currentUserId,
            createdAt: Date.now(),
            members: [currentUserId]
        });
        const groupId = newGroup.id

        const groupDiv = createGroupElement(groupId, groupName.value.trim());
        groupList.appendChild(groupDiv);

        groupName.value = "";
        noGroupName.classList.add('hidden');
        cancelCreateGroupForm();
    }
    onAuthStateChanged(auth, (user) => {
        currentUserId = user.uid;
        loadGroups();
    });

    addPopupEventListeners(addGroupBtn, cancelBtn, popup, createCreateGroupForm, cancelCreateGroupForm);

    createGroupForm.addEventListener('submit', createGroupFromForm);

});


