// profile.js
import { auth, db, storage } from "../../firebaseConfig.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// DOM Elements
const profileImage = document.getElementById("profileImage");
const imageInput = document.getElementById("imageInput");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const pronounsInput = document.getElementById("pronouns");
const saveBtn = document.getElementById("save-btn");
const logoutBtn = document.getElementById("logout-btn");

let currentUserId = null;
let isEditing = false;

//Form Editable
function setFormEditable(editable) {
  usernameInput.disabled = !editable;
  emailInput.disabled = !editable;
  pronounsInput.disabled = !editable;
  saveBtn.textContent = editable ? "Save Changes" : "Edit";
}

//Listen for real-time user profile changes
function listenUserProfile(userId) {
  const userDocRef = doc(db, "userprofiles", userId);

  onSnapshot(userDocRef, (docSnap) => {
    if (!docSnap.exists()) {
      setDoc(
        userDocRef,
        { username: "", email: "", pronouns: "", profilePicture: "" },
        { merge: true }
      );
      return;
    }

    const data = docSnap.data();
    profileImage.src = data.profilePicture || "images/person.png";
    usernameInput.value = data.username || "";
    emailInput.value = data.email || "";
    pronounsInput.value = data.pronouns || "";
  });
}

//Upload image
imageInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file || !currentUserId) return;

  try {
    const uniqueFileName = `${currentUserId}-${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `profile_pictures/${uniqueFileName}`);

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    const userDocRef = doc(db, "userprofiles", currentUserId);
    await updateDoc(userDocRef, { profilePicture: downloadURL });

    profileImage.src = downloadURL;
  } catch (err) {
    console.error("Failed to upload profile image:", err);
    alert("Failed to upload profile image: " + err.message);
  }
});

//Save profile info (username, email, pronouns)
async function saveProfile() {
  if (!currentUserId) return;

  const userDocRef = doc(db, "userprofiles", currentUserId);
  const updates = {
    username: usernameInput.value,
    email: emailInput.value,
    pronouns: pronounsInput.value,
  };

  try {
    await updateDoc(userDocRef, updates);
    alert("Profile updated!");
    setFormEditable(false);
    isEditing = false;
  } catch (err) {
    console.error("Failed to update profile:", err);
    alert("Failed to update profile: " + err.message);
  }
}

//Save button click (toggle edit/save)
saveBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (!isEditing) {
    isEditing = true;
    setFormEditable(true);
  } else {
    await saveProfile();
  }
});

// Log out
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "/login.html";
});

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "/login.html";
    return;
  }
  currentUserId = user.uid;
  listenUserProfile(currentUserId);
  setFormEditable(false);
});
