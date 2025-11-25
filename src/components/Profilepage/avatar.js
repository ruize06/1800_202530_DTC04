import { db } from "../../firebaseConfig.js";
import { doc, updateDoc } from "firebase/firestore";
import { showAlert } from "../Popups/alert.js";

export function setupAvatar(profileImage, userId, onAvatarSelect) {
  //DOM Elements
  const chooseBtn = document.getElementById("choose-avatar-btn");
  const avatarSelector = document.getElementById("avatar-selector");
  const closeBtn = document.getElementById("close-avatar-selector");
  const confirmBtn = document.getElementById("confirm-avatar");
  const avatarGrid = document.getElementById("avatar-grid");

  const avatarOptions = [
    "/images/earth.png",
    "/images/planet1.png",
    "/images/planet2.png",
    "/images/planet3.png",
    "/images/sun.png",
    "/images/planet5.png",
  ];

  let selectedAvatar = null;
  // Generate avatar options

  avatarGrid.innerHTML = "";
  avatarOptions.forEach((url) => {
    const img = document.createElement("img");
    img.src = url;
    img.classList.add(
      "w-20",
      "h-20",
      "rounded-full",
      "cursor-pointer",
      "hover:scale-105",
      "transition",
      "border-2",
      "border-transparent"
    );

    img.addEventListener("click", () => {
      selectedAvatar = url;

      avatarGrid.querySelectorAll("img").forEach((el) => {
        el.classList.remove("border-blue-500");
        el.classList.add("border-transparent");
      });

      img.classList.remove("border-transparent");
      img.classList.add("border-blue-500");
    });

    avatarGrid.appendChild(img);
  });

  // Show the avatar selection menu
  chooseBtn.addEventListener("click", () => {
    avatarSelector.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    avatarSelector.classList.add("hidden");
  });

  confirmBtn.addEventListener("click", async () => {
    if (!selectedAvatar) {
      showAlert("Please select an avatar!", "warning");
      return;
    }

    profileImage.src = selectedAvatar;

    if (typeof onAvatarSelect === "function") {
      onAvatarSelect(selectedAvatar);
    }

    // Show the avatar selection menu
    if (userId) {
      try {
        await updateDoc(doc(db, "userprofiles", userId), {
          profilePicture: selectedAvatar,
        });
        showAlert("Avatar saved!", "success");
      } catch (err) {
        console.error("Failed to save avatar:", err);
        showAlert("Failed to save avatar. Please try again later.", "error");
      }
    }

    avatarSelector.classList.add("hidden");
  });
}
