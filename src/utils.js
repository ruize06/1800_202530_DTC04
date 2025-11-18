export function isLightColor(hexColor) {
  if (hexColor.length == 7) {
    const rgb = [
      parseInt(hexColor.substring(1, 3), 16),
      parseInt(hexColor.substring(3, 5), 16),
      parseInt(hexColor.substring(5), 16),
    ];
    const luminance =
      (0.2126 * rgb[0]) / 255 +
      (0.7152 * rgb[1]) / 255 +
      (0.0722 * rgb[2]) / 255;
    return luminance > 0.5;
  }
  return false
}

export function arrayRemove(array, item) {
  const index = array.indexOf(item);
  if (index !== -1) array.splice(index, 1);
}

export function customClone(originalNode, attachNode) {
  var newNode = originalNode.cloneNode(true);
  attachNode.appendChild(newNode);
  for (let attr of originalNode.attributes) {
    console.log(attr.name)
    newNode.setAttribute(attr.name, attr.value);
  }
  return newNode;
}

export function addEventListeners(target, events, callback) {
  events.forEach(event => {
    target.addEventListener(event, callback)
  });
}

export function hidePopup(popupElement, transitionSpeed = 300) {
  popupElement?.classList.toggle("translate-y-full", true);
  setTimeout(() => {
    popupElement?.classList.toggle("hidden", true);
  }, transitionSpeed);
}

export function showPopup(popupElement) {
  popupElement?.classList.toggle("hidden", false);
  setTimeout(() => {
    popupElement?.classList.toggle("translate-y-full", false);
  }, 0);
}

export function addPopupEventListeners(openButton, closeButton, popupElement, onOpen, onClose) {
  /**
   * Create event listensers for a popup
   * 
   * @param openButton (HTMLElement) - opens popup onclick
   * @param closeButton (HTMLElement) - closes popup onclick
   * @param popupElement (HTMLElement) - element to show/hide, usually a div
   * @param onOpen (callableFunction) - callback function called when the menu is activated
   * @param onClose (callableFunction) - callback function called when the menu is closed
   */
  // Open popup
  const openFunc = (e) => { onOpen(e);/* showPopup(popupElement)*/ }
  const closeFunc = (e) => { onClose(e);/* hidePopup(popupElement)*/ }
  openButton?.addEventListener("click", openFunc);
  // Cancel popup
  closeButton?.addEventListener("click", closeFunc);
  if (popupElement?.getAttribute("listener") !== "true") {
    popupElement?.setAttribute("listener", "true")
    popupElement?.addEventListener(
      "focusout", () => {
        if (document.hasFocus()) popupElement.timer = setTimeout(closeFunc, 0);
      });
    popupElement?.addEventListener(
      "focusin", () => {
        clearTimeout(popupElement.timer);
      });
  }
}

export function confirmationPopup({ message, onConfirm }) {
  const popup = document.createElement("div");
  popup.id = "confirmationPopup";
  popup.className = `fixed bottom-1/2 left-1/2 -translate-x-1/2 w-full md:max-w-[50%] max-w-[90%]
    bg-[var(--secondary-bg-color)] text-[var(--text-color)] rounded-xl px-8 pb-8 shadow-lg
    translate-y-full transition-transform duration-300 z-30 ease-in-out hidden`;

  popup.innerHTML = `
    <!-- Header -->
    <div class="sticky flex flex-row items-center justify-between top-0 bg-inherit py-4 border-b border-[var(--primary-border-color)]">
      <p class="text-xl font-bold">${message}</p>
    </div>
    <div class="flex max-w-[90%] mx-auto justify-between pt-5">
        <button id="confirmBtn" type="button"
                class="px-6 py-2 rounded-full bg-[var(--danger-button-bg-color)] text-white 
                       hover:bg-[var(--secondary-button-bg-color)] hover:scale-105">
          Confirm
        </button>
        <button id="cancelBtn"
                class="px-6 py-2 rounded-full bg-gray-500 text-white 
                       hover:bg-gray-600 hover:scale-105">
          Cancel
        </button>
      </div>
  `;

  document.body.appendChild(popup);

  popup.querySelector("#confirmBtn").addEventListener("click", () => {
    onConfirm?.();
    hidePopup(popup);
  });

  popup.querySelector("#cancelBtn").addEventListener("click", () => {
    hidePopup(popup);
  });

  showPopup(popup);
  return popup;
}
