// profile.js
import { auth, db } from "../../firebaseConfig.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";

// DOM Elements
const profileImage = document.getElementById("profileImage");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const pronounsInput = document.getElementById("pronouns");
const saveBtn = document.getElementById("save-btn");
const logoutBtn = document.getElementById("logout-btn");
const errorMsg = document.getElementById("error-msg");

let currentUserId = null;
let isEditing = false;

function setFormEditable(editable) {
  usernameInput.disabled = !editable;
  pronounsInput.disabled = !editable;

  emailInput.readOnly = true;

  if (editable) {
    saveBtn.textContent = "Save Changes";
    saveBtn.classList.remove(
      "bg-linear-to-r",
      "from-[var(--secondary-button-bg-color)] ",
      "to-[var(--primary-button-bg-color)]"
    );
    saveBtn.classList.add("bg-blue-900");
  } else {
    saveBtn.textContent = "Edit";
    saveBtn.classList.remove("bg-blue-900");
    saveBtn.classList.add(
      "bg-linear-to-r",
      "from-[var(--secondary-button-bg-color)] ",
      "to-[var(--primary-button-bg-color)]"
    );
  }
}

function listenUserProfile(userId, userEmail) {
  const userDocRef = doc(db, "userprofiles", userId);

  onSnapshot(userDocRef, (docSnap) => {
    if (!docSnap.exists()) return;

    const data = docSnap.data();

    usernameInput.value = data.username || "";
    pronounsInput.value = data.pronouns || "";
    emailInput.value = userEmail || "";

    emailInput.readOnly = true;
    emailInput.style.backgroundColor = "#f0f0f0";

    const cardUsername = document.getElementById("card-username");
    const cardEmail = document.getElementById("card-email");
    cardUsername.textContent = data.username || "Username";
    cardEmail.textContent = userEmail || "Email";
  });
}

async function saveProfile() {
  if (!currentUserId) return;

  const username = usernameInput.value.trim();
  const pronouns = pronounsInput.value.trim();

  if (!username) {
    errorMsg.textContent = "⚠️ Username is required!";
    errorMsg.style.color = "red";
    usernameInput.focus();
    return;
  } else {
    errorMsg.textContent = "";
  }

  const userDocRef = doc(db, "userprofiles", currentUserId);
  const updates = {
    username,
    pronouns,
  };

  try {
    await updateDoc(userDocRef, updates);
    alert("Profile updated!");
    setFormEditable(false);
    isEditing = false;
  } catch (err) {
    console.error("Failed to update profile:", err);
    alert("Failed to update profile, please try again later");
  }
}

saveBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (!isEditing) {
    isEditing = true;
    setFormEditable(true);
  } else {
    await saveProfile();
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "/login.html";
});

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "/login.html";
    return;
  }

  currentUserId = user.uid;
  const userEmail = user.email;

  const userDocRef = doc(db, "userprofiles", currentUserId);

  try {
    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
      await setDoc(
        userDocRef,
        {
          username: "",
          pronouns: "",
          profilePicture: "",
          email: userEmail,
        },
        { merge: true }
      );
    }
  } catch (err) {
    console.error("Error initializing user profile:", err);
  }

  emailInput.value = userEmail || "";
  emailInput.readOnly = true;
  emailInput.style.backgroundColor = "#f0f0f0";

  listenUserProfile(currentUserId, userEmail);
  setFormEditable(false);
});
