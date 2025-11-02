// profile.js
import { auth, db, storage } from "../../firebaseConfig.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
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

function setFormEditable(editable) {
  usernameInput.disabled = !editable;
  emailInput.disabled = !editable;
  pronounsInput.disabled = !editable;
  imageInput.disabled = !editable;
  saveBtn.textContent = editable ? "Save Changes" : "Edit";
}

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

async function uploadProfileImage(file, userId) {
  const storageRef = ref(storage, `profile_pictures/${userId}.jpg`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

async function saveProfile() {
  if (!currentUserId) return;

  const userDocRef = doc(db, "userprofiles", currentUserId);
  const updates = {
    username: usernameInput.value,
    email: emailInput.value,
    pronouns: pronounsInput.value,
  };

  try {
    if (imageInput.files.length > 0) {
      const file = imageInput.files[0];
      const downloadURL = await uploadProfileImage(file, currentUserId);
      updates.profilePicture = downloadURL;
      profileImage.src = downloadURL;
    }

    await setDoc(userDocRef, updates, { merge: true });
    alert("Profile updated!");
    setFormEditable(false);
    isEditing = false;
  } catch (err) {
    console.error("Failed to update profile:", err);
    alert("Failed to update profile: " + err.message);
  }
}

imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profileImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

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

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "/login.html";
    return;
  }
  currentUserId = user.uid;
  listenUserProfile(currentUserId);
  setFormEditable(false);
});
