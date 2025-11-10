import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

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

        groupDiv.addEventListener('click', () => {
            localStorage.setItem("todoGroupID", groupId);
            window.location.href = `/todo.html?type=group`;
        });

        return groupDiv;
    }

    async function loadGroups() {
        const groupsRef = collection(db, "groups");
        const snapshot = await getDocs(groupsRef);

        groupList.innerHTML = "";

        for (const docSnap of snapshot.docs) {
            const group = docSnap.data();
            const groupId = docSnap.id;

            const membersRef = collection(db, "groups", groupId, "members");
            const membersSnap = await getDocs(membersRef);
            const isMember = membersSnap.docs.some(m => m.id === currentUserId);

            if (isMember) {
                const groupDiv = createGroupElement(groupId, group.name);
                groupList.appendChild(groupDiv);
            }
        }
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
        loadGroups();
    });

    saveBtn.addEventListener('click', async () => {
        if (!groupName.value.trim()) {
            noGroupName.classList.remove('hidden');
            return;
        }

        const groupId = crypto.randomUUID();
        const groupRef = doc(db, "groups", groupId);

        await setDoc(groupRef, {
            name: groupName.value.trim(),
            createdBy: currentUserId,
            createdAt: Date.now()
        });

        const memberRef = doc(db, "groups", groupId, "members", currentUserId);
        const userDoc = await getDoc(doc(db, "userprofiles", currentUserId));
        const userProfile = userDoc.exists() ? userDoc.data() : {};
        await setDoc(memberRef, {
            username: userProfile.username || "",
            email: userProfile.email || "",
            profilePicture: userProfile.profilePicture || "",
            joinedAt: Date.now()
        });

        const groupDiv = createGroupElement(groupId, groupName.value.trim());
        groupList.appendChild(groupDiv);

        groupName.value = "";
        noGroupName.classList.add('hidden');
        popup.classList.add('hidden');
    });
});




