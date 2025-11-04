import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('addFriendsPopup');
    const addFriendsBtn = document.getElementById('addFriendsBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const friendsList = document.querySelector('.flex.flex-col.gap-3');

    let currentUserId = null;

    async function loadFriends(userId) {
        const friendsRef = collection(db, "userprofiles", userId, "friends");
        const snapshot = await getDocs(friendsRef);

        snapshot.forEach(doc => {
            const friend = doc.data();

            const friendDiv = document.createElement('div');
            friendDiv.className = "flex items-center gap-2 bg-gray-200 p-1 rounded-full";

            const img = document.createElement('img');
            img.src = friend.profilePicture || "images/person.png";
            img.alt = "";
            img.className = "max-w-[50px]";

            const nameTag = document.createElement('h1');
            nameTag.textContent = friend.username;
            nameTag.className = "font-bold";

            friendDiv.appendChild(img);
            friendDiv.appendChild(nameTag);
            friendsList.appendChild(friendDiv);
        });
    }

    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = "/login.html";
            return;
        }
        currentUserId = user.uid;

        loadFriends(currentUserId);

        searchBtn.addEventListener('click', async () => {
            const queryText = searchInput.value.trim().toLowerCase();
            searchResults.innerHTML = "";

            try {
                const usersRef = collection(db, "userprofiles");
                const snapshot = await getDocs(usersRef);
                const matches = [];

                snapshot.forEach(docSnap => {
                    const user = docSnap.data();
                    const userId = docSnap.id;

                    if (
                        user.username &&
                        user.username.toLowerCase().includes(queryText) &&
                        userId !== currentUserId
                    ) {
                        matches.push({ id: userId, ...user });
                    }
                });

                if (matches.length === 0) {
                    searchResults.innerHTML = "<li class='text-white'>No matches found.</li>";
                } else {
                    matches.forEach(user => {
                        const li = document.createElement('li');
                        li.className = "bg-gray-700 p-2 rounded flex justify-between items-center";

                        const span = document.createElement('span');
                        span.textContent = user.username;

                        const addBtn = document.createElement('button');
                        addBtn.textContent = "Add";
                        addBtn.className = "bg-green-600 text-white px-3 py-1 rounded text-sm";

                        addBtn.addEventListener('click', async () => {
                            addBtn.disabled = true;
                            addBtn.textContent = "Added";
                            addBtn.classList.remove("bg-green-600");
                            addBtn.classList.add("bg-gray-500");

                            const friendRef = doc(db, "userprofiles", currentUserId, "friends", user.id);
                            await setDoc(friendRef, {
                                username: user.username,
                                email: user.email || "",
                                profilePicture: user.profilePicture || "",
                                addedAt: Date.now()
                            });

                            const friendDiv = document.createElement('div');
                            friendDiv.className = "flex items-center gap-2 bg-gray-200 p-1 rounded-full";

                            const img = document.createElement('img');
                            img.src = user.profilePicture || "images/person.png";
                            img.alt = "";
                            img.className = "max-w-[50px]";

                            const nameTag = document.createElement('h1');
                            nameTag.textContent = user.username;
                            nameTag.className = "font-bold";

                            friendDiv.appendChild(img);
                            friendDiv.appendChild(nameTag);
                            friendsList.appendChild(friendDiv);
                        });

                        li.appendChild(span);
                        li.appendChild(addBtn);
                        searchResults.appendChild(li);
                    });
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                searchResults.innerHTML = "<li class='text-red-500'>Error loading users.</li>";
            }
        });
    });

    addFriendsBtn.addEventListener('click', () => {
        popup.classList.remove('hidden');
    });

    cancelBtn.addEventListener('click', () => {
        popup.classList.add('hidden');
        searchResults.innerHTML = "";
        searchInput.value = "";
    });
});





