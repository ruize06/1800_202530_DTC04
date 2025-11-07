// profile.js
import { auth, db } from "../../firebaseConfig.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";

// DOM Elements
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const pronounsInput = document.getElementById("pronouns");
const saveBtn = document.getElementById("save-btn");
const logoutBtn = document.getElementById("logout-btn");
const errorMsg = document.getElementById("error-msg");

// Profile card elements
const cardUsername = document.getElementById("card-username");
const cardEmail = document.getElementById("card-email");

// Update card username in real time
usernameInput.addEventListener("input", () => {
  if (cardUsername) {
    cardUsername.textContent = usernameInput.value.trim() || "Username";
  }
});

let currentUserId = null;
let isEditing = false;

// Set form editable state
function setFormEditable(editable) {
  usernameInput.disabled = !editable;
  pronounsInput.disabled = !editable;
  emailInput.readOnly = true;
  emailInput.style.backgroundColor = "#f0f0f0";
  saveBtn.textContent = editable ? "Save Changes" : "Edit";
}

// Listen to Firestore real-time updates
function listenUserProfile(userId, userEmail) {
  const userDocRef = doc(db, "userprofiles", userId);

  onSnapshot(userDocRef, (docSnap) => {
    if (!docSnap.exists() || isEditing) return;
    const data = docSnap.data();
    usernameInput.value = data.username || "";
    pronounsInput.value = data.pronouns || "";
    emailInput.value = userEmail || "";

    // Update profile card display
    if (cardUsername) cardUsername.textContent = data.username || "Username";
    if (cardEmail) cardEmail.textContent = userEmail || "Email";
  });
}

// Save profile changes
async function saveProfile() {
  if (!currentUserId) return;

  const username = usernameInput.value.trim();
  const pronouns = pronounsInput.value.trim();

  if (!username) {
    errorMsg.textContent = "⚠️ Username is required!";
    usernameInput.focus();
    return;
  }
  errorMsg.textContent = "";

  try {
    await updateDoc(doc(db, "userprofiles", currentUserId), {
      username,
      pronouns,
    });
    alert("Profile updated!");

    setFormEditable(false);
    isEditing = false;
  } catch (err) {
    console.error("Failed to update profile:", err);
    alert("Failed to update profile. Please try again later.");
  }
}

// Handle Save / Edit button click
saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!isEditing) {
    isEditing = true;
    setFormEditable(true);
  } else {
    saveProfile();
  }
});

// Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "/login.html";
});

// Initialize user profile
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "/login.html";
    return;
  }

  currentUserId = user.uid;
  const userEmail = user.email;

  // Auto-fill email (read-only)
  emailInput.value = userEmail;
  emailInput.readOnly = true;
  emailInput.style.backgroundColor = "#f0f0f0";

  // Initialize Firestore document if it doesn't exist
  const userDocRef = doc(db, "userprofiles", currentUserId);
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

  listenUserProfile(currentUserId, userEmail);
  setFormEditable(false);
});
