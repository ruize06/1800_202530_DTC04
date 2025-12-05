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
  return false;
}

export function arrayRemove(array, item) {
  const index = array.indexOf(item);
  if (index !== -1) array.splice(index, 1);
}

export function customClone(originalNode, attachNode) {
  var newNode = originalNode.cloneNode(true);
  attachNode.appendChild(newNode);
  for (let attr of originalNode.attributes) {
    console.log(attr.name);
    newNode.setAttribute(attr.name, attr.value);
  }
  return newNode;
}

export function addEventListeners(target, events, callback) {
  events.forEach((event) => {
    target.addEventListener(event, callback);
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

export function addPopupEventListeners(
  openButton,
  closeButton,
  popupElement,
  onOpen,
  onClose
) {
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
  const openFunc = (e) => {
    onOpen(e); /* showPopup(popupElement)*/
  };
  const closeFunc = (e) => {
    onClose(e); /* hidePopup(popupElement)*/
  };
  openButton?.addEventListener("click", openFunc);
  // Cancel popup
  closeButton?.addEventListener("click", closeFunc);
  if (popupElement?.getAttribute("listener") !== "true") {
    popupElement?.setAttribute("listener", "true");
    popupElement?.addEventListener("focusout", () => {
      // if (document.hasFocus()) popupElement.timer = setTimeout(closeFunc, 0);
    });
    popupElement?.addEventListener("focusin", () => {
      // clearTimeout(popupElement.timer);
    });
  }
}

export function confirmationPopup({ message, onConfirm }) {
  const popup = document.createElement("div");
  popup.id = "confirmationPopup";
  popup.className = `
    fixed inset-0 flex justify-center items-center z-50
    bg-black/50 px-4
  `;
  const popupContent = document.createElement("div");
  popupContent.className = `
    bg-gradient-to-r from-[var(--light-secondary-button-bg-color)]
    to-[var(--light-primary-button-bg-color)]
    text-white rounded-2xl px-6 py-6 shadow-2xl
    w-full max-w-md flex flex-col gap-8
    sm:px-8
  `;

  popupContent.innerHTML = `
    <p class="text-xl font-bold text-center">${message}</p>
    <div class="flex justify-center gap-6 mt-4 w-full">
      <button id="confirmBtn" type="button"
              class="w-28 px-6 py-2 rounded-full bg-white text-black
                     font-semibold shadow-lg hover:scale-115 hover:shadow-xl transition-all duration-300">
        Confirm
      </button>
      <button id="cancelBtn"
              class="w-28 px-6 py-2 rounded-full bg-white text-black
                     font-semibold shadow-lg hover:scale-115 hover:shadow-xl transition-all duration-300">
        Cancel
      </button>
    </div>
  `;

  popup.appendChild(popupContent);
  document.body.appendChild(popup);

  popupContent.querySelector("#confirmBtn").addEventListener("click", () => {
    onConfirm?.();
    popup.remove();
  });

  popupContent.querySelector("#cancelBtn").addEventListener("click", () => {
    popup.remove();
  });

  return popup;
}
