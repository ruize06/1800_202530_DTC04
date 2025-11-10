import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("addMemberPopup");
    const addMemberBtn = document.getElementById("addMember");
    const cancelBtn = document.getElementById("cancelBtn");
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    let currentUserId = null;
    let currentMembers = {};
    let groupId = localStorage.getItem("todoGroupID");

    async function loadMembers(groupId) {
        const membersRef = collection(db, "groups", groupId, "members");
        const snapshot = await getDocs(membersRef);

        const members = {};
        snapshot.forEach(docSnap => {
            members[docSnap.id] = docSnap.data();
        });
        return members;
    }

    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            window.location.href = "/login.html";
            return;
        }
        currentUserId = user.uid;
        currentMembers = await loadMembers(groupId);

        searchBtn.addEventListener("click", async () => {
            const queryText = searchInput.value.trim().toLowerCase();
            searchResults.innerHTML = "";

            const usersRef = collection(db, "userprofiles");
            const snapshot = await getDocs(usersRef);
            const matches = [];

            snapshot.forEach(docSnap => {
                const user = docSnap.data();
                const userId = docSnap.id;

                if (user.username && user.username.toLowerCase().includes(queryText)) {
                    matches.push({ id: userId, ...user });
                }
            });

            if (matches.length === 0) {
                searchResults.innerHTML = "<li class='text-white'>No matches found.</li>";
            } else {
                matches.forEach(user => {
                    const li = document.createElement("li");
                    li.className = "bg-gray-700 p-2 rounded flex justify-between items-center";

                    const span = document.createElement("span");
                    span.textContent = user.username;

                    const addBtn = document.createElement("button");
                    addBtn.className = "px-3 py-1 rounded text-sm";

                    if (currentMembers[user.id]) {
                        addBtn.textContent = "Added";
                        addBtn.disabled = true;
                        addBtn.classList.add("bg-gray-500", "text-white");
                    } else {
                        addBtn.textContent = "Add";
                        addBtn.classList.add("bg-green-600", "text-white");
                        addBtn.addEventListener("click", async () => {
                            addBtn.disabled = true;
                            addBtn.textContent = "Added";
                            addBtn.classList.remove("bg-green-600");
                            addBtn.classList.add("bg-gray-500");

                            const memberRef = doc(db, "groups", groupId, "members", user.id);
                            await setDoc(memberRef, {
                                username: user.username,
                                email: user.email || "",
                                profilePicture: user.profilePicture || "",
                                joinedAt: Date.now()
                            });

                            currentMembers[user.id] = user;
                        });
                    }

                    li.appendChild(span);
                    li.appendChild(addBtn);
                    searchResults.appendChild(li);
                });
            }
        });
    });

    addMemberBtn.addEventListener("click", () => {
        popup.classList.remove("hidden");
        setTimeout(() => popup.classList.remove("translate-y-full"), 10);
    });

    cancelBtn.addEventListener("click", () => {
        popup.classList.add("translate-y-full");
        setTimeout(() => popup.classList.add("hidden"), 300);
    });
});