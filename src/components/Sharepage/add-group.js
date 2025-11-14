import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { showPopup, hidePopup } from "/src/utils.js";

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('addGroupPopup');
    const addGroupBtn = document.getElementById('addGroupBtn');
    const cancelBtn = document.getElementById('cancelGroupBtn');
    const saveBtn = document.getElementById('saveGroupBtn');
    const groupList = document.getElementById('groupList');
    const groupName = document.getElementById('addGroupName');
    const noGroupName = document.getElementById('noGroupName');
    let currentUserId = null;

    function createGroupElement(groupId, groupNameText) {
        const groupDiv = document.createElement('div');
        groupDiv.className = "flex items-center bg-gray-200 p-3 rounded-full";

        const nameTag = document.createElement('h1');
        nameTag.textContent = groupNameText;
        nameTag.className = "font-bold";

        groupDiv.appendChild(nameTag);

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
            const groupDiv = createGroupElement(groupId, group.name);
            groupList.appendChild(groupDiv);
        }
    }

    addGroupBtn.addEventListener('click', () => {
        showPopup(popup)
    });

    cancelBtn.addEventListener('click', () => {
        hidePopup(popup)
    });

    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = "/login.html";
            return;
        }
        currentUserId = user.uid;
        loadGroups();
    });

    saveBtn.addEventListener('click', async () => {
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
        popup.classList.add('hidden');
    });
});




