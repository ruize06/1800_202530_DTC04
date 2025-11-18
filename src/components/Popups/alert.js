export function showAlert(message, type = "success") {
  const typeClasses = {
    success:
      "from-[var(--light-secondary-button-bg-color)] to-[var(--light-primary-button-bg-color)] text-white",
    error: "from-red-400 to-red-600 text-white",
    warning: "from-amber-200 to-amber-300 text-black",
  };

  // overlay
  const overlay = document.createElement("div");
  overlay.className = `
    fixed inset-0 bg-black/50 z-50
    flex justify-center items-center
  `;

  // Popups
  const alertDiv = document.createElement("div");
  alertDiv.className = `
    bg-gradient-to-r ${typeClasses[type] || typeClasses.info} 
    px-8 py-6 rounded-2xl shadow-2xl
    text-center flex flex-col items-center gap-4
    max-w-xs w-full
  `;

  const messageP = document.createElement("p");
  messageP.textContent = message;
  messageP.className = "text-xl font-semibold";

  // OK button
  const okBtn = document.createElement("button");
  okBtn.textContent = "OK";
  okBtn.className = `
    mt-2 px-6 py-2 rounded-full bg-white text-black font-semibold 
    shadow-lg hover:scale-115 hover:shadow-xl transition-all duration-300
  `;
  okBtn.addEventListener("click", () => overlay.remove());

  alertDiv.appendChild(messageP);
  alertDiv.appendChild(okBtn);
  overlay.appendChild(alertDiv);
  document.body.appendChild(overlay);
}
