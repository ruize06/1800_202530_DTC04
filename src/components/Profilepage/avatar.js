import { db } from "../../firebaseConfig.js";
import { doc, updateDoc } from "firebase/firestore";

export function setupAvatar(profileImage, userId, onAvatarSelect) {
  const chooseBtn = document.getElementById("choose-avatar-btn");
  const avatarSelector = document.getElementById("avatar-selector");
  const closeBtn = document.getElementById("close-avatar-selector");
  const confirmBtn = document.getElementById("confirm-avatar");
  const avatarGrid = document.getElementById("avatar-grid");

  const avatarOptions = [
    "/images/earth.png",
    "/images/planet1.png",
    "/images/planet2.png",
    "/images/p3.png",
    "/images/p4.png",
    "/images/p5.png",
    "/images/p6.png",
    "/images/p7.png",
    "/images/p8.png",
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

  chooseBtn.addEventListener("click", () => {
    avatarSelector.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    avatarSelector.classList.add("hidden");
  });

  confirmBtn.addEventListener("click", async () => {
    if (!selectedAvatar) {
      alert("Please select an avatar!");
      return;
    }

    profileImage.src = selectedAvatar;

    if (typeof onAvatarSelect === "function") {
      onAvatarSelect(selectedAvatar);
    }

    if (userId) {
      try {
        await updateDoc(doc(db, "userprofiles", userId), {
          profilePicture: selectedAvatar,
        });
        alert("Avatar saved!");
      } catch (err) {
        console.error("Failed to save avatar:", err);
        alert("Failed to save avatar. Please try again later.");
      }
    }

    avatarSelector.classList.add("hidden");
  });
}
