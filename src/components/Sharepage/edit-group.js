import { collection, getDoc, getDocs, doc, deleteDoc, updateDoc, arrayRemove, query, where } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { showPopup, hidePopup } from "/src/utils.js";

async function deleteGroup(groupRef) {
    const tasks_q = query(
        collection(db, "tasks"),
        where("ownerID", "==", groupRef.id)
    );
    const tasksSnap = await getDocs(tasks_q);
    tasksSnap.forEach(async task => {
        await deleteDoc(task.ref);
    });
    await deleteDoc(groupRef)
}

async function removeMember(groupRef, memberId) {
    await updateDoc(groupRef, {
        members: arrayRemove(memberId)
    });
    const membersList = document.getElementById("groupMembersList");
    for (let element of membersList.children) {
        if (element.id == memberId) membersList.removeChild(element);
    }
    if ((await getDoc(groupRef)).data().members.length === 0) {
        await deleteGroup(groupRef);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("editGroupPopup");
    const editBtn = document.getElementById("editGroup");
    const cancelBtn = document.getElementById("cancelEditBtn");
    const membersList = document.getElementById("groupMembersList");
    const leaveBtn = document.getElementById("leaveGroup");
    const currentGroupId = localStorage.getItem("todoGroupID");

    let currentUserId = null;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUserId = user.uid;
            console.log("Logged in as:", currentUserId);
        }
    });

    editBtn.addEventListener("click", async () => {
        showPopup(popup)

        membersList.innerHTML = "";
        
        const groupRef = doc(db, "groups", currentGroupId);
        const groupSnapshot = await getDoc(groupRef);
        const groupData = groupSnapshot.data()

        groupNameInput.value = groupData.name

        const groupMembers = groupData.members;
        
        groupMembers.forEach(async (memberId) => {
            const memberRef = doc(db, "userprofiles", memberId);
            const memberSnapshot = await getDoc(memberRef);
            const member = memberSnapshot.data();
            
            const memberElement = document.createElement("li");
            memberElement.id  = memberId
            memberElement.className =
            "flex items-center justify-between gap-2 p-2 border rounded";
            membersList.appendChild(memberElement);

            // User
            const span = document.createElement("span");
            span.textContent = member.username || member.email;
            memberElement.appendChild(span);

            // Remove user button
            const btn = document.createElement("button");
            if (memberId !== currentUserId) {
                btn.type = "button";
                memberElement.appendChild(btn);
                btn.textContent = "Remove";
                btn.className =
                    "px-3 py-2 text-sm rounded-full text-white bg-[var(--danger-button-bg-color)] hover:bg-[var(--secondary-button-bg-color)] hover:scale-105";
                btn.addEventListener("click", async () => {
                    await removeMember(groupRef, memberId)
                });
            }
        });
    });

    groupNameChangeForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        const newName = groupNameInput.value.trim();
        if (!newName) {
            return;
        }

        const groupRef = doc(db, "groups", currentGroupId);
        await updateDoc(groupRef, { name: newName });
        console.log("Group name updated to:", newName);
    });

    cancelBtn.addEventListener("click", () => {
        hidePopup(popup)
    });

    leaveBtn.addEventListener("click", async () => {
        await removeMember(doc(db, "groups", currentGroupId), currentUserId);
        window.location.href = "/sharepage_Groups.html"
        alert("Left the group")
    });
});