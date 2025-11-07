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

  // Email is always read-only
  emailInput.readOnly = true;
  emailInput.style.backgroundColor = "#f0f0f0"; // visual cue for read-only

  saveBtn.textContent = editable ? "Save Changes" : "Edit";
  saveBtn.classList.toggle("bg-blue-900", editable);
  saveBtn.classList.toggle("bg-linear-to-r", !editable);
}

// Listen to Firestore real-time updates
function listenUserProfile(userId, userEmail) {
  const userDocRef = doc(db, "userprofiles", userId);

  onSnapshot(userDocRef, (docSnap) => {
    if (!docSnap.exists() || isEditing) return; // Don't overwrite while editing
    const data = docSnap.data();

    // Update form inputs
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

    // Show save success
    saveBtn.textContent = "✔ Saved!";
    saveBtn.classList.add("bg-green-700");
    setTimeout(() => {
      setFormEditable(false);
      isEditing = false;
      saveBtn.textContent = "Edit";
      saveBtn.classList.remove("bg-green-700");
    }, 1500);
  } catch (err) {
    console.error("Failed to update profile:", err);
    errorMsg.textContent = "❌ Failed to update profile. Try again.";
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

  // Listen to Firestore updates
  listenUserProfile(currentUserId, userEmail);

  // Default: form not editable
  setFormEditable(false);
});
