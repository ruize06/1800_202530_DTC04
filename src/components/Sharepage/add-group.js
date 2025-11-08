import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('addGroupPopup');
    const addGroupBtn = document.getElementById('addGroupBtn');
    const cancelBtn = document.getElementById('cancelGroupBtn');
    const saveBtn = document.getElementById('saveGroupBtn')
    const groupList = document.getElementById('groupList')
    const groupName = document.getElementById('addGroupName')
    const noGroupName = document.getElementById('noGroupName')
    let currentUserId = null;

    async function loadGroups(userId) {
        const groupsRef = collection(db, "userprofiles", userId, "groups");
        const snapshot = await getDocs(groupsRef);

        snapshot.forEach(doc => {
            const group = doc.data();

            const groupDiv = document.createElement('div');
            groupDiv.className = "flex items-center bg-gray-200 p-3 rounded-full";

            const nameTag = document.createElement('h1');
            nameTag.textContent = group.name;
            nameTag.className = "font-bold";

            groupDiv.appendChild(nameTag);
            groupList.appendChild(groupDiv);
        });
    }

    addGroupBtn.addEventListener('click', () => {
        popup.classList.remove('hidden');
    });

    cancelBtn.addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = "/login.html";
            return;
        }
        currentUserId = user.uid;
        loadGroups(currentUserId);
    })

    saveBtn.addEventListener('click', async () => {
        if (!groupName.value.trim()) {
            noGroupName.classList.remove('hidden');
            return;
        }

        const groupId = crypto.randomUUID();
        const groupRef = doc(db, "userprofiles", currentUserId, "groups", groupId);

        await setDoc(groupRef, {
            name: groupName.value.trim(),
        });

        const groupDiv = document.createElement('div');
        groupDiv.className = "flex items-center bg-gray-200 p-3 rounded-full";

        const nameTag = document.createElement('h1');
        nameTag.textContent = groupName.value;
        nameTag.className = "font-bold";

        groupDiv.appendChild(nameTag);
        groupList.appendChild(groupDiv);

        groupName.value = "";
        noGroupName.classList.add('hidden');
        popup.classList.add('hidden');
    });
});