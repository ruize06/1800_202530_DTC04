import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("editGroupPopup");
    const editBtn = document.getElementById("editGroup");
    const cancelBtn = document.getElementById("cancelEditBtn");
    const membersList = document.getElementById("groupMembersList");
    const leaveBtn = document.getElementById("leaveGroup");
    const saveBtn = document.getElementById("saveEditBtn")
    const currentGroupId = localStorage.getItem("todoGroupID");

    let currentUserId = null;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUserId = user.uid;
            console.log("Logged in as:", currentUserId);
        }
    });

    editBtn.addEventListener("click", async () => {
        popup.classList.remove("hidden");
        setTimeout(() => popup.classList.remove("translate-y-full"), 10);

        membersList.innerHTML = "";

        const membersRef = collection(db, "groups", currentGroupId, "members");
        const snapshot = await getDocs(membersRef);

        snapshot.forEach((docSnap) => {
            const member = docSnap.data();

            const li = document.createElement("li");
            li.className =
                "flex items-center justify-between gap-2 p-2 border rounded";

            const span = document.createElement("span");
            span.textContent = member.username || member.email || docSnap.id;

            const btn = document.createElement("button");
            btn.type = "button";
            btn.textContent = "Remove";
            btn.className =
                "px-3 py-2 text-sm rounded-full bg-[#921f3c] text-white hover:bg-[var(--secondary-button-bg-color)]";

            btn.addEventListener("click", async () => {
                const memberRef = doc(db, "groups", currentGroupId, "members", docSnap.id);
                await deleteDoc(memberRef);

                li.remove();
            });

            li.appendChild(span);
            li.appendChild(btn);
            membersList.appendChild(li);
        });
    });

    saveBtn.addEventListener("click", async (e) => {
        const newName = groupNameInput.value.trim();
        if (!newName) {
            return;
        }

        const groupRef = doc(db, "groups", currentGroupId);
        await updateDoc(groupRef, { name: newName });
        console.log("Group name updated to:", newName);
    });

    cancelBtn.addEventListener("click", () => {
        popup.classList.add("translate-y-full");
        setTimeout(() => popup.classList.add("hidden"), 300);
    });

    leaveBtn.addEventListener("click", async () => {

        const memberRef = doc(db, "groups", currentGroupId, "members", currentUserId);
        await deleteDoc(memberRef);

        window.location.href = "sharepage_Groups.html"
    });
});