function initAvatarSelector(profileImage, onAvatarSelect) {
  const chooseBtn = document.getElementById("choose-avatar-btn");
  const avatarSelector = document.getElementById("avatar-selector");
  const closeBtn = document.getElementById("close-avatar-selector");
  const confirmBtn = document.getElementById("confirm-avatar");
  const avatarGrid = document.getElementById("avatar-grid");

  const avatarOptions = [
    "images/elmo.jpg",
    "images/elmo.png",
    "images/p1.png",
    "images/p2.png",
    "images/p3.png",
    "images/p4.png",
    "images/p5.png",
    "images/p6.png",
    "images/p7.png",
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

  // Open popup
  chooseBtn.addEventListener("click", () => {
    avatarSelector.classList.remove("hidden");
  });

  // Close popup
  closeBtn.addEventListener("click", () => {
    avatarSelector.classList.add("hidden");
  });

  // Confirm selection
  confirmBtn.addEventListener("click", () => {
    if (!selectedAvatar) {
      alert("Please select an avatar!");
      return;
    }

    profileImage.src = selectedAvatar;

    if (typeof onAvatarSelect === "function") {
      onAvatarSelect(selectedAvatar);
    }

    avatarSelector.classList.add("hidden");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const profileImage = document.getElementById("profileImage");

  initAvatarSelector(profileImage, (selectedAvatar) => {
    console.log("Selected avatar:", selectedAvatar);
  });
});
